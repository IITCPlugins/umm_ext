/* eslint-disable unicorn/filename-case */


// State
export interface UMM_State {
    missionSetName: string;
    missionSetDescription: string;
    currentMission: number;
    missions: UMM_Mission[];
    plannedBannerLength: number;
    titleFormat: string
    fileFormatVersion: number;

    layers: boolean[];
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

