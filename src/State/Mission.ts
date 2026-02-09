import { Portals } from "./Portals";
import { UMM_Mission } from "../UMM_types";



export class Mission {

    private missionID: number;
    private data: UMM_Mission;
    private portal_data: Portals;

    constructor(id: number, data: UMM_Mission) {
        this.missionID = id;
        this.data = data;
        this.portal_data = new Portals(data.portals);
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

    hasPortals(): boolean {
        return this.portal_data.length > 0;
    }

    getLocations(): L.LatLng[] {
        return this.portal_data.toLatLng();
    }

    show() {
        if (this.hasPortals()) {
            const bounds = new L.LatLngBounds(this.getLocations()).pad(0.2);
            window.map.fitBounds(bounds, { maxZoom: 18 });
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
        const locations = this.portals.toLatLng();
        return locations.reduce((sum, ll, index, lls) => index > 0 ? sum + ll.distanceTo(lls[index - 1]) : 0, 0);
    }

    reverse() {
        this.portal_data.reverse();
    }
}
