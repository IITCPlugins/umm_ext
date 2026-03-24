import { isMobile } from "../../Helper/Mobile";
import { getPathDistance } from "../../lib/PathDistance";
import { main } from "../../Main";
import { Portals } from "../../State/Portals";
import { title } from "../../Text/Text";
import { button, dialogButton, dialogButtonClose } from "./Button";
import { showUmmOptions } from "./Options";

export const showMissionGenerator = () => {

    const html = $("<div>", { class: "umm-generator" }).append(
        button("Add Portal", addPortal, "w-full"),
        button("Sort Portals", sortPortals, "w-full"),
    );

    const position = isMobile() ?
        { my: "center top", at: "center top" } :
        { my: "left bottom", at: "left+64px center" };

    window.dialog({
        html: html,
        title: `${title} ${VERSION}`,
        id: 'umm-options',
        width: 350,
        position,
        buttons: [
            dialogButton("< Main Menu", showUmmOptions),
            dialogButtonClose()
        ],
        closeCallback: () => destroy()
    })
}


const addPortal = () => {
    const mission = main.state.missions.get(0);
    if (!mission) return;

    const portals = mission.portals;
    if (portals.length === 0) {
        alert("Need at least one start portal");
        return;
    }

    const distances = portalDistances(portals);
    if (distances.length === 0) {
        alert("No more portals available (wait until all portals are loaded or change viewport");
        return;
    }

        const closePortal = distances.reduce((previous, current) => previous.distance < current.distance ? previous : current, distances[0]);
        portals.insert(closePortal.index + 1, portals.create(closePortal.guid));
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
    const mission = main.state.missions.get(0);
    if (!mission) return;

    const portals = mission.portals;
    console.log(portals.toLatLng()); // dummy
}

const destroy = () => {  /* noop */ }
