import { Mission } from "./Mission";
import { UMM_State } from "../UMM_types";
import { migrateUmmVersion } from "./StateMigration";
import { Missions } from "./Missions";
import { Trigger } from "../Helper/Trigger";
import { RenderBase } from "../UI/RenderBase";
import localforage from "localforage";
import { Bimage } from "../Helper/Image";


const STORAGE_KEY = "ultimate-mission-maker";
export const fileFormatVersion = 3;


// TODO: remove UMM_State and use a custom one
export class State {

    // data
    private theState!: UMM_State;
    private images: Bimage[] = [];
    private images_changed = false;

    // Events
    public onSelectedMissionChange: Trigger = new Trigger();
    public onMissionChange: Trigger = new Trigger();
    public onMissionPortal: Trigger = new Trigger();


    constructor() {
        localforage.config({ name: 'UUM', version: 1, });
        void this.load();
    }


    async load() {
        this.reset();

        const data = localStorage.getItem(STORAGE_KEY)
        if (!data) return;

        const anyState = JSON.parse(data);
        this.theState = migrateUmmVersion(anyState);
        this.setPlannedLength(this.getPlannedLength() || 1);

        await this.loadImages();
        this.triggerUpdate();
    }

    private async loadImages() {
        this.images = [];
        let index = 0;
        let imageData;
        while ((imageData = await localforage.getItem<string>(`image${index++}`))) {
            const image = await Bimage.fromString(imageData);
            this.images.push(image);
        }
        this.images_changed = false;
    }


    async save() {
        this.setPlannedLength(this.theState.plannedBannerLength); // TODO: remove when "get" is private/removed
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.theState));
        await this.saveImages();
    }


    private async saveImages() {
        if (!this.images_changed) return;

        const keys = await localforage.keys();
        const imageKeys = keys.filter(k => k.match(/^image\d+$/))
        imageKeys.forEach(i => localforage.removeItem(i));

        // eslint-disable-next-line @typescript-eslint/no-for-in-array
        for (const index in this.images) {
            const data = this.images[index].toString();
            await localforage.setItem<string>(`image${index}`, data);
        }

        this.images_changed = false;
    }


    async import(jsonString: string) {
        // load classic data
        const anyState = JSON.parse(jsonString);
        this.theState = migrateUmmVersion(anyState);

        // make sure Missions are initialized
        this.setPlannedLength(this.getPlannedLength() || 1);

        await this.importImages(anyState.images as string[]);

        this.triggerUpdate();
    }


    private async importImages(imageData?: string[]) {
        this.images = [];
        this.images_changed = true;
        if (!imageData || imageData.length === 0) return;

        const unresolvedPromises = imageData.map(async imgData => Bimage.fromString(imgData));
        this.images = await Promise.all(unresolvedPromises);
    };


    export(): string {
        const exportState = Object.assign({}, this.theState);

        (exportState as any).images = this.images.map(img => img.toString());
        return JSON.stringify(exportState);
    }


    private triggerUpdate() {
        this.onMissionChange.trigger();
        this.onMissionPortal.trigger();
        this.onSelectedMissionChange.trigger();
    }


    reset() {
        this.theState = {
            missionSetName: '',
            missionSetDescription: '',
            currentMission: 0,
            plannedBannerLength: 1,
            titleFormat: "$T $N / $M",
            fileFormatVersion: fileFormatVersion,
            missions: [
                {
                    missionTitle: '',
                    missionDescription: '',
                    portals: [],
                    image: -1,
                }],
            sequential: true,
            hiddenLocation: false,
            layers: []
        };

        this.images = [];
        this.images_changed = true;

        this.onMissionChange.trigger();
    }


    isEmpty(): boolean {
        return this.theState.missionSetName === "" &&
            this.theState.missionSetDescription === "" &&
            this.theState.missions.every(m => m.portals.length === 0)
    }


    isValid(): boolean {
        return this.theState.missionSetName !== "" &&
            this.theState.missionSetDescription !== "" &&
            this.theState.plannedBannerLength > 0;
    }

    get missions(): Missions {
        return new Missions(this, this.theState.missions);
    }

    getBannerName(): string {
        return this.theState.missionSetName;
    }

    setBannerName(name: string) {
        this.theState.missionSetName = name;
        this.theState.missions.forEach((mission, id) => mission.missionTitle = this.generateMissionTitle(id));

        this.onMissionChange.trigger();
    }

    getBannerDesc(): string {
        return this.theState.missionSetDescription;
    }

    setBannerDesc(desc: string) {
        this.theState.missionSetDescription = desc;
        this.theState.missions.forEach(mission => mission.missionDescription = this.theState.missionSetDescription);

        this.onMissionChange.trigger();
    }

    getTitleFormat(): string {
        return this.theState.titleFormat;
    }

    setTitleFormat(name: string) {
        this.theState.titleFormat = name;
        this.theState.missions.forEach((mission, id) => mission.missionTitle = this.generateMissionTitle(id));

        this.onMissionChange.trigger();
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
                    portals: [],
                    image: -1,
                })
            }
        }

        this.removeUnusedImages();

        this.onMissionChange.trigger();
    }

    setSequential(sequential: boolean, hiddenLocation: boolean) {
        this.theState.sequential = sequential;
        this.theState.hiddenLocation = hiddenLocation;

        // we skip this because this flags have no effect here
        // this.onMissionChange.trigger();
    }

    getSequential(): { sequential: boolean, hiddenLocation: boolean } {
        return {
            sequential: this.theState.sequential,
            hiddenLocation: this.theState.hiddenLocation
        }
    }

    private generateMissionTitle(missNumber: number): string {
        return Missions.generateMissionTitle(this.theState.titleFormat,
            { misison: missNumber, total: this.getPlannedLength(), title: this.theState.missionSetName });
    }


    getEditMission(): Mission | undefined {
        return this.missions.get(this.theState.currentMission);
    }


    setCurrent(missionId: number) {
        console.assert(missionId >= 0 && missionId < this.getPlannedLength(), "mission id out of bounds");
        this.theState.currentMission = missionId;

        this.onSelectedMissionChange.trigger();
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

        if (updated) void this.save();
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
        if (updated) void this.save();
    }


    async storeLayerState(layers: RenderBase[]) {
        this.theState.layers = layers.map(l => l.isVisible());
        await this.save();
    }

    restoreLayerState(layers: RenderBase[]) {
        this.theState.layers.forEach((vis, index) => layers[index].toggle(vis ?? true));
    }

    getImage(id: number): Bimage | undefined {
        return this.images[id];
    }

    clearImages() {
        this.images = [];
        this.images_changed = true;
    }

    addImage(image: Bimage): number {
        const asStr = image.toString();
        const index = this.images.findIndex(i => i.toString() === asStr);
        if (index !== -1) return index;

        const newIndex = this.images.push(image) - 1;
        this.images_changed = true;
        return newIndex;
    }

    /**
     * 
     * @returns true if image list was changed
     */
    removeUnusedImages(): boolean {

        const usedImages = new Set(this.missions.map(m => m.imageID));

        for (let i = this.images.length - 1; i >= 0; i--) {
            if (!usedImages.has(i)) {
                this.images.splice(i, 1);
                this.images_changed = true;

                this.missions.forEach(m => {
                    if (m.imageID >= i) {
                        m.setImage(m.imageID - 1, m.imageRect);
                    }
                });
            }
        }

        return this.images_changed;
    }

}