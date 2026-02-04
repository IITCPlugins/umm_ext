import { main } from "../Main";
import { Mission } from "../State/Mission";
import { UMM_Mission, UMM_Portal } from "../UMM_types";

type MarkerOptions = L.MarkerOptions & {
    portal: number;
    missionId: number;
    isMidPoint: boolean;
}

export class RenderPath {

    private missionPaths: L.LayerGroup<any>;
    private touchIcon: L.DivIcon;
    private editDragLine: L.Polyline | undefined;


    constructor(ummMissionPaths: L.LayerGroup<any>) {
        this.missionPaths = ummMissionPaths;

        this.touchIcon = L.Browser.touch ?
            new L.DivIcon({
                iconSize: new L.Point(20, 20),
                className: "leaflet-div-icon leaflet-editing-icon leaflet-touch-icon"
            }) :
            new L.DivIcon({
                iconSize: new L.Point(8, 8),
                className: "leaflet-div-icon leaflet-editing-icon"
            });

    }

    drawMissions() {
        this.missionPaths.clearLayers();

        const editMode = main.umm.missionModeActive;

        main.state.forEachMission((mission, missionId) => {
            if (main.state.isCurrent(missionId) && editMode) {
                this.drawEditMission(missionId, mission);
            }
            else
                this.drawMission(mission);
        });
    }


    private getMissionLocations(mission: UMM_Mission | undefined): L.LatLng[] {
        if (!mission) return [];
        return mission.portals.map(portal => new L.LatLng(portal.location.latitude, portal.location.longitude));
    }


    private drawMission(mission: Mission) {
        const geodesicPolyline = new L.GeodesicPolyline(mission.getLocations(), {
            color: "crimson",
            weight: 5,
            smoothFactor: 1
        });
        this.missionPaths.addLayer(geodesicPolyline);
    }


    // let _draggingLine = undefined;
    private drawEditMission(missionId: number, mission: Mission) {
        const coordinatesList = mission.getLocations();

        // Portal Markers
        coordinatesList.forEach((ll, index) => this.createDragMarker(ll, index, missionId));

        // MidPoint Marker
        coordinatesList.forEach((ll, index) => {
            if (index > 0) {
                const half = this.getCenter(coordinatesList[index - 1], ll);
                this.createDragMarker(half, index, missionId, true)
            }
        });

        const geodesicPolyline = new L.GeodesicPolyline(coordinatesList, {
            color: "#ff9a00",
            weight: 5,
            smoothFactor: 1
        });

        this.missionPaths.addLayer(geodesicPolyline);
    }


    private createDragMarker(location: L.LatLng, portalId: number, missionId: number, dummy = false) {
        const marker = new L.Marker(location, <MarkerOptions>{
            icon: this.touchIcon,
            draggable: true,
            zIndexOffset: 7000,
            opacity: dummy ? 0.4 : 1,
            portal: portalId,
            missionId: missionId,
            isMidPoint: dummy
        });

        this.missionPaths.addLayer(marker);

        marker
            .on("drag", event => { this.onMarkerDrag(event as L.LeafletMouseEvent); })
            .on("dragstart", event => { this.onMarkerDragStart(event); })
            .on("dragend", event => { this.onMarkerDragEnd(event as L.LeafletDragEndEvent); })
            .on("dblclick", event => { this.onMarkerDblClick(event as L.LeafletMouseEvent); });
    }


    private getCenter(l1: L.LatLng, l2: L.LatLng): L.LatLng {
        const p1 = window.map.project(l1);
        const p2 = window.map.project(l2);
        return window.map.unproject(p1.add(p2).divideBy(2));
    }


    private onMarkerDragStart(event: L.LeafletEvent) {
        const marker: L.Marker = event.target;
        const options: MarkerOptions = event.target.options;
        const isMidPoint = options.isMidPoint;

        const mission = main.state.getMission(options.missionId)!;
        console.assert(mission);

        if (this.editDragLine) {
            this.missionPaths.removeLayer(this.editDragLine);
        }

        const portal = options.portal;
        const portal_pre = portal > 0 ? mission.portals.get(portal - 1) : undefined;
        const portal_post = mission.portals.get(portal + (isMidPoint ? 0 : 1));

        let lls = [
            portal_pre && new L.LatLng(portal_pre.location.latitude, portal_pre.location.longitude),
            marker.getLatLng(),
            portal_post && new L.LatLng(portal_post.location.latitude, portal_post.location.longitude)
        ];

        if (!portal_pre) lls.splice(0, 1);
        if (!portal_post) lls = [lls[1], lls[0]];


        this.editDragLine = new L.Polyline(lls as L.LatLng[], {
            color: "#ff9a00",
            weight: 3,
            dashArray: '5,5',
            pointerEvents: 'none'
        });

        this.missionPaths.addLayer(this.editDragLine);
    }


    private onMarkerDrag(event: L.LeafletMouseEvent) {
        if (!this.editDragLine) return;

        const marker: L.Marker = event.target;
        const options: MarkerOptions = event.target.options;
        const state = main.umm.getUmmState();
        const mission = state.missions[options.missionId];
        console.assert(mission);

        const snappedPortal = this.getSnapPortal(marker.getLatLng(), this.getMissionLocations(mission));
        const newTarget = snappedPortal ? snappedPortal.getLatLng() : marker.getLatLng();

        const latlngs = this.editDragLine.getLatLngs();
        const index = latlngs.length === 3 ? 1 : 0;
        latlngs[index] = newTarget;
        this.editDragLine.setLatLngs(latlngs);
    }


    private onMarkerDragEnd(event: L.LeafletDragEndEvent) {
        if (this.editDragLine) {
            this.missionPaths.removeLayer(this.editDragLine);
            this.editDragLine = undefined;
        }

        const marker: L.Marker = event.target;
        const options: MarkerOptions = event.target.options;
        const mission = main.state.getMission(options.missionId)!;
        console.assert(mission);

        const coordinatesList = mission.getLocations();

        const snappedPortal = this.getSnapPortal(marker.getLatLng(), coordinatesList);
        if (!snappedPortal) {
            this.drawMissions();
            return;
        }

        // insert portal
        const portalToAdd = mission.portals.create(snappedPortal.options.guid);

        if (options.isMidPoint)
            mission.portals.insert(options.portal, portalToAdd);
        else
            this.movePortal(options.missionId, mission, options.portal, portalToAdd);

        this.saveStateAndRefresh();
    }

    private movePortal(missionId: number, mission: Mission, portalID: number, target: UMM_Portal) {

        // TODO:
        // a) when portalID === 0
        //   -> is target last of previous mission?
        //        -> confirm("Merge Missions?")
        // b) when portalID === last
        //   -> is target first of next ?
        //        -> confirm("Merge Missions?")
        // c) if this mission has only this portal and target is part of previous mission
        //        -> confirm("Split Missions?")

        /*if (portalID === 0) {
            const premission = 
            main.state.getMission(options.missionId)!;
            const preMission: Mission = main.state.getMission(options.missionId)!;
            if (preMission.po)
        }*/

        mission.portals.set(portalID, target);
    }


    private getSnapPortal(unsnappedLatLng: L.LatLng, ignore: L.LatLng[] = []): IITC.Portal | undefined {
        const containerPoint = window.map.latLngToContainerPoint(unsnappedLatLng);
        let candidates: [number, IITC.Portal][] = [];
        for (const guid in window.portals) {
            const portal = window.portals[guid];
            const ll = portal.getLatLng();
            if (ignore.some(x => x.equals(ll))) continue;

            const pp = window.map.latLngToContainerPoint(ll);
            const options = portal.options as unknown as { weight: number, radius: number }; // missing Leaflet typing
            const size = options.weight + options.radius * 5; // allow some extra space for easier snapping
            const distance = pp.distanceTo(containerPoint);
            if (distance > size) continue;
            candidates.push([distance, portal]);
        }

        if (candidates.length === 0) return;
        candidates = candidates.sort((a, b) => a[0] - b[0]);
        return candidates[0][1];
    };

    private onMarkerDblClick(event: L.LeafletMouseEvent) {
        const options: MarkerOptions = event.target.options;
        const portal = options.portal;
        if (options.isMidPoint) return;

        const mission = main.state.getMission(options.missionId)!;
        console.assert(mission);

        mission.portals.remove(portal);
        this.saveStateAndRefresh();
        main.umm.notification(`${mission.title}\nRemoved #${portal + 1} from mission`);
    }


    private saveStateAndRefresh() {
        main.state.save();
        main.umm.updatePortalCountSidebar();
        this.drawMissions();
    }
}