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
        const edge = p1.edges.get(p2.guid)!;
        return Math.pow(edge.tau, TAlpha) * Math.pow(edge.n, TBeta);
    }

    getDistance(p1: PortalNode, p2: PortalNode): number {
        const edge = p1.edges.get(p2.guid)!;
        return edge.distance;
    }


    optimize(): void {
        // test if swapping two neighbour portals will decrease the length of the route
        for (let i = 2; i < this.route.length; i++) {
            const p1 = this.route[i - 2];
            const p2 = this.route[i - 1];
            const p3 = this.route[i];
            const p4 = this.route[(i + 1) % this.route.length];

            const d1 = this.getDistance(p1, p2) + this.getDistance(p3, p4);
            const d2 = this.getDistance(p1, p3) + this.getDistance(p2, p4);

            if (d1 > d2) {
                this.route[i - 1] = p3;
                this.route[i] = p2;
                this.length += d2 - d1;
            }
        }
    }
}
