import { isMobile } from "../../Helper/Mobile";
import { getPathDistance } from "../../lib/PathDistance";
import { Ant } from "../../lib/TSP/Ant";
import { TSP } from "../../lib/TSP/TSP";
import { main } from "../../Main";
import { Mission } from "../../State/Mission";
import { Portals } from "../../State/Portals";
import { title } from "../../Text/Text";
import { button, dialogButton, dialogButtonClose } from "./Button";


let mission: Mission | undefined;
let currentPortals: Portals;
let dialog: JQuery;
let layer: L.LayerGroup<any> | undefined;;


export const showMissionGenerator = () => {

    initCurrentPortals();

    const html = $("<div>", { class: "umm-generator" }).append(
        $("<p>").append(
            "Portals in current mission: ", $("<b>", { id: "count" }), $("<br>"),
            "Length: ", $("<b>", { id: "length" }),
        ),
        button("Reset", resetPortals, "w-full"),
        button("Add Portal", addPortal, "w-full"),
        // checkbox("AP_inpoly", "Only in Drawtool polygon", true),
        // checkbox("AP_skipportals", "Skip Drawtool markers", true),
        // checkbox("AP_sort", "Sort after add", false),
        button("Sort Portals", sortPortals, "w-full"),
        // checkbox("SP_startend", "Keep start/end portals", false),
        // checkbox("SP_borders", "Don't cross Drawtool lines", false),
    );

    const position = isMobile() ?
        { my: "center top", at: "center top" } :
        { my: "left bottom", at: "left+64px center" };

    dialog = window.dialog({
        html: html,
        title: `${title} ${VERSION}`,
        id: 'umm-options_generator',
        width: 350,
        position,
        closeCallback: () => destroy(),
        buttons: [
            dialogButton("Apply", () => {
                applyPortals();
                dialog.dialog("close");
            }),
            dialogButtonClose("Dismiss")
        ]
    })

    updatePreview(false);
}


const initCurrentPortals = () => {
    mission = main.state.missions.get(0);
    if (!mission) {
        alert("No active mission");
        currentPortals = new Portals(undefined, []);
        return;
    }

    currentPortals = mission.portals.cloneWithoutEvents();
}

const resetPortals = () => {
    initCurrentPortals();
    if (layer) layer.clearLayers();
    updatePreview(false);
}

const applyPortals = () => {
    if (!mission) {
        return;
    }

    mission.portals.clear();
    mission.portals.add(...currentPortals.getRange());
    mission.show();

    resetPortals();
}


const addPortal = () => {
    if (currentPortals.length === 0) {
        alert("Need at least one start portal");
        return;
    }

    const distances = portalDistances(currentPortals);
    if (distances.length === 0) {
        alert("No more portals available (wait until all portals are loaded or change viewport");
        return;
    }

    const closePortal = distances.reduce((previous, current) => previous.distance < current.distance ? previous : current, distances[0]);
    currentPortals.insert(closePortal.index + 1, currentPortals.create(closePortal.guid));
    updatePreview();
}


const portalDistances = (portals: Portals): { guid: string, distance: number, index: number }[] => {

    const latLngs = portals.toLatLng();
    console.assert(latLngs.length > 0, "need at least one portal");
    if (latLngs.length === 0) return [];

    const allPortals = Object.values(window.portals).filter(p => !portals.includes(p.options.guid));

    return allPortals.map(portal => {
        const position = portal.getLatLng();
        const closestPoint = getPathDistance(latLngs, position);
        return { guid: portal.options.guid, distance: closestPoint.distance, index: closestPoint.index };
    })
}


const sortPortals = () => {
    if (currentPortals.length === 0) return;

    // keep start portal
    const start = currentPortals.get(0)!.guid;
    const end = currentPortals.get(currentPortals.length - 1)!.guid;

    const solver = new TSP(Ant);
    solver.init(currentPortals.getRange());
    solver.setStartEnd(start, end)
    solver.solve(100, 500);
    solver.routeChangeStart(start);
    console.assert(solver.route[0].guid === start, "Start portal should be the same");
    console.assert(solver.route.at(-1)!.guid === end, "End portal should be the same");

    currentPortals.clear();
    const newportals = solver.route.map(p => p.portal);
    currentPortals.add(...newportals);

    updatePreview();
}


const updatePreview = (withPath: boolean = true) => {

    $("#count", dialog).text(currentPortals.length);
    $("#length", dialog).text(formatDistance(currentPortals.getDistance()));

    if (withPath) {
        layer ??= L.layerGroup().addTo(window.map);

        layer.clearLayers();
        const latLngs = currentPortals.toLatLng();
        const polyline = L.geodesicPolyline(latLngs, {
            color: "red",
            weight: 5,
            opacity: 0.8,
            dashArray: "8,8"
        });
        layer.addLayer(polyline);

        latLngs.forEach(latLng => {
            const portal = L.circleMarker(latLng, { color: "red", radius: 5 });
            layer!.addLayer(portal);
        });
    }
}


const destroy = () => {  /* noop */

    if (layer) {
        window.map.removeLayer(layer);
        layer.clearLayers();
        layer = undefined;
    }

}
