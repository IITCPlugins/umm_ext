import { UMM_State } from "../UMM_types";
import { Missions } from "./Missions";
import { fileFormatVersion } from "./State";


const undefinedOrEmptyString = (value: any): boolean => {
    if (value == undefined || value == "") {
        return true
    }
    return false;
}



export const migrateUmmVersion = (ummState: any): UMM_State => {

    if (ummState.fileFormatVersion > fileFormatVersion) {
        throw new Error("UMM: You've attempted to load data that's newer than what's supported by this version of UMM. Please update the plugin and try again. Data has not been loaded.");
    }

    // Original beta didn't have a fileFormatVersion yet
    if (ummState.fileFormatVersion === undefined || ummState.fileFormatVersion === "") {
        // Because of slight variations on BETA's we do some checks to avoid overwriting any data
        if (undefinedOrEmptyString(ummState.missionSetName)) {
            // Check if old name was set, if so, use that for missionSetName, otherwise set blank
            if (undefinedOrEmptyString(ummState.missionName)) {
                ummState.missionSetName = '';
            } else {
                ummState.missionSetName = ummState.missionName;
                delete ummState.missionName; // Remove old field from state
            }
        }

        if (undefinedOrEmptyString(ummState.missionSetDescription)) {
            if (undefinedOrEmptyString(ummState.missionDescription)) {
                ummState.missionSetDescription = '';
            } else {
                ummState.missionSetDescription = ummState.missionDescription;
                delete ummState.missionDescription; // Remove old field from state
            }
        }

        if (undefinedOrEmptyString(ummState.titleFormat)) {
            ummState.titleFormat = 'T NN-M';
        }

        // Rename numberofMissions to plannedBannerLength if present, otherwise set to current banner length
        if (ummState.numberOfMissions === undefined) {
            ummState.plannedBannerLength = Object.keys(ummState.missions as Record<string, any>).length
        } else {
            ummState.plannedBannerLength = ummState.numberOfMissions;
            delete ummState.numberOfMissions;
        }

        // Check if the data is using the oldest beta format or a newer version, newer versions don't need converting for V1.
        if (!Object.keys(ummState.missions[0] as Record<string, any>).includes("portals")) {
            // Old format detected, check if data is present
            if (ummState.missions[0][0].guid) {
                // Data present, convert necessary
                const newMissions = [];
                for (const mission in ummState.missions) {

                    const plannedLength: number = (ummState.plannedBannerLength > 0 ? ummState.plannedBannerLength : ummState.missions.length);
                    const missionTitle = Missions.generateMissionTitle(ummState.titleFormat as string, {
                        misison: parseInt(mission) + 1, title: ummState.missionSetName, total: plannedLength
                    });
                    newMissions.push({ missionTitle: missionTitle, missionDescription: ummState.missionSetDescription, portals: ummState.missions[mission] })
                }
                ummState.missions = newMissions;
            } else {
                // No data detected, just set it to an empty state.
                ummState.missions = [{ missionTitle: '', missionDescription: '', portals: [] }];
            }
        }

        ummState.fileFormatVersion = 1;

    }

    if (ummState.fileFormatVersion === 1) {
        // FileFormatVersion 2 supports custom objectives for portals
        // Valid type values are: HACK_PORTAL, INSTALL_MOD, CAPTURE_PORTAL, CREATE_LINK, CREATE_FIELD, PASSPHRASE
        // NIA will ignore passphrase_params if type is not passphrase
        for (const mission in ummState.missions) {
            for (const portal in ummState.missions[mission].portals) {
                ummState.missions[mission].portals[portal].objective = { type: "HACK_PORTAL", passphrase_params: { question: "", _single_passphrase: "" } }
            }
        }
        ummState.fileFormatVersion = 2;
    }

    if (ummState.fileFormatVersion === 2) {
        // Bugfix for 0.4.0, unintentionally it had objective type HACK rather than HACK_PORTAL, not a full new fileFormatVersion
        for (const mission in ummState.missions) {
            for (const portal in ummState.missions[mission].portals) {
                if (ummState.missions[mission].portals[portal].objective.type === "HACK") {
                    ummState.missions[mission].portals[portal].objective.type = "HACK_PORTAL"
                }
            }
        }
    }

    // UMM_ext
    if (ummState.fileFormatVersion === 2) {

        // we dont want undefined values
        ummState.missionSetName ??= "";
        ummState.missionSetDescription ??= '';
        ummState.currentMission ??= 0;
        ummState.plannedBannerLength ??= 1;
        ummState.titleFormat ??= "T NN-M";
    }


    // title Foramt change
    if (ummState.fileFormatVersion < 3) {

        ummState.titleFormat = (ummState.titleFormat as string ?? "")
            .replace("T", "$T")
            .replace(/N+/, match => match.length > 1 ? "$0N" : "$N")
            .replace(/(M+)/g, "$M")

        ummState.fileFormatVersion = 3;
    }

    return ummState as UMM_State;
}