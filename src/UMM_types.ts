/* eslint-disable unicorn/filename-case */

/**
 * shared UMM functions 
 *  to prevent we are using old functions in our new code
 */
export interface UMM {

    // properties
    ummMissionPaths: L.LayerGroup<any>;
    ummMissionNumbers: L.LayerGroup<any>;
    missionModeActive: boolean; // in edit mode
    missionModeResuming: boolean; // true while mission is activated (this triggers a portal select)
    title: string;
    version: string;
    changelog: string;

    // methods
    reloadSettingsWindowIfNeeded: () => void;
    addWaypointEditorToPortal: () => void;
};


// All UMM functions 
// (these are already replaced)
export interface UMM_old extends UMM {
    // properties
    ummMissionPaths: L.LayerGroup<any>;
    ummMissionNumbers: L.LayerGroup<any>;
    missionModeActive: boolean; // in edit mode
    missionModeResuming: boolean; // true while mission is activated (this triggers a portal select)
    lastPortal: string; // last portal (to prevent multiple runs)

    // methods
    drawMissions: () => void; // REPLACED
    refreshMissionNumbers: () => void; // REPLACED
    redrawUmmIitc: () => void; // REPLACED
    setCurrentMission: (mission: number) => void; // REPLACED

    getUmmState: () => UMM_State;  // REPLACED
    saveUmmState: (ummState: UMM_State) => void;  // REPLACED
    clearMissionData: () => void; // REPLACED
    nextMission: () => void; // REPLACED
    previousMission: () => void; // REPLACED

    addPortalToCurrentMission: (data: EventPortalSelected) => void; // REPLACED
    undoPortal: () => void; // REPLACED
    toggleMissionMode: () => void; // REPLACED
    splitMissionOptions: () => void; // REPLACED
    mergeMissions: (prompt: boolean) => void; // REPLACED
    reverseMission: () => void; // REPLACED
    resumeOrStartNewMission: (state: UMM_State) => void; // REPLACED

    updateMissionPortalsDetails: (data: EventPortalDetailsUpdated) => void;  // removed/REPLACED
    notification: (message: string) => void;  // REPLACED

    about: () => void; // REPLACED
    showUmmOptions: () => void; // REPLACED
    editActiveMission: () => void; // REPLACED
    editMissionSetDetails: () => void; // REPLACED
    updateCurrentActiveMissionSidebar: (ummState: UMM_State) => void; // REPLACED
    updatePortalCountSidebar: () => void; // REPLACED
    addUmmButtons: (state: UMM_State) => void; // REPLACED

    loadFile: (event: JQuery.ChangeEvent) => void;  // REPLACED
    exportData: () => void;  // REPLACED
    storeMissingData: () => void; // REPLACED - state.checkAllPortals
    zoomAllMissions: () => void;  // REPLACED 
};


// State
export interface UMM_State {
    missionSetName: string;
    missionSetDescription: string;
    currentMission: number;
    missions: UMM_Mission[];
    plannedBannerLength: number;
    titleFormat: string
    fileFormatVersion: number;
}

export interface UMM_Mission {
    missionTitle: string;
    missionDescription: string;
    portals: UMM_Portal[];
}

export interface UMM_Portal {
    guid: PortalGUID;
    description: string;
    location: {
        latitude: number;
        longitude: number;
    };
    imageUrl: string;
    isOrnamented: boolean;  // only used in MEPoral - can be removed
    isStartPoint: boolean;  // only used in MEPoral - can be removed
    title: string;
    type: string; // only used in MEPoral - can be removed
    objective: UMM_Objective;
}

export interface UMM_Objective {
    type: string;
    passphrase_params: UMM_Passphrase;
}

export interface UMM_Passphrase {
    question: string;
    _single_passphrase: string;
}

