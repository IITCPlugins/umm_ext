import { UMM_Mission } from "../UMM_types";
import { Mission } from "./Mission";

export class Missions {

    private data: UMM_Mission[];

    constructor(data: UMM_Mission[]) {
        this.data = data;
    }


    get(missionId: number): Mission | undefined {
        const mis = this.data[missionId]
        return mis && new Mission(mis);
    }


    count(): number {
        return this.data.length;
    }


    forEach(callback: (mission: Mission, index: number) => void) {
        this.data.forEach((missionData, index) => {
            const mission = new Mission(missionData);
            callback(mission, index);
        });
    }


    merge(id1: number, id2: number) {
        if (id1 > id2) [id1, id2] = [id2, id1];

        const missionA = this.get(id1)!;
        const missionB = this.get(id2)!;
        console.assert(missionA && missionB, "cannot merge, mission not defined");

        missionA.portals.add(...missionB.portals.all());
        missionB.portals.clear();
    }
}