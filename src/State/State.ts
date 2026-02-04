import { Mission } from "./Mission";
import { UMM_State } from "../UMM_types";
import { main } from "../Main";
import { migrateUmmVersion } from "./StateMigration";


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
            this.theState = migrateUmmVersion(this, anyState);
        } else {
            this.reset();
        }
    }


    save() {
        this.setPlannedLength(this.theState.plannedBannerLength); // TODO: remove when "get" is private/removed
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




    getPlannedLength(): number {
        return this.theState.plannedBannerLength;
    }

    setPlannedLength(count: number) {
        this.theState.plannedBannerLength = count;
        if (this.theState.missions.length > count) {
            this.theState.missions = this.theState.missions.slice(0, count);
        }
        else {
            for (let id = this.theState.missions.length; id < count; id++) {
                this.theState.missions.push({
                    missionTitle: this.generateMissionTitle(id),
                    missionDescription: this.theState.missionSetDescription,
                    portals: []
                })
            }
        }
    }


    generateMissionTitle(missNumber: number): string {
        return this.generateMissionTitleEx(missNumber, this.getPlannedLength(), this.theState.missionSetName, this.theState.titleFormat);
    }

    generateMissionTitleEx(missNumber: number, plannedBannerLength: number | undefined, missSetName: string | undefined, missNameFormat: string | undefined): string {
        // eslint-disable-next-line unicorn/prefer-default-parameters
        let missTitleNew = missNameFormat ?? "";

        if (missTitleNew != "") {
            // Total
            const planned = plannedBannerLength || 0
            if (planned >= 1) {
                missTitleNew = missTitleNew.replace(/(M+)/g, planned.toString());
            }

            if (missNumber >= 0) {
                const missionNumberFormat = missNameFormat?.match(/N+/g)?.[0];
                if (missionNumberFormat) {
                    if (missionNumberFormat.length > 1) {
                        const missionNumberInTitle = "0".repeat(planned.toString().length - missNumber.toString().length) + missNumber.toString();
                        missTitleNew = missTitleNew.replace(/(N+)/g, missionNumberInTitle);
                    } else {
                        missTitleNew = missTitleNew.replace(/(N)/, missNumber.toString());
                    }
                }

                // Titel
                if (missSetName && missSetName !== "") {
                    missTitleNew = missTitleNew.replace("T", missSetName);
                }
            }
        }
        return missTitleNew;
    }


    missionCount(): number {
        return Math.max(this.theState.missions.length, this.theState.plannedBannerLength);
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

    nextMission() {
        if (this.theState.currentMission >= this.theState.plannedBannerLength) return;

        // Activate the new mission
        main.umm.setCurrentMission(this.theState.currentMission + 1)

        const mission = this.getMission(this.theState.currentMission)!;
        console.assert(mission, "no mission found");

        if (mission.hasPortals()) {
            this.showMission(mission);
        } else {
            main.umm.notification(this.theState.missionSetName + "\nStart of mission #" + (this.theState.currentMission + 1) + "\nSelect start portal.");
        }
    }

    prevMission() {
        if (this.theState.currentMission <= 0) return;

        // Activate the new mission
        main.umm.setCurrentMission(this.theState.currentMission - 1)

        const mission = this.getMission(this.theState.currentMission)!;
        console.assert(mission, "no mission found");

        if (mission.hasPortals()) {
            this.showMission(mission);
        }
    }

    showMission(mission: Mission) {
        if (mission.hasPortals()) {
            if (main.umm.missionModeActive) {
                // window.map.setView([ummState.missions[ummState.currentMission].portals[ummState.missions[ummState.currentMission].portals.length - 1].location.latitude, ummState.missions[ummState.currentMission].portals[ummState.missions[ummState.currentMission].portals.length - 1].location.longitude]);
                // window.renderPortalDetails(ummState.missions[ummState.currentMission].portals[ummState.missions[ummState.currentMission].portals.length - 1].guid);
                main.umm.notification("Mission mode active.\n" + this.theState.missionSetName + "\nCurrent mission #" + (this.theState.currentMission + 1) + "\nSelect next portal");
            }
            else {
                main.umm.updatePortalCountSidebar();
                main.umm.notification(this.theState.missionSetName + "\nCurrent active mission set to #" + (this.theState.currentMission + 1));
            }
        }
    }
}