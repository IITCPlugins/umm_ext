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

    hasPortals(): boolean {
        return this.portal_data.length > 0;
    }

    getLocations(): L.LatLng[] {
        return this.portal_data.toLatLng();
    }
}
