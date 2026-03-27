import { isMobile } from "../../Helper/Mobile";
import { getMapPortals, hasDrawTools } from "../../lib/GetMapPortals";
import { getPathDistance } from "../../lib/PathDistance";
import { Ant } from "../../lib/TSP/Ant";
import { TSP } from "../../lib/TSP/TSP";
import { main } from "../../Main";
import { Mission } from "../../State/Mission";
import { Portals } from "../../State/Portals";
import { title } from "../../Text/Text";
import { notification } from "../Notification";
import { button, dialogButton, dialogButtonClose } from "./Button";
import { checkbox } from "./Checkbox";


const preview_color = "#35ac9c";

let currentMission: Mission | undefined;
let currentPortals: Portals;
let dialog: JQuery;
let layer: L.LayerGroup<any> | undefined;;


export const showMissionGenerator = () => {

    initCurrentPortals();

    const html = $("<div>", { class: "umm-generator" }).append(
        $("<p>").append(
            "Portals: ", $("<b>", { id: "count" }), $("<br>"),
            "Length: ", $("<b>", { id: "length" }),
        ),
        button("Reset", resetPortals, "w-full"),
        button("Add Portal", addPortal, "w-full"),
        checkbox("AP_hackrange", "Only in Hackrange", false),
        checkbox("AP_inpoly", "Only in Drawtool polygon", true).toggle(hasDrawTools()),
        checkbox("AP_skipportals", "Skip Drawtool markers", true).toggle(hasDrawTools()),
        checkbox("AP_sort", "Sort after add", false),

        button("Sort Portals", sortPortals, "w-full"),
        checkbox("SP_startend", "Keep End Portal", hasNextMissionPortals()),
        checkbox("SP_moresorttime", "Take more time to sort", false),
        // checkbox("SP_borders", "Don't cross Drawtool lines", false),

        // button("Change start", resetPortals, "w-full"),
        // button("Reverse", resetPortals, "w-full"),
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
    currentMission = main.state.getEditMission();
    if (!currentMission) {
        notification("No active mission");
        currentPortals = new Portals(undefined, []);
        return;
    }

    currentPortals = currentMission.portals.cloneWithoutEvents();
}


const hasNextMissionPortals = (): boolean => {
    const nextMission = main.state.missions.get(currentMission!.id + 1);
    return (nextMission?.portals.length ?? 0) > 0
}


const resetPortals = () => {
    initCurrentPortals();
    if (layer) layer.clearLayers();
    updatePreview(false);
}


const applyPortals = () => {
    if (!currentMission) {
        return;
    }

    currentMission.portals.clear();
    currentMission.portals.add(...currentPortals.getRange());
    currentMission.show();

    resetPortals();
}


const addPortal = () => {
    if (currentPortals.length === 0) {
        notification("Need at least one start portal");
        return;
    }

    const useDTPolygon = $("#AP_inpoly", dialog).is(":checked");
    const useSkipPortals = $("#AP_skipportals", dialog).is(":checked");
    const possiblePortals = getMapPortals(useDTPolygon, useSkipPortals);

    const distances = portalDistances(possiblePortals, currentPortals);
    if (distances.length === 0) {
        notification("No more portals available")
        return;
    }


    const closePortal = distances.reduce((previous, current) => previous.distance < current.distance ? previous : current, distances[0]);

    const useHackRange = $("#AP_hackrange", dialog).is(":checked");
    if (useHackRange && closePortal.distance > HACK_RANGE) {
        notification("No more portals in Hack range")
        return;
    }
    currentPortals.insert(closePortal.index + 1, currentPortals.create(closePortal.guid));
    updatePreview();


    if ($("#AP_sort", dialog).is(":checked")) {
        sortPortals();
    }
}


const portalDistances = (incomginPortals: IITC.Portal[], portals: Portals): { guid: string, distance: number, index: number }[] => {

    const latLngs = portals.toLatLng();
    console.assert(latLngs.length > 0, "need at least one portal");
    if (latLngs.length === 0) return [];

    const allPortals = incomginPortals.filter(p => !portals.includes(p.options.guid));

    return allPortals.map(portal => {
        const position = portal.getLatLng();
        const closestPoint = getPathDistance(latLngs, position);
        return { guid: portal.options.guid, distance: closestPoint.distance, index: closestPoint.index };
    })
}


const sortPortals = () => {
    if (currentPortals.length === 0) return;

    const keep_end = $("#SP_startend", dialog).is(":checked");
    const moreTime = $("#SP_moresorttime", dialog).is(":checked");

    // keep start portal
    const start = currentPortals.get(0)!.guid;
    const end = currentPortals.get(currentPortals.length - 1)!.guid;

    const solver = new TSP(Ant);
    solver.init(currentPortals.getRange());
    if (keep_end) solver.setStartEnd(start, end)
    solver.solve(100, moreTime ? 1000 : 500);

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
            color: preview_color,
            weight: 5,
            opacity: 0.8,
            dashArray: "8,8"
        });
        layer.addLayer(polyline);

        latLngs.forEach(latLng => {
            const portal = L.circleMarker(latLng, { color: preview_color, radius: 5 });
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
