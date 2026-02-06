import { main } from "./Main";
import { updateCurrentActiveMissionSidebar } from "./UI/ButtonBar";
import { editMissionSetDetails } from "./UI/Dialog/MissionDetails";
import { notification } from "./UI/Notification";

let lastPortal: PortalGUID;

export const addPortalToCurrentMission = (data: EventPortalSelected) => {

    const state = main.state;

    // we are not in edit mode or it is the first selection
    if (!main.umm.missionModeActive || main.umm.missionModeResuming) {
        main.umm.missionModeResuming = false;
        return;
    }

    if (lastPortal === data.selectedPortalGuid) {
        return;
    }
    lastPortal = data.selectedPortalGuid;

    const mission = state.getEditMission();
    if (!mission) return;

    const portalToAdd = mission.portals.create(data.selectedPortalGuid);

    if (mission.portals.includes(portalToAdd)) {
        if (mission.portals.isEnd(portalToAdd)) {
            const pstate = state.get();
            notification(`${main.state.getBannerName()}\nPortal already in mission #${pstate.currentMission + 1}`);
        }
    } else {
        const preMission = state.missions.previous(mission);
        if (preMission && preMission.portals.includes(portalToAdd) &&
            (!preMission.portals.isStart(portalToAdd) && !preMission.portals.isEnd(portalToAdd))
        ) {
            if (confirm("Split mission?")) {
                const index = preMission.portals.indexOf(portalToAdd);
                mission.portals.clear();
                state.missions.split(preMission, index, mission);

                state.save();
                main.redrawAll();
                return;
            }
        }

        mission.portals.add(portalToAdd);
        state.save();

        main.redrawAll();

        const pstate = state.get();
        notification(`${main.state.getBannerName()}\nAdded to mission #${pstate.currentMission + 1}`)
    }
}


export const clearMissionData = () => {
    main.state.reset();
    main.state.save();

    updateCurrentActiveMissionSidebar(main.state);
    main.umm.reloadSettingsWindowIfNeeded();
    if (main.umm.missionModeActive) {
        toggleMissionMode();
    }
    main.redrawAll();
}


export const removeLastPortal = () => {
    const mission = main.state.getEditMission();

    // If currentMission has 0 portals, refuse
    if (mission && mission.portals.length > 0) {

        mission.portals.remove(mission.portals.length - 1);
        main.state.save();

        main.redrawAll();

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
            main.umm.setCurrentMission(mission.id - 1);
            main.state.save();

            main.state.getEditMission()?.focusLastPortal();
            notification(`${main.state.getBannerName()}\nLast mission removed\nSwitched to previous mission ${mission.id + 2}\n`);
        } else {
            notification(`${main.state.getBannerName()}\nCan't undo\nAlready on last mission\n`);
        }
    }
};




export const toggleMissionMode = () => {

    if (main.umm.missionModeActive) {
        main.umm.missionModeActive = false;
        $('#umm-toggle-bookmarks').css("background-color", "");
    } else {
        if (!main.state.isValid()) {
            // Mission data not set, ask for details, then attempt to enable mission mode again on Save
            editMissionSetDetails(true);
            notification("Mission mode inactive\nPlease enter mission data\nAnd try again.");
            return
        }

        main.umm.missionModeActive = true;

        main.umm.resumeOrStartNewMission(main.state.get());
        $('#umm-toggle-bookmarks').css("background-color", "crimson");
    }

    main.renderPath.redraw();

}
