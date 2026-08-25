/* eslint-disable unicorn/prevent-abbreviations */
import { UMM_Objective } from "../src/UMM_types";
import * as angular from "angular";


// Angular APP
export interface App extends angular.IAngularStatic {
    scope: () => angular.IScope; // NOTE: these are not the fully correct types
};

export interface MissionData {
    ui: {
        view: "type" | "name" | "waypoints" | "preview"
    }
    mission_guid: string;
    mission_id: number;
    definition: {
        name: string;
        description: string;
        waypoints: Portal[];
        logo_url: string;
        badge_url: string;
        _sequential: boolean;
        _hidden: boolean;
    };
};

export interface EditorScope extends angular.IScope {
    // Mission data
    mission: MissionData;

    // constants
    EditorScreenViews: {
        TYPE: string;
        NAME: string;
        WAYPOINTS: string;
        PREVIEW: string;
    }
    // state-variables
    pendingSave: boolean;
    savingFailed: boolean;
    waypointMarkers: any[];
    saving: boolean;
    saved: boolean;

    addWaypoint: (portal: Portal) => void;
    isWaypointSelected: (b: Portal) => boolean;
    setSelectedWaypoint: (b: Portal, f: boolean) => void;
    setView: (screen: string) => void;
    submitMission: () => void;

    /**
     * Save current state on backend
     * NOTE: won't save if PREVIEW screen is active (except nextScreen is set)
     */
    save: (nextScreen?: string) => Promise<void>;
}

export interface MissionDef {
    // similar to MissionData but with empty and some different fields
    definition: {
        name: string;
        description: string;
    }
}


// angular.element($("container").get(0)).scope()
export interface MissionsScope extends angular.IScope {
    user: { email: string, mission_limit: number, nickname: string };
    missions: MissionDef[];
}

export interface Api {
    CANCEL_REVIEW: string;
    CREATE_DRAFT_MISSION: string;
    DELETE_DRAFT_MISSION: string;
    GET_CLUSTERS: string;
    GET_CLUSTER_DETAILS: string;
    GET_MISSION: string;
    GET_MISSIONS_LIST: string;
    GET_MISSION_FOR_PROFILE: string;
    GET_TOP_MISSIONS_FOR_PORTAL: string;
    GET_TOP_MISSIONS_IN_BOUNDS: string;
    GET_USER_MAP_PARAMS: string;
    IS_USER_ALLOWED_TO_SUBMIT_MISSION: string;
    SAVE_MISSION: string;
    SEARCH_POIS: string;
    UNPUBLISH_MISSION: string;
}

export interface Styles {
    CLUSTER_MARKER_LABEL_SIZE: number;
    CLUSTER_MARKER_Z_INDEX: number;
    FIELDTRIP_ICON: { anchor: object, url: string }
    GOOGLE_MAP_STYLES: [object, object, object]
    POI_MARKER_Z_INDEX: number;
    PORTAL_ICON: { anchor: object, url: string };
    PORTAL_ORNAMENT_ICON: { anchor: object, url: string };
    SELECTED_CLUSTER_ICON: { url: string };
    SELECTED_FIELDTRIP_ICON: { anchor: object, url: string };
    SELECTED_PORTAL_ICON: { anchor: object, url: string }
    SELECTED_WAYPOINT_ICON: { anchor: object, url: string }
    UNSELECTED_CLUSTER_ICON: { url: string }
    WAYPOINT_ICON: { anchor: object, url: string }
    WAYPOINT_LABEL_ANCHOR: string;
    WAYPOINT_LINE_STROKE_OPTIONS: { color: string, weight: number, opacity: number }
    WAYPOINT_MARKER_Z_INDEX: number;
}

export interface WireUtil {
    convertMissionHistoryWireToLocal: (a: any) => void;
    convertMissionLocalToWire: (a: any) => void;
    convertMissionWireToLocal: (a: any, f: any) => MissionData;
    getNewMission: () => void;
    getNewPassphraseParams: () => void;
    getNewWaypoint: (c: any) => void;
}

export interface Upload {
    upload: (options: { url: string, file: File, data: { missionGuid: string } }) => Promise<{ data: UploadResult }>;
}

export interface UploadResult {
    logo_url: string;
    badge_url: string;
}

export interface Portal {
    _poi?: {
        location: {
            latitude: number;
            longitude: number;
        };
    };

    "$$hashKey": string | null;
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
    objective?: UMM_Objective;
}

