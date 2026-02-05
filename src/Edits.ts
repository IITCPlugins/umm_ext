import { main } from "./Main";
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
            notification(`${pstate.missionSetName}\nPortal already in mission #${pstate.currentMission + 1}`);
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
        notification(`${pstate.missionSetName}\nAdded to mission #${pstate.currentMission + 1}`)
    }
}


// TODO move to real function
export const clearMissionData = () => {
    main.state.reset();
    main.state.save();

    main.umm.updateCurrentActiveMissionSidebar(main.state.get());
    main.umm.reloadSettingsWindowIfNeeded();
    if (main.umm.missionModeActive) {
        main.umm.toggleMissionMode();
    }
    main.redrawAll();
}