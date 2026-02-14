import { main } from "./Main";
import { dialogButton } from "./UI/Dialog/Button";
import { editMissionSetDetails } from "./UI/Dialog/MissionDetails";
import { showUmmOptions } from "./UI/Dialog/Options";
import { bannerNotification, notification } from "./UI/Notification";
import { title } from "./Text/Text";
import { confirmDialog } from "./UI/Dialog/Confirm";

let lastPortal: PortalGUID | undefined;

export const addPortalToCurrentMission = async (data: EventPortalSelected) => {

    // same or nothing selected
    if (lastPortal === data.selectedPortalGuid) {
        return;
    }
    lastPortal = data.selectedPortalGuid;
    if (!data.selectedPortalGuid) return;


    // we are not in edit mode or it is the first selection
    const state = main.state;
    if (!main.missionModeActive) {
        return;
    }

    const mission = state.getEditMission();
    if (!mission) return;

    const portalToAdd = mission.portals.create(data.selectedPortalGuid);

    if (mission.portals.includes(portalToAdd.guid)) {
        if (mission.portals.isEnd(portalToAdd)) {
            bannerNotification(state, `Portal already in mission #${main.state.getCurrent() + 1}`);
        }
    } else {
        const preMission = state.missions.previous(mission);
        if (mission.portals.length === 0 && preMission && preMission.portals.includes(portalToAdd.guid) &&
            (!preMission.portals.isStart(portalToAdd) && !preMission.portals.isEnd(portalToAdd))
        ) {
            if (await confirmDialog({
                message: "Split mission?",
                details: "Your start portal overlaps another mission's portal. Reuse it or split the previous mission?"
            })) {
                const index = preMission.portals.indexOf(portalToAdd);
                mission.portals.clear();
                state.missions.split(preMission, index, mission);

                state.save();
                return;
            }
        }

        mission.portals.add(portalToAdd);
        state.save();

        notification(`${main.state.getBannerName()}\nAdded to mission #${main.state.getCurrent() + 1}`)
    }
}


export const clearMissionData = () => {
    main.state.reset();
    main.state.save();

    if (main.missionModeActive) {
        toggleMissionMode();
    }
}


export const removeLastPortal = () => {

    if (!main.missionModeActive) {
        notification(`Only valid in edit mode`);
        return;
    }

    const mission = main.state.getEditMission();

    // If currentMission has 0 portals, refuse
    if (mission && mission.portals.length > 0) {

        lastPortal = undefined;

        mission.portals.remove(mission.portals.length - 1);
        main.state.save();


        // Check if current mission still has portals, if so reset view to this portal
        if (!mission.focusLastPortal()) {
            // Clear out the portal view to allow for any portal to be selected as start portal
            // eslint-disable-next-line unicorn/no-null
            renderPortalDetails(null);
            notification(`${main.state.getBannerName()}\nNo portals left in mission.\nSelect start portal`);
        }
    } else {
        // If no more portals are left in the current mission
        // Go back to the last portal of the previous mission (but don't delete it)
        if (mission && mission.id > 0) {
            setCurrentMission(mission.id - 1);
            main.state.save();

            main.state.getEditMission()?.focusLastPortal();
            notification(`${main.state.getBannerName()}\nLast mission removed\nSwitched to previous mission ${mission.id + 2}\n`);
        } else {
            notification(`${main.state.getBannerName()}\nCan't undo\nAlready on last mission\n`);
        }
    }
};


export const toggleMissionMode = () => {

    if (main.missionModeActive) {
        main.missionModeActive = false;
        $('#umm-toggle-bookmarks').css("background-color", "");
    } else {
        if (!main.state.isValid()) {
            // Mission data not set, ask for details, then attempt to enable mission mode again on Save
            editMissionSetDetails(true);
            notification("Mission mode inactive\nPlease enter mission data\nAnd try again.");
            return
        }

        main.missionModeActive = true;

        startEdit();
        $('#umm-toggle-bookmarks').css("background-color", "crimson");
    }

    main.renderPath.redraw();
}


export const startEdit = () => {
    // If the currentMission already has portals, resume mission creation at last portal
    const editMission = main.state.getEditMission();
    const missionNumber = main.state.getCurrent() + 1;
    if (editMission?.hasPortals()) {
        editMission.show();
        lastPortal = editMission.portals.get(-1)!.guid;
        window.renderPortalDetails(lastPortal);
        bannerNotification(main.state, `Mission mode active.\nResuming mission #${missionNumber}\nSelect next portal`);
    } else {
        bannerNotification(main.state, `Mission mode active.\nSelect start portal for mission #${missionNumber}`);
    }
};


export const splitMissionOptions = () => {
    let html = '<div class="umm-split-mission-options">';
    html = `<b>How do you want to split your mission?</b><br><br>
      <b>Remainder at the end:</b> All missions will contain the same amount of portals, any portals left over after splitting are added to the last mission.<br><br>
      <b>Balanced:</b> Split the banner into missions of the same length, if any portals are left over after splitting, earlier missions will get 1 portal extra to balance it out.
      `

    const buttons = [
        dialogButton("< Main Menu", showUmmOptions),
        dialogButton("Remainder at end", () => splitMissionStart(true)),
        dialogButton("Balanced", () => splitMissionStart(false)),
    ];

    window.dialog({
        html,
        title: `${title} - Split mission options`,
        id: 'umm-options',
        width: 350,
        buttons,
    });
};


const splitMissionStart = (remainderAtEnd: boolean) => {
    const portalsCount = main.state.missions.get(0)?.portals.length ?? 0;
    const preset = Math.min(main.state.getPlannedLength(), portalsCount);
    const numMissionString = prompt(`In how many missions do you want to split your banner (1-${portalsCount})?\r\rRecommended number is a multiple of 6.`, preset.toString());
    if (numMissionString === null) return;

    const numMissions = parseInt(numMissionString);
    if (numMissions > portalsCount) {
        alert(`Can't split into more missions than there are portals in your current path. Please try again with a number between 1 and ${portalsCount}`)
        return;
    } else if (numMissions < 1 || !Number.isInteger(numMissions)) {
        alert(`Invalid input. Please try again with a number between 1 and ${portalsCount}`)
        return
    }

    void splitMission(numMissions, remainderAtEnd);
}


const splitMission = async (numMissions: number, remainderAtEnd: boolean) => {

    const mission = main.state.missions.get(0);
    if (!mission) return;

    let hasPortals = false;
    for (let i = 0; i < numMissions; i++) hasPortals ||= main.state.missions.get(i)?.hasPortals() === true;
    if (hasPortals) {
        if (!await confirmDialog({ message: "Merge missione before split?", details: "Mission(s) already contain portals. These will be merged into one" })) {
            return;
        }
    }

    const numPortals = mission?.portals.length;
    const numPortalsPerMission = Math.floor(numPortals / numMissions);
    const numRestPortals = numPortals % numMissions;

    const message = `Your path of ${numPortals} will be divided into ${numMissions} missions of ${numPortalsPerMission} portals each.`
    let details = ""
    if (numRestPortals > 0) {
        details += remainderAtEnd ?
            ` The remaining ${numRestPortals} portal(s) will be added to the last mission.` :
            ` The remaining ${numRestPortals} portal(s) will be equaly divided between the first missions.`;
    }
    details += `\r\n\r\nThis process can be reversed using the merge missions feature. Do you want to continue?`;

    if (await confirmDialog({ message, details })) {
        main.state.missions.splitIntoMultiple(mission, numMissions, remainderAtEnd);
        main.state.save();
    }
};


export const mergeMissions = async () => {
    if (!await confirmDialog({
        message: "Merge mission?",
        details: "Are you sure you want to merge all your missions into 1?\r\n\r\nThis can't be undone."
    })) {
        return;
    }

    main.state.missions.mergeAll();
    main.state.setCurrent(0);
}


export const reverseMission = () => {
    const state = main.state;
    const missionToReverse = prompt(`Which mission do you want to reverse (1-${state.getPlannedLength()})?`, (state.getCurrent() + 1).toString());
    if (missionToReverse === null) return;

    const mission = state.missions.get(parseInt(missionToReverse));
    if (!mission) {
        alert(`This mission doesn't exist, enter a value between 1-${state.getPlannedLength()}.`)
        return;
    }

    mission.reverse();
    state.save();
}


export const setCurrentMission = (missionId: number): void => {
    main.state.setCurrent(missionId);
    main.state.save();
};