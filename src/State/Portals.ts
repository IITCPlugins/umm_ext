import { Action, UMM_Portal } from "../UMM_types";
import { State } from "./State";


export class Portals {

    private state: State;
    private data: UMM_Portal[];

    constructor(state: State, data: UMM_Portal[]) {
        this.state = state;
        this.data = data;
    }

    get length(): number {
        return this.data.length;
    }

    /**
     * @param index negative values count from the end
     */
    get(index: number): UMM_Portal | undefined {
        return this.data.at(index);
    }

    getRange(start?: number, end?: number): UMM_Portal[] {
        return this.data.slice(start, end);
    }

    set(index: number, portal: UMM_Portal) {
        this.data[index] = portal;
        this.state.onMissionPortal.trigger();
    }

    add(...portal: UMM_Portal[]) {
        console.assert(!portal.some(p => this.includes(p.guid)), "portal is already in");
        this.data.push(...portal);
        this.state.onMissionPortal.trigger();
    }

    insert(index: number, ...portal: UMM_Portal[]) {
        console.assert(!portal.some(p => this.includes(p.guid)), "portal is already in");
        this.data.splice(index, 0, ...portal);
        this.state.onMissionPortal.trigger();
    }

    remove(index: number, count = 1) {
        this.data.splice(index, count);
        this.state.onMissionPortal.trigger();
    }

    clear() {
        this.data.length = 0;
        this.state.onMissionPortal.trigger();
    }

    toLatLng(): L.LatLng[] {
        return this.data.map(portal => new L.LatLng(portal.location.latitude, portal.location.longitude));
    }

    /**
     * @param index negative values count from the end
     */
    getLatLngOf(index: number): L.LatLng | undefined {
        const portal = this.get(index);
        if (!portal) return;
        return new L.LatLng(portal.location.latitude, portal.location.longitude);
    }

    includes(guid: PortalGUID): boolean {
        return this.data.some(x => x.guid === guid);
    }

    find(guid: PortalGUID): UMM_Portal | undefined {
        return this.data.find(x => x.guid === guid);
    }

    indexOf(portal: UMM_Portal): number {
        return this.data.findIndex(x => x.guid === portal.guid);
    }


    isStart(portal: UMM_Portal): boolean {
        return this.data[0]?.guid === portal.guid;
    }

    isEnd(portal: UMM_Portal): boolean {
        return this.data.at(-1)?.guid === portal.guid;
    }

    reverse() {
        this.data.reverse();
        this.state.onMissionPortal.trigger();
    }

    create(guid: string): UMM_Portal {
        const iitcPortal = window.portals[guid];
        console.assert(iitcPortal, "portal not defined");

        // TODO try to get full details of iitc-cache

        const options = iitcPortal.options.data;
        const ll = iitcPortal.getLatLng();

        return {
            guid,
            title: options.title || '[undefined]',
            imageUrl: options.image,
            description: "",
            location: { latitude: ll.lat, longitude: ll.lng },
            isOrnamented: false,
            isStartPoint: false,
            type: "PORTAL",
            objective: { type: Action.HACK_PORTAL, passphrase_params: { question: "", _single_passphrase: "" } }
        }
    }
}
