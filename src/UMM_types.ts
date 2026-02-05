/* eslint-disable unicorn/filename-case */

// Format of UMM plugin (partial)
export interface UMM {

    // properties
    ummMissionPaths: L.LayerGroup<any>;
    ummMissionNumbers: L.LayerGroup<any>;
    missionModeActive: boolean; // in edit mode
    missionModeResuming: boolean; // true while mission is activated (this triggers a portal select)
    lastPortal: string; // last portal (to prevent multiple runs)

    // methods
    drawMissions: () => void; // REPLACED
    refreshMissionNumbers: () => void; // REPLACED

    getUmmState: () => UMM_State;  // REPLACED
    saveUmmState: (ummState: UMM_State) => void;  // REPLACED
    clearMissionData: () => void; // REPLACED
    nextMission: () => void; // REPLACED
    previousMission: () => void; // REPLACED

    addPortalToCurrentMission: (data: EventPortalSelected) => void; // REPLACED
    updateMissionPortalsDetails: (data: EventPortalDetailsUpdated) => void;  // removed/REPLACED

    updatePortalCountSidebar: () => void;
    notification: (message: string) => void;
    toggleMissionMode: () => void;
    setCurrentMission: (mission: number) => void;
    updateCurrentActiveMissionSidebar: (ummState: UMM_State) => void;
    reloadSettingsWindowIfNeeded: () => void;
}


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
    isOrnamented: boolean; // Unknown what it does, seems false everwhere
    isStartPoint: boolean; // Unknown what NIA uses it for, seems false everywhere
    title: string;
    type: string;
    objective: any;
}

