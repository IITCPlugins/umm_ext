import { UMM_Portal } from "../../UMM_types";

interface Edge {
    distance: number;
    n: number; // AntiWeight
    tau: number;
}

export class PortalNode {
    // TODO: test if separated arrays would increase performance
    // guids, weigths, taus, distances
    public edges: Map<PortalGUID, Edge>;
    public lambdaFactor: number;

    public portal: UMM_Portal;
    public forcedNext: PortalGUID | undefined;


    constructor(portal: UMM_Portal, portals: UMM_Portal[], TAU_0: number) {
        this.portal = portal;

        this.edges = new Map();

        portals.forEach(p2 => {
            if (portal.guid !== p2.guid) {
                const distance = this.distanceTo(p2);

                this.edges.set(p2.guid, {
                    distance: distance,
                    n: 1 / distance,
                    tau: TAU_0,
                });
            }
        });
    }

    get guid(): PortalGUID {
        return this.portal.guid;
    }

    private distanceTo(other: UMM_Portal): number {
        const a = L.latLng(this.portal.location.latitude, this.portal.location.longitude)
        const b = L.latLng(other.location.latitude, other.location.longitude)
        return a.distanceTo(b);
    }

}
