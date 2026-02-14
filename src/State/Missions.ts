import { UMM_Mission, UMM_Portal } from "../UMM_types";
import { Mission } from "./Mission";
import { Portals } from "./Portals";
import { State } from "./State";

export type ErrorReport = Record<string, number[]>;
export const MIN_PORTALS_PER_MISSION = 6;

export class Missions {


    static generateMissionTitle(missNumber: number, plannedBannerLength: number | undefined, missSetName: string | undefined, missNameFormat: string | undefined): string {
        // eslint-disable-next-line unicorn/prefer-default-parameters
        const format = missNameFormat ?? "";

        if (!format) {
            return "";
        }

        let title = format;
        const totalMissions = plannedBannerLength ?? 0;

        // Replace total mission count (M+)
        if (totalMissions >= 1) {
            title = title.replace(/M+/g, totalMissions.toString());
        }

        // Replace mission number (N or N+)
        if (missNumber >= 0) {
            const numberPattern = format.match(/N+/g)?.[0];
            if (numberPattern) {

                const length = numberPattern.length > 1 ? totalMissions.toString().length : 0;
                const paddedNumber = (missNumber + 1).toString().padStart(length, '0');
                title = title.replace(/N+/g, paddedNumber);
            }
        }

        // Replace mission set name (T)
        if (missSetName?.trim()) {
            title = title.replace(/T/g, missSetName);
        }

        return title;
    }


    private state: State;
    private data: UMM_Mission[];

    constructor(state: State, data: UMM_Mission[]) {
        this.state = state;
        this.data = data;
    }


    get(missionId: number): Mission | undefined {
        const mis = this.data[missionId];
        return mis && new Mission(this.state, missionId, mis);
    }


    count(): number {
        return this.data.length;
    }


    forEach(callback: (mission: Mission) => void) {
        this.data.forEach((missionData, index) => {
            const mission = new Mission(this.state, index, missionData);
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


    validate(): ErrorReport {
        const errors: ErrorReport = {};

        const notEnoughWaypoint = this.filter(m => m.portals.length < MIN_PORTALS_PER_MISSION)
            .map(m => m.id);
        if (notEnoughWaypoint.length > 0) {
            errors["not enough waypoints"] = notEnoughWaypoint;
        }

        return errors;
    }

    zoom() {
        const location = this.data.flatMap(m => new Portals(this.state, m.portals).toLatLng())
        if (location.length > 0) {
            const bounds = new L.LatLngBounds(location).pad(0.1);
            window.map.fitBounds(bounds, { maxZoom: 18 });
        }
    }

    merge(destination: Mission, missionB: Mission) {
        destination.portals.add(...missionB.portals.getRange());
        missionB.portals.clear();
    }

    mergeAll() {
        const portals: UMM_Portal[] = []
        this.data.forEach(m => {
            portals.push(...m.portals);
            portals.length = 0;
        });

        this.data[0].portals = portals;
    }


    split(source: Mission, at: number, destination: Mission) {
        const toMove = source.portals.getRange(at)
        destination.portals.insert(0, ...toMove);
        source.portals.remove(at, toMove.length)
    }


    splitIntoMultiple(source: Mission, count: number, restAtLast = false) {
        console.assert(count > 1, "nothing to split");

        const allPortals = this.getAllPortalsOf(source.id, count);
        const total = allPortals.length;
        let portalsPerMission = total / count;
        if (restAtLast) portalsPerMission = Math.floor(portalsPerMission);


        for (let i = 0; i < count; i++) {
            const start = Math.floor(portalsPerMission * i);
            let end = Math.floor(portalsPerMission * (i + 1));
            if (i === count - 1) end = allPortals.length;

            const mission = this.get(source.id + i);
            mission?.portals.clear();
            mission?.portals.add(...allPortals.slice(start, end));
        }
    }


    private getAllPortalsOf(from: number, count: number): UMM_Portal[] {
        const allPortals: UMM_Portal[] = [];
        for (let i = 0; i < count; i++) {
            const mission = this.get(from + i)!;
            if (mission) allPortals.push(...mission.portals.getRange());
        }

        return allPortals;
    }

    getMissionsOfPortal(guid: PortalGUID): number[] {
        return this.filter(mis => mis.portals.includes(guid)).map(m => m.id);
    }


}