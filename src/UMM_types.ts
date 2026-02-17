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
    isOrnamented: false;  // only used in MEPoral - can be removed
    isStartPoint: false;  // only used in MEPoral - can be removed
    title: string;
    type: "PORTAL"; // only used in MEPoral - can be removed
    objective: UMM_Objective;
}


export const enum Action {
    HACK_PORTAL = "HACK_PORTAL",
    INSTALL_MOD = "INSTALL_MOD",
    CAPTURE_PORTAL = "CAPTURE_PORTAL",
    CREATE_LINK = "CREATE_LINK",
    CREATE_FIELD = "CREATE_FIELD",
    PASSPHRASE = "PASSPHRASE",
};

export interface UMM_Objective {
    type: Action;
    passphrase_params: UMM_Passphrase;
}

export interface UMM_Passphrase {
    question: string;
    _single_passphrase: string;
}

