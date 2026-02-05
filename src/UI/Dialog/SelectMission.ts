import { main } from "../../Main";
import { Mission } from "../../State/Mission";
import { notification } from "../Notification";
import { dialogButton, dialogButtonClose } from "./Button";
import { showUmmOptions } from "./Options";

// FIXME: missing in IITCPluginKit 1.9.6
declare global {
    function formatDistance(distance: number): string;
}


const button = (label: string, click: () => void) => {
    return $("<button>", { text: label, click, class: "umm-mission-picker-btn" })
}


export const editActiveMission = () => {

    const html = $("<div>", { class: "umm-mission-picker-btn" }).append(
        'Select a mission number:<br>',
        $("<select>", { id: "umm-mission-picker", class: "umm-mission-picker", change: updateMissionInfo }),
        button("Select", onMissionSelect),
        button("Zoom to mission", onZoomToMission),
        $("<div>", { id: "um-mission-pikcer-info" })
    );

    window.dialog({
        html: html,
        title: `${main.umm.title} v${main.umm.version}`,
        id: 'umm-options',
        width: 350,
        buttons: [
            dialogButton("< Main Menu", showUmmOptions),
            dialogButtonClose()
        ]
    })

    const select = $("#umm-mission-picker");
    const state = main.state;
    state.missions.forEach(mission => {
        select.append(
            $("<option>", {
                value: mission.id,
                selected: state.isCurrent(mission.id),
                text: `${mission.id + 1} - waypoints ${mission.portals.length}`
            }))
    })

    updateMissionInfo();
};


const selectedMission = (): Mission | undefined => {
    const missionNumber = parseInt($('#umm-mission-picker').val() as string);
    return main.state.missions.get(missionNumber);
};


const updateMissionInfo = () => {
    const info = $("#um-mission-pikcer-info");
    info.empty();

    const mission = selectedMission();
    if (!mission) return;

    const missionLength = window.formatDistance(mission.getDistance());
    const distanceToStart = main.state.missions.distanceToStart(mission.id);
    const distanceToNext = main.state.missions.distanceToStart(mission.id + 1);


    const table = `
    Wapoints:\t${mission.portals.length}\n
    Length:\t${missionLength}\n
    to Start:\t${(distanceToStart && window.formatDistance(distanceToStart)) ?? "---"}\n
    to Next:\t${(distanceToNext && window.formatDistance(distanceToNext)) ?? "---"}\n`;

    info.html(window.convertTextToTableMagic(table));
};


const onMissionSelect = () => {
    const mission = selectedMission();

    if (!mission || main.state.isCurrent(mission.id)) {
        notification("Active mission not changed.");
        return;
    }

    main.umm.setCurrentMission(mission.id);

    if (main.umm.missionModeActive) {
        // eslint-disable-next-line unicorn/no-null
        renderPortalDetails(null); // Avoid adding current portal to a mission
        main.umm.resumeOrStartNewMission(main.state.get());
    } else {
        mission.show();
        notification(`Current working mission set to #${mission.id + 1}`);
    }
    $("#dialog-umm-options").dialog("close");
};


const onZoomToMission = () => {
    const mission = selectedMission();

    if (mission) {
        mission.show();
    } else {
        notification("Can't zoom in on this mission. No portals.");
    }
};

