import { main } from "../Main";
import { State } from "../State/State";

interface MissionStart {
    missionIndex: number;
    location: L.LatLng;
    auto: boolean;
}

// const MIN_PORTALS_PER_MISSION = 6;

export class RenderNumbers {

    private missionNumbers: L.LayerGroup<any>;

    constructor(ummMissionNumbers: L.LayerGroup<any>) {
        this.missionNumbers = ummMissionNumbers;
    }

    redraw() {
        this.missionNumbers.clearLayers();

        const state = main.state;
        const starts = this.getMissionStarts(state);

        starts.forEach(start => {
            const id = start.missionIndex;
            const icon = this.generateMarker(state.isCurrent(id) ? "active" : "start", id + 1);

            const marker = L.marker(start.location, {
                icon: L.divIcon({
                    className: 'umm-mission-icon',
                    iconSize: [34, 50],
                    iconAnchor: [17, 50],
                    html: icon,

                }),
                opacity: start.auto ? 0.5 : 1,
                interactive: false
            });

            this.missionNumbers.addLayer(marker);
        });
    }

    getMissionStarts(state: State): MissionStart[] {
        const missions: MissionStart[] = [];

        let mid = 0;
        while (mid < state.missionCount()) {
            const mission = state.getMission(mid);

            if (mission?.hasPortals()) {
                const start = mission.getLocations()[0]; // TODO optimize; this converts all portals to LatLng while only the first is needed
                missions.push({
                    missionIndex: mid,
                    location: start,
                    auto: false
                });
            }

            let next = mid + 1;
            for (next; next < state.missionCount(); next++) {
                const nextMission = state.getMission(next);
                if (nextMission?.hasPortals()) {
                    break;
                }
            }

            if (next > mid + 1) {
                // Fill in auto numbers for empty missions
                const count = next - mid - 1;
                const allLocations = [];
                for (let fillMid = mid; fillMid <= next; fillMid++) {
                    const fillMission = state.getMission(fillMid);
                    if (fillMission?.hasPortals()) {
                        allLocations.push(...fillMission.getLocations());
                    }
                }
                const portalsPerMission = allLocations.length / count;
                for (let fillIndex = 1; fillIndex < count; fillIndex++) {
                    const autoIndex = mid + fillIndex;
                    const locationIndex = Math.min(Math.floor(portalsPerMission * fillIndex), allLocations.length - 1);
                    missions.push({
                        missionIndex: autoIndex,
                        location: allLocations[locationIndex],
                        auto: true
                    });
                }
            }

            mid = next;
        }

        return missions;
    }

    private generateMarker(kclass: string, index: number): string {
        return `<svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 33 49" class="umm-mission-marker"><defs><style>.cls-2{fill:#fff;}</style></defs><path class="${kclass}" d="M33,18c0,8.84-12,31-16,31S1,26.84,1,18,8.16,1,17,1,33,9.16,33,18Z" transform="translate(-0.5 -0.5)"/><circle class="cls-2" cx="16.5" cy="16.5" r="13"/><foreignObject x="0" y="0" width="34px" height="34px"><span class="umm-mission-number">${index}</span></foreignObject></svg>`;
    }
}
