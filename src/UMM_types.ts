/* eslint-disable unicorn/filename-case */

// Format of UMM plugin (partial)
export interface UMM {

    // properties
    ummMissionPaths: L.LayerGroup<any>;
    missionModeActive: boolean;

    // methods
    drawMissions: () => void; // REPLACED

    getUmmState: () => UMM_State;
    saveUmmState: (ummState: UMM_State) => void;

    updatePortalCountSidebar: () => void;
    notification: (message: string) => void;
    toggleMissionMode: () => void;
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
    guid: string;
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

