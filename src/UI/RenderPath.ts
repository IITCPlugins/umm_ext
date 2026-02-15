import { debounce } from "../Helper/Debounce";
import { main } from "../Main";
import { Mission } from "../State/Mission";
import { DragMarker } from "./DragMarker";
import { RenderBase } from "./RenderBase";


export class RenderPath extends RenderBase {

    private dragMarkers: DragMarker[];


    constructor() {
        super();
        window.addLayerGroup('UMM: Mission Paths', this.layer, true);

        this.dragMarkers = [];

        main.state.onMissionChange.do(this.redraw);
        main.state.onMissionPortal.do(this.redraw);
        main.state.onSelectedMissionChange.do(this.redraw);
    }



    redrawNow = () => {
        this.layer.clearLayers();
        this.dragMarkers.forEach(m => m.destroy());
        this.dragMarkers = [];

        const editMode = main.missionModeActive;

        main.state.missions.forEach((mission) => {
            if (main.state.isCurrent(mission.id) && editMode) {
                this.drawEditMission(mission);
            } else {
                this.drawMission(mission);
            }
        });
    };
    redraw = debounce(this.redrawNow);


    private drawMission(mission: Mission) {
        const geodesicPolyline = new L.GeodesicPolyline(mission.getLocations(), {
            color: main.state.isCurrent(mission.id) ? "#ff9a00" : "crimson",
            weight: 5,
            smoothFactor: 1,
            interactive: false
        });
        this.layer.addLayer(geodesicPolyline);
    }


    // let _draggingLine = undefined;
    private drawEditMission(mission: Mission) {
        const coordinatesList = mission.getLocations();

        // Portal Markers
        coordinatesList.forEach((ll, index) => this.createDragMarker(ll, index, mission));

        // MidPoint Marker
        coordinatesList.forEach((ll, index) => {
            if (index > 0) {
                const half = this.getCenter(coordinatesList[index - 1], ll);
                this.createDragMarker(half, index, mission, true);
            }
        });

        const geodesicPolyline = new L.GeodesicPolyline(coordinatesList, {
            color: "#ff9a00",
            weight: 5,
            smoothFactor: 1
        });

        this.layer.addLayer(geodesicPolyline);
    }


    private createDragMarker(location: L.LatLng, portalId: number, mission: Mission, dummy = false) {
        this.dragMarkers.push(
            new DragMarker(this.layer, location, portalId, mission, dummy)
        );
    }


    private getCenter(l1: L.LatLng, l2: L.LatLng): L.LatLng {
        const p1 = window.map.project(l1);
        const p2 = window.map.project(l2);
        return window.map.unproject(p1.add(p2).divideBy(2));
    }
}