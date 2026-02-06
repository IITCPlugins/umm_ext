import { Mission } from "./Mission";
import { UMM_State } from "../UMM_types";
import { main } from "../Main";
import { migrateUmmVersion } from "./StateMigration";
import { Missions } from "./Missions";
import { notification } from "../UI/Notification";


const STORAGE_KEY = "ultimate-mission-maker";
const fileFormatVersion = 2;


export class State {

    private theState: UMM_State;

    constructor() {
        this.load();

        window.addHook("portalDetailsUpdated", event => this.checkPortal(event));
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
            plannedBannerLength: 1,
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

    get missions(): Missions {
        return new Missions(this.theState.missions);
    }

    getPlannedLength(): number {
        return this.theState.plannedBannerLength;
    }

    getBannerName(): string {
        return this.theState.missionSetName;
    }

    getBannerDesc(): string {
        return this.theState.missionSetDescription;
    }


    setPlannedLength(count: number) {
        count = Math.max(count, 1)
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

                const length = numberPattern.length > 1 ? totalMissions.toString().length : 0;
                const paddedNumber = window.zeroPad(missNumber, length);
                title = title.replace(/N+/g, paddedNumber);
            }
        }

        // Replace mission set name (T)
        if (missSetName?.trim()) {
            title = title.replace(/T/g, missSetName);
        }

        return title;
    }


    getEditMission(): Mission | undefined {
        return this.missions.get(this.theState.currentMission);
    }


    isCurrent(missionId: number): boolean {
        return this.theState.currentMission === missionId;
    }


    nextMission() {
        if (this.theState.currentMission >= this.theState.plannedBannerLength - 1) return;

        // Activate the new mission
        main.umm.setCurrentMission(this.theState.currentMission + 1)

        const mission = this.missions.get(this.theState.currentMission)!;
        console.assert(mission, "no mission found");

        if (mission.hasPortals()) {
            this.showMission(mission);
        } else {
            notification(`${this.theState.missionSetName}\nStart of mission #${this.theState.currentMission + 1}\nSelect start portal.`);
        }
    }

    prevMission() {
        if (this.theState.currentMission <= 0) return;

        // Activate the new mission
        main.umm.setCurrentMission(this.theState.currentMission - 1)

        const mission = this.missions.get(this.theState.currentMission)!;
        console.assert(mission, "no mission found");

        if (mission.hasPortals()) {
            this.showMission(mission);
        }
    }

    showMission(mission: Mission) {
        if (mission.hasPortals()) {
            mission.show();

            main.umm.updatePortalCountSidebar();

            if (main.umm.missionModeActive) {
                notification(`Mission mode active.\n${this.theState.missionSetName}\nCurrent mission #${this.theState.currentMission + 1}\nSelect next portal`);
            } else {
                notification(`${this.theState.missionSetName}\nCurrent active mission set to #${this.theState.currentMission + 1}`);
            }
        }
    }


    checkPortal(event: EventPortalDetailsUpdated) {
        let updated = false;

        this.theState.missions.forEach(mission => {
            const portal = mission.portals.find(x => x.guid === event.guid);
            if (portal) {
                if (portal.imageUrl !== event.portalData.image ||
                    portal.title !== event.portalData.title) {
                    portal.imageUrl = event.portalData.image;
                    portal.title = event.portalData.title;
                    updated = true;
                }
            }
        });

        if (updated) this.save();
    }
}