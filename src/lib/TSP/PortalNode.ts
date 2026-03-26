import { UMM_Portal } from "../../UMM_types";

export class PortalNode {
    public n: Map<PortalGUID, number>;
    public tau: Map<PortalGUID, number>;
    public lambdaFactor: number;

    public portal: UMM_Portal;

    constructor(portal: UMM_Portal) {
        this.portal = portal;
    }

    get guid(): PortalGUID {
        return this.portal.guid;
    }

    distanceTo(other: UMM_Portal): number {
        const a = L.latLng(this.portal.location.latitude, this.portal.location.longitude)
        const b = L.latLng(other.location.latitude, other.location.longitude)
        return a.distanceTo(b);
    }

}
