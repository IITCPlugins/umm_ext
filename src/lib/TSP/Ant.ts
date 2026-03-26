import { TAlpha, TBeta } from "./TSP";
import { PortalNode } from "./PortalNode";



export class Ant {

    public route: PortalNode[];
    public notVisited: PortalNode[];
    public length: number;


    init(portals: PortalNode[], useStart: number) {
        this.notVisited = [...portals];

        this.length = 0;
        this.pickStart(useStart);
    }

    clone(): Ant {
        const newAnt = new Ant();
        newAnt.route = [...this.route];
        newAnt.length = this.length;
        newAnt.notVisited = [...this.notVisited];
        return newAnt;
    }

    private pickStart(index: number): void {
        this.route = this.notVisited.splice(index, 1);
    }


    walk(): void {

        const start = this.route.at(-1)!;
        let current = start;
        while (this.notVisited.length > 0) {
            const nextIndex = this.getNextNode(current, this.notVisited);

            const next = this.notVisited.splice(nextIndex, 1)[0];
            this.route.push(next);

            this.addNode(current, next);
            current = next;
        }

        this.length += this.getDistance(current, start);
    }

    addNode(current: PortalNode, next: PortalNode) {
        this.length += this.getDistance(current, next);
    }

    getNextNode(current: PortalNode, portals: PortalNode[]): number {
        console.assert(portals.length > 0);
        console.assert(!portals.some(p => p.guid === current.guid));

        const sum = portals.reduce((sum, p) => sum + this.getEdgeProbability(current, p), 0);

        let rand = Math.random() * sum;
        let index = -1;
        do {
            index++;
            rand -= this.getEdgeProbability(current, portals[index]);
        } while (rand > 0);

        return index;
    }

    getEdgeProbability(p1: PortalNode, p2: PortalNode): number {
        return Math.pow(p1.tau.get(p2.guid)!, TAlpha) * Math.pow(p1.n.get(p2.guid)!, TBeta);
    }

    getDistance(p1: PortalNode, p2: PortalNode): number {
        return 1 / p1.n.get(p2.guid)!;
    }


    optimize(): void {
        for (let i = 2; i < this.route.length; i++) {
            const p1 = this.route[i - 2];
            const p2 = this.route[i - 1];
            const p3 = this.route[i];
            const p4 = this.route[(i + 1) % this.route.length];

            const d1 = p1.distanceTo(p2.portal) + p3.distanceTo(p4.portal);
            const d2 = p1.distanceTo(p3.portal) + p2.distanceTo(p4.portal);

            if (d1 > d2) {
                [this.route[i - 1], this.route[i]] = [this.route[i], this.route[i - 1]];
                this.length += d2 - d1;
            }
        }
    }
}
