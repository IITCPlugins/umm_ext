import { Mission } from "./Mission";
import { UMM_State } from "../UMM_types";
import { migrateUmmVersion } from "./StateMigration";
import { Missions } from "./Missions";


const STORAGE_KEY = "ultimate-mission-maker";
export const fileFormatVersion = 2;


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


    isValid(): boolean {
        return this.theState.missionSetName !== "" &&
            this.theState.missionSetDescription !== "" &&
            this.theState.plannedBannerLength > 0;
    }

    get missions(): Missions {
        return new Missions(this.theState.missions);
    }

    getBannerName(): string {
        return this.theState.missionSetName;
    }

    setBannerName(name: string) {
        this.theState.missionSetName = name;
        this.theState.missions.forEach((mission, id) => mission.missionTitle = this.generateMissionTitle(id));
    }

    getBannerDesc(): string {
        return this.theState.missionSetDescription;
    }

    setBannerDesc(desc: string) {
        this.theState.missionSetDescription = desc;
        this.theState.missions.forEach(mission => mission.missionDescription = this.theState.missionSetDescription);
    }

    getTitleFormat(): string {
        return this.theState.titleFormat;
    }

    setTitleFormat(name: string) {
        this.theState.titleFormat = name;
        this.theState.missions.forEach((mission, id) => mission.missionTitle = this.generateMissionTitle(id));
    }


    getPlannedLength(): number {
        return this.theState.plannedBannerLength;
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


    private generateMissionTitle(missNumber: number): string {
        return Missions.generateMissionTitle(missNumber, this.getPlannedLength(), this.theState.missionSetName, this.theState.titleFormat);
    }


    getEditMission(): Mission | undefined {
        return this.missions.get(this.theState.currentMission);
    }


    setCurrent(missionId: number) {
        console.assert(missionId >= 0 && missionId < this.getPlannedLength(), "mission id out of bounds");
        this.theState.currentMission = missionId;
    }

    getCurrent(): number {
        return this.theState.currentMission;
    }


    isCurrent(missionId: number): boolean {
        return this.theState.currentMission === missionId;
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


    checkAllPortals() {
        let updated = false;

        this.theState.missions.forEach(mission => {
            mission.portals.forEach(portal => {
                const iitcPortal = window.portals[portal.guid]?.options.data;
                if (iitcPortal) {
                    if (portal.imageUrl !== iitcPortal.image ||
                        portal.title !== iitcPortal.title) {
                        portal.imageUrl = iitcPortal.image;
                        portal.title = iitcPortal.title;
                        updated = true;
                    }
                }
            });
        });
        if (updated) this.save();
    }

}