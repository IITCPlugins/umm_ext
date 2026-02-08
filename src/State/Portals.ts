import { UMM_Portal } from "../UMM_types";


export const PortalActions = [
    { action: "HACK_PORTAL", label: "Hack portal" },
    { action: "INSTALL_MOD", label: "Install mod" },
    { action: "CAPTURE_PORTAL", label: "Capture portal" },
    { action: "CREATE_LINK", label: "Create link" },
    { action: "CREATE_FIELD", label: "Create field" },
    { action: "PASSPHRASE", label: "Enter passphrase" },
];


export class Portals {

    private data: UMM_Portal[];

    constructor(data: UMM_Portal[]) {
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
    }

    add(...portal: UMM_Portal[]) {
        console.assert(!portal.some(p => this.includes(p.guid)), "portal is already in");
        this.data.push(...portal);
    }

    insert(index: number, ...portal: UMM_Portal[]) {
        console.assert(!portal.some(p => this.includes(p.guid)), "portal is already in");
        this.data.splice(index, 0, ...portal);
    }

    remove(index: number, count = 1) {
        this.data.splice(index, count);
    }

    clear() {
        this.data.length = 0;
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
            objective: { type: "HACK_PORTAL", passphrase_params: { question: "", _single_passphrase: "" } }
        }
    }
}
