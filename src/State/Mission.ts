import { Portals } from "./Portals";
import { Rect, UMM_Mission } from "../UMM_types";
import { State } from "./State";
import { Bimage } from "../Helper/Image";


export class Mission {

    private missionID: number;
    private data: UMM_Mission;
    private portal_data: Portals;
    private state: State;

    constructor(state: State, id: number, data: UMM_Mission) {
        this.missionID = id;
        this.data = data;
        this.state = state;
        this.portal_data = new Portals(state, data.portals);
    }

    isEmpty(): boolean {
        return this.title === "" || this.description === '' || this.portals.length === 0;
    }

    get title(): string {
        return this.data.missionTitle;
    }

    get portals(): Portals {
        return this.portal_data;
    }

    get id(): number {
        return this.missionID;
    }

    get description(): string {
        return this.data.missionDescription;
    }

    hasImage(): boolean {
        return this.data.image >= 0 && this.state.getImage(this.data.image) !== undefined;
    }

    getImage(): Bimage {
        const origin = this.state.getImage(this.data.image);
        if (!origin) return Bimage.empty();

        const r = this.data.rect;
        return r ? origin.crop(r.x, r.y, r.width, r.height) : origin;
    }

    setImage(id: number, rect?: Rect) {
        this.data.image = id;
        this.data.rect = rect;
    }

    getImageFilename(): string {
        return `badge_${this.id + 1}.png`;
    }

    get imageRect(): Rect | undefined {
        return this.data.rect;
    }

    set imageRect(rect: Rect) {
        this.data.rect = Object.assign({}, rect);
    }

    get imageID(): number {
        return this.data.image;
    }

    hasPortals(): boolean {
        return this.portal_data.length > 0;
    }

    getLocations(): L.LatLng[] {
        return this.portal_data.toLatLng();
    }

    getSequential(): { sequential: boolean, hiddenLocation: boolean } {
        return this.state.getSequential();
    }


    show(forceZoom = false) {
        if (this.hasPortals()) {
            const bounds = new L.LatLngBounds(this.getLocations()).pad(0.2);
            if (bounds.isValid()) {
                const minBounds = bounds.pad(-0.3);
                if (forceZoom || !window.map.getBounds().intersects(minBounds))
                    window.map.fitBounds(bounds, { maxZoom: 18 });
            }
        }
    }


    focusLastPortal(): boolean {
        const last_ll = this.portal_data.getLatLngOf(-1);
        const last = this.portal_data.get(-1);
        if (last && last_ll) {
            window.map.setView(last_ll);
            window.renderPortalDetails(last.guid);
            return true;
        }
        return false;
    }

    getDistance(): number {
        return this.portals.getDistance();
    }

    clear() {
        this.portal_data.clear();
    }

    reverse() {
        this.portal_data.reverse();
    }
}
