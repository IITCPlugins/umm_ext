import { UMM_Mission, UMM_Portal } from "../UMM_types";
import { Mission } from "./Mission";

export type ErrorReport = Record<string, number[]>;
export const MIN_PORTALS_PER_MISSION = 6;

export class Missions {

    private data: UMM_Mission[];

    constructor(data: UMM_Mission[]) {
        this.data = data;
    }


    get(missionId: number): Mission | undefined {
        const mis = this.data[missionId]
        return mis && new Mission(missionId, mis);
    }


    count(): number {
        return this.data.length;
    }


    forEach(callback: (mission: Mission) => void) {
        this.data.forEach((missionData, index) => {
            const mission = new Mission(index, missionData);
            callback(mission);
        });
    }

    filter(callback: (mission: Mission) => boolean): Mission[] {
        const result: Mission[] = [];
        this.forEach(mission => {
            if (callback(mission)) result.push(mission);
        });
        return result
    }

    previous(mission: Mission): Mission | undefined {
        let preMissionID = mission.id - 1;
        let preMission;
        while (!(preMission = this.get(preMissionID))?.hasPortals() && preMissionID > 0) preMissionID--;
        return preMission;
    }

    next(mission: Mission): Mission | undefined {
        return this.get(mission.id + 1);
    }

    distanceToStart(id: number): number | undefined {
        const mission = this.get(id);
        if (!mission) return;

        const previous = this.previous(mission);
        const first = previous?.portals.getLatLngOf(-1);
        const last = mission.portals.getLatLngOf(0);
        if (!first || !last) return;

        return first.distanceTo(last);
    }


    getTotalDistance(): number {
        const waypoints: L.LatLng[] = [];
        this.forEach(m => waypoints.push(...m.getLocations()));

        return waypoints.reduce((sum, ll, index, lls) => index > 0 ? sum + ll.distanceTo(lls[index - 1]) : 0, 0)
    }


    invalide(): ErrorReport {
        const errors: ErrorReport = {};

        const notEnoughWaypoint = this.filter(m => m.portals.length < MIN_PORTALS_PER_MISSION)
            .map(m => m.id);
        if (notEnoughWaypoint.length > 0) {
            errors["not enough waypoints"] = notEnoughWaypoint;
        }

        return errors;
    }

    merge(destination: Mission, missionB: Mission) {
        destination.portals.add(...missionB.portals.getRange());
        missionB.portals.clear();
    }

    split(source: Mission, at: number, destination: Mission) {
        const toMove = source.portals.getRange(at)
        destination.portals.insert(0, ...toMove);
        source.portals.remove(at, toMove.length)
    }

    splitIntoMultiple(source: Mission, count: number) {
        console.assert(count > 1, "nothing to split");

        const total = source.portals.length;
        const portalsPerMission = total / count;

        const allPortals: UMM_Portal[] = [];
        for (let i = 0; i < count; i++) {
            const mission = this.get(source.id + i)!;
            if (!mission) return;
            allPortals.push(...mission.portals.getRange());
        }

        for (let i = 0; i < count; i++) {
            const start = Math.floor(portalsPerMission * i);
            const end = Math.floor(portalsPerMission * (i + 1));

            const mission = this.get(source.id + i);
            mission?.portals.clear();
            mission?.portals.add(...allPortals.slice(start, end));
        }
    }
}