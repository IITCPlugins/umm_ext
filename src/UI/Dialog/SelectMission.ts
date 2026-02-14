import { setCurrentMission, startEdit } from "../../Edits";
import { main } from "../../Main";
import { Mission } from "../../State/Mission";
import { notification } from "../Notification";
import { title } from "../../Text/Text";
import { button, dialogButton, dialogButtonClose } from "./Button";
import { showUmmOptions } from "./Options";
import { confirmDialog } from "./Confirm";

// FIXME: missing in IITCPluginKit 1.9.6
declare global {
    function formatDistance(distance: number): string;
}



export const editActiveMission = () => {

    const html = $("<div>", { class: "umm-mission-picker-btn" }).append(
        'Select a mission number:<br>',
        $("<select>", { id: "umm-mission-picker", class: "umm-mission-picker", change: updateMissionInfo }).css({ "margin-right": "1em" }),
        button("Select", onMissionSelect),
        button("Zoom to mission", onZoomToMission),
        $("<div>", { id: "umm-mission-picker-info" }),
        button("Split", onMissionSplit),
        button("Clear", onMissionClear),
        button("Reverse", onMissionReverse), $("<br>"),
        button("Merge with previous", onMergePrevious),
        button("Merge next into this", onMergePost),
    );

    window.dialog({
        html,
        title: `${title} ${VERSION}`,
        id: 'umm-options',
        width: 350,
        buttons: [
            dialogButton("< Main Menu", showUmmOptions),
            dialogButtonClose()
        ],
        closeCallback: destroy
    })

    main.state.onSelectedMissionChange.do(updateSelection);
    main.state.onMissionPortal.do(updateMissionInfo);

    updateMissionList();
    updateMissionInfo();
};


const destroy = () => {
    main.state.onSelectedMissionChange.dont(updateSelection);
}


const getSelectedMission = (): Mission | undefined => {
    const missionNumber = parseInt($('#umm-mission-picker').val() as string);
    return main.state.missions.get(missionNumber);
};


const updateMissionList = () => {
    const select = $("#umm-mission-picker").empty();
    const state = main.state;
    state.missions.forEach(mission => {
        select.append(
            $("<option>", {
                value: mission.id,
                selected: state.isCurrent(mission.id),
                text: `${mission.id + 1} - waypoints ${mission.portals.length}`
            }))
    })
};


const updateSelection = () => {
    const current = main.state.getCurrent();
    $("#umm-mission-picker").val(current);
    updateMissionInfo();
}


const updateMissionInfo = () => {

    const info = $("#umm-mission-picker-info");
    info.empty();

    const mission = getSelectedMission();
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


const refreshMissionUI = () => {
    updateMissionInfo();
    updateMissionList();
};


const onMissionSelect = () => {
    const mission = getSelectedMission();

    if (!mission || main.state.isCurrent(mission.id)) {
        notification("Active mission not changed.");
        return;
    }

    setCurrentMission(mission.id);

    if (main.missionModeActive) {
        // eslint-disable-next-line unicorn/no-null
        renderPortalDetails(null); // Avoid adding current portal to a mission
        startEdit();
    } else {
        mission.show();
        notification(`Current working mission set to #${mission.id + 1}`);
    }
    $("#dialog-umm-options").dialog("close");
};


const onZoomToMission = () => {
    const mission = getSelectedMission();

    if (mission) {
        mission.show();
    } else {
        notification("Can't zoom in on this mission. No portals.");
    }
};



const onMissionSplit = async () => {
    const missions = main.state.missions;

    const mission = getSelectedMission();
    if (!mission) return;

    let next = missions.next(mission);
    while (next?.portals.length === 0) next = missions.next(next);
    const endMissionId = next?.id ?? main.state.getPlannedLength()

    let count = parseInt(
        prompt("Split inhow many missions should be divided among?", (endMissionId - mission.id).toString()) ?? "0"
    );

    if (count < 2) return;
    count = Math.min(count, main.state.getPlannedLength() - mission.id);


    let mustMerge = false;
    for (let i = 1; i < count; i++) {
        const current = missions.get(mission.id + i)!;
        if (current?.portals.length > 0) mustMerge = true;
    }

    if (mustMerge) {
        if (!await confirmDialog({ message: "Merge missione before split?", details: "Mission(s) already contain portals. These will be merged into one" })) {
            return;
        }
    }

    missions.splitIntoMultiple(mission, count);
    main.state.save();
    refreshMissionUI();
};


const onMergePrevious = () => {
    const missions = main.state.missions;

    const mission = getSelectedMission();
    if (!mission) return;
    let previous = missions.previous(mission);
    if (!previous) {
        if (mission.id === 0) return;
        previous = missions.get(0)!;
        console.assert(previous);
    }

    main.state.missions.merge(previous, mission);
    main.state.save();
    refreshMissionUI();
};

const onMergePost = () => {
    const missions = main.state.missions;

    const mission = getSelectedMission();
    if (!mission) return;
    let next = missions.next(mission);
    while (next?.portals.length === 0) next = missions.next(next);
    if (!next) return;

    main.state.missions.merge(mission, next);
    main.state.save();
    refreshMissionUI();
};

const onMissionReverse = () => {
    const mission = getSelectedMission();
    if (!mission) return;

    mission.reverse();
    main.state.save();
    refreshMissionUI();
};

const onMissionClear = () => {
    const mission = getSelectedMission();
    if (!mission) return;

    if (!confirm("This will remove all portals")) return;

    mission.clear();
    main.state.save();
    refreshMissionUI();
};




