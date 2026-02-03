import { Portals } from "./Portals";
import { UMM_Mission } from "../UMM_types";



export class Mission {

    private data: UMM_Mission;
    private portal_data: Portals;

    constructor(data: UMM_Mission) {
        this.data = data;
        this.portal_data = new Portals(data.portals);
    }

    get title(): string {
        return this.data.missionTitle;
    }

    get portals(): Portals {
        return this.portal_data;
    }

    getLocations(): L.LatLng[] {
        return this.portal_data.toLatLng();
    }
}
