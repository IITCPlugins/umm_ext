/* eslint-disable unicorn/no-zero-fractions, unicorn/filename-case */
import { Ant } from "./Ant";
import { PortalNode } from "./PortalNode";
import { UMM_Portal } from "../../UMM_types";

const MAX_ANTS = 160;

const TAU_0 = 1; // high value
export const TAlpha = 1.0; // keep 1.0
export const TBeta = 5.0;  // 5 for symetric gives quick results 
const P = 0.8; // <1 ; how quick old route will be forgotten.. if ants can be processed quicker we can increase the value
const P_BEST = 0.05; // for tau_min
const USE_GLOBAL_BEST = 10; // How often the BEST route will be learned


/**
 * TSP solver using Ant Colony Optimization
 * 
 * by default it will create a round trip
 */
export class TSP<MAnt extends Ant> {

    public nodes: PortalNode[];
    public route: PortalNode[];
    public length: number;
    public best: MAnt;
    private useGlobalBest: number;
    public generation: number;

    protected antType: new () => MAnt;


    constructor(type: new () => MAnt) {
        this.antType = type;
    }


    init(portals: UMM_Portal[]): void {

        this.nodes = portals.map(p => {

            const portal = new PortalNode(p);
            portal.n = new Map();
            portal.tau = new Map();

            portals.forEach(p2 => {
                if (portal.guid !== p2.guid) {
                    portal.tau.set(p2.guid, TAU_0);

                    const distance = portal.distanceTo(p2);
                    portal.n.set(p2.guid, 1 / distance);
                }
            })

            return portal;
        })

        this.length = Infinity;
        this.useGlobalBest = USE_GLOBAL_BEST;
        this.generation = 0;
    }


    setStartEnd(start: PortalGUID, end: PortalGUID): void {
        const startNode = this.nodes.find(n => n.guid === start);
        const endNode = this.nodes.find(n => n.guid === end);

        if (!startNode || !endNode) {
            throw new Error("Start or end portal not found");
        }

        // Set (Anti)Weights to start to Infinity
        this.nodes.forEach(portal => {
            if (portal.guid !== startNode.guid) {
                portal.n.set(startNode.guid, 0);
            }
        });

        // Set (Anti)Weights for end to start to null
        endNode.n.set(startNode.guid, Infinity);
    }


    solve(generations: number, maxTime: number): void {
        this.length = Infinity;

        const startTime = Date.now()

        for (; generations > 0; generations--) {
            this.step();

            if (Date.now() - startTime > maxTime) {
                break;
            }
        }
    }


    step(): void {
        this.generation++;

        const ants = this.createAntPath();

        const bestAnt = ants.reduce((best, ant) => best.length < ant.length ? best : ant, ants[0]);
        bestAnt.optimize();

        if (bestAnt.length < this.length) {
            this.route = [...bestAnt.route];
            this.length = bestAnt.length;
            this.best = bestAnt.clone() as MAnt;
        }

        this.updatePheromons(bestAnt);
    }


    createAntPath(): MAnt[] {

        if (this.nodes.length < MAX_ANTS) {
            const countOfAnts = this.nodes.length;
            return Array.from({ length: countOfAnts }).map((_, index) => {
                const ant = new this.antType();
                ant.init(this.nodes, index);
                ant.walk();
                return ant;
            });
        } else {
            const candidates = this.sample(this.nodes.length, MAX_ANTS);
            return candidates.map(index => {
                const ant = new this.antType();
                ant.init(this.nodes, index);
                ant.walk();
                return ant;
            });
        }
    }

    private sample(max: number, count: number): number[] {
        const numbers = Array.from({ length: max }).map((_, index) => index);

        if (count > max) return numbers;

        const results: number[] = [];
        let length = numbers.length;
        for (; count > 0; count--) {
            const index = Math.floor(Math.random() * length);
            results.push(numbers[index]);
            length--;
            numbers[index] = numbers[length];
        }

        return results;
    }

    updatePheromons(bestAnt: Ant) {

        this.nodes.forEach(n => {
            n.tau.forEach((value, key) => {
                n.tau.set(key, P * value);
            })
        });


        if (this.useGlobalBest-- < 0) {
            this.useGlobalBest = USE_GLOBAL_BEST;

            this.addPheromons(this.route, this.length);
        } else {
            this.addPheromons(bestAnt.route, bestAnt.length);
        }


        const tau_max = 1 / ((1 - P) * this.length);
        const avg = this.nodes.length / 2.;
        const p = Math.pow(P_BEST, 1. / this.nodes.length);
        const tau_min = Math.min(tau_max, tau_max * (1 - p) / ((avg - 1) * p));

        this.nodes.forEach(n => {
            n.tau.forEach((value, key) => {
                if (value < tau_min) n.tau.set(key, tau_min);
                if (value > tau_max) n.tau.set(key, tau_max);
            })
        });

    }

    addPheromons(route: PortalNode[], length: number): void {
        const delta = 1 / length;
        for (let i = 0; i < route.length; i++) {
            const current = route[i];
            const next = route[(i + 1) % route.length];

            const value = current.tau.get(next.portal.guid)! + delta;
            current.tau.set(next.portal.guid, value);
            next.tau.set(current.portal.guid, value);
        }
    }


    routeChangeStart(id: PortalGUID): void {
        const index = this.route.findIndex(p => p.guid === id);

        this.route = [...this.route.slice(index), ...this.route.slice(0, index)];
    }

    routeReverse(): void {
        this.route.reverse();
        this.route = [...this.route.slice(-1), ...this.route.slice(0, -1)];
    }


    getLambdaFactor(lambda: number): number {

        let sum = 0;

        this.nodes.forEach(p => {
            const rmin = Math.min(...p.tau.values());
            const rmax = Math.max(...p.tau.values());

            const l = rmin + lambda * (rmax - rmin);

            p.lambdaFactor = [...p.tau.values()].reduce((count, r) => r > l ? count + 1 : count, 0);
            sum += p.lambdaFactor;
        });

        return sum / this.nodes.length;
    }
}


