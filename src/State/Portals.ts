import { UMM_Portal } from "../UMM_types";



export class Portals {

    private data: UMM_Portal[];

    constructor(data: UMM_Portal[]) {
        this.data = data;
    }

    get length(): number {
        return this.data.length;
    }

    get(index: number): UMM_Portal | undefined {
        return this.data[index];
    }

    set(index: number, portal: UMM_Portal) {
        this.data[index] = portal;
    }

    insert(index: number, portal: UMM_Portal) {
        this.data.splice(index, 0, portal);
    }

    remove(index: number) {
        this.data.splice(index, 1);
    }

    toLatLng(): L.LatLng[] {
        return this.data.map(portal => new L.LatLng(portal.location.latitude, portal.location.longitude));
    }

}
