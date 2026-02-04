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
        this.reset();
        const data = localStorage.getItem(STORAGE_KEY)
        if (data) {
            const anyState = JSON.parse(data);
            this.theState = migrateUmmVersion(this, anyState);
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
        const format = missNameFormat ?? "";

        if (!format) {
            return "";
        }

        let title = format;
        const totalMissions = plannedBannerLength ?? 0;

        // Replace total mission count (M+)
        if (totalMissions >= 1) {
            title = title.replace(/M+/g, totalMissions.toString());
        }

        // Replace mission number (N or N+)
        if (missNumber >= 0) {
            const numberPattern = format.match(/N+/g)?.[0];
            if (numberPattern) {
                const paddedNumber = this.zeroPad(missNumber, numberPattern.length, totalMissions);
                title = title.replace(/N+/g, paddedNumber);
            }
        }

        // Replace mission set name (T)
        if (missSetName?.trim()) {
            title = title.replace(/T/g, missSetName);
        }

        return title;
    }

    private zeroPad(missNumber: number, formatLength: number, totalMissions: number): string {
        if (formatLength <= 1) {
            return missNumber.toString();
        }

        const totalDigits = totalMissions.toString().length;
        const paddingZeros = Math.max(0, totalDigits - missNumber.toString().length);
        return "0".repeat(paddingZeros) + missNumber.toString();
    }


    missionCount(): number {
        return Math.max(this.theState.missions.length, this.theState.plannedBannerLength);
    }

    getMission(missionId: number): Mission | undefined {
        return this.theState.missions[missionId] && new Mission(this.theState.missions[missionId]);
    }

    getEditMission(): Mission | undefined {
        return this.getMission(this.theState.currentMission);
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
            main.umm.notification(`${this.theState.missionSetName}\nStart of mission #${this.theState.currentMission + 1}\nSelect start portal.`);
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
            const bounds = new L.LatLngBounds(mission.getLocations()).pad(0.2);
            window.map.fitBounds(bounds);
            main.umm.updatePortalCountSidebar();

            if (main.umm.missionModeActive) {
                main.umm.notification(`Mission mode active.\n${this.theState.missionSetName}\nCurrent mission #${this.theState.currentMission + 1}\nSelect next portal`);
            } else {
                main.umm.notification(`${this.theState.missionSetName}\nCurrent active mission set to #${this.theState.currentMission + 1}`);
            }
        }
    }
}