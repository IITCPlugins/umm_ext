import { Mission } from "./Mission";
import { UMM_State } from "../UMM_types";


const STORAGE_KEY = "ultimate-mission-maker";
const fileFormatVersion = 2;


export class State {

    private theState: UMM_State;

    constructor() {
        this.load();
    }


    get(): UMM_State {
        return this.theState;
    }


    load() {
        const data = localStorage.getItem(STORAGE_KEY)
        if (data) {
            const anyState = JSON.parse(data);
            this.theState = this.migrateUmmVersion(anyState);
        } else {
            this.reset();
        }
    }


    save() {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.theState));
    }


    reset() {
        this.theState = {
            missionSetName: '',
            missionSetDescription: '',
            currentMission: 0,
            plannedBannerLength: 0,
            titleFormat: "T NN-M",
            fileFormatVersion: fileFormatVersion,
            missions: [
                {
                    missionTitle: '',
                    missionDescription: '',
                    portals: []
                }],
        };
    }


    migrateUmmVersion(ummState: any): UMM_State {

        // Original beta didn't have a fileFormatVersion yet
        if (ummState.fileFormatVersion === undefined || ummState.fileFormatVersion === "") {
            // Because of slight variations on BETA's we do some checks to avoid overwriting any data
            const undefinedOrEmptyString = (value: any): boolean => {
                if (value == undefined || value == "") {
                    return true
                }
                return false;
            }

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
                        const missionTitle = this.generateMissionTitle(parseInt(mission) + 1)
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

        return ummState as UMM_State;
    }


    getPlannedLength(): number {
        return this.theState.plannedBannerLength > 0 ?
            this.theState.plannedBannerLength
            : this.theState.missions.length;
    }


    generateMissionTitle(missNumber: number): string {
        let missTitleNew = this.theState.titleFormat || "";

        if (missTitleNew != "") {
            // Total
            const planned = this.getPlannedLength()
            if (planned >= 1) {
                missTitleNew = missTitleNew.replace(/(M+)/g, planned.toString());
            }

            if (missNumber >= 0) {
                const missionNumberFormat = this.theState.titleFormat.match(/N+/g)?.[0];
                if (missionNumberFormat) {
                    if (missionNumberFormat.length > 1) {
                        const missionNumberInTitle = "0".repeat(planned.toString().length - missNumber.toString().length) + missNumber.toString();
                        missTitleNew = missTitleNew.replace(/(N+)/g, missionNumberInTitle);
                    } else {
                        missTitleNew = missTitleNew.replace(/(N)/, missNumber.toString());
                    }
                }

                // Titel
                if (this.theState.missionSetName !== "") {
                    missTitleNew = missTitleNew.replace("T", this.theState.missionSetName);
                }
            }
        }
        return missTitleNew;
    }


    getMission(missionId: number): Mission | undefined {
        return this.theState.missions[missionId] && new Mission(this.theState.missions[missionId]);
    }

    forEachMission(callback: (mission: Mission, index: number) => void) {
        this.theState.missions.forEach((missionData, index) => {
            const mission = new Mission(missionData);
            callback(mission, index);
        });
    }

    isCurrent(missionId: number): boolean {
        return this.theState.currentMission === missionId;
    }
}



