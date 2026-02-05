import { UMM_Mission } from "../UMM_types";
import { Mission } from "./Mission";

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


    forEach(callback: (mission: Mission, index: number) => void) {
        this.data.forEach((missionData, index) => {
            const mission = new Mission(index, missionData);
            callback(mission, index);
        });
    }

    previous(mission: Mission): Mission | undefined {
        let preMissionID = mission.id - 1;
        let preMission;
        while ((preMission = this.get(preMissionID))?.hasPortals() && preMissionID > 0) preMissionID--;
        return preMission;
    }

    next(mission: Mission): Mission | undefined {
        return this.get(mission.id + 1);
    }


    merge(destination: Mission, missionB: Mission) {
        destination.portals.add(...missionB.portals.all());
        missionB.portals.clear();
    }

    split(source: Mission, at: number, destination: Mission) {
        const toMove = source.portals.all().slice(at)
        destination.portals.insert(0, ...toMove);
        source.portals.remove(at, toMove.length)
    }


}