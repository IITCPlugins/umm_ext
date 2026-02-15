import { main } from "../Main";
import { Mission } from "../State/Mission";
import { UMM_Portal } from "../UMM_types";
import { confirmDialog } from "./Dialog/Confirm";
import { notification } from "./Notification";

type MarkerOptions = L.MarkerOptions & {
    portal: number;
    isMidPoint?: boolean;
}

const touchIcon: L.DivIcon = L.Browser.touch ?
    new L.DivIcon({
        iconSize: new L.Point(20, 20),
        className: "leaflet-div-icon leaflet-editing-icon leaflet-touch-icon"
    }) :
    new L.DivIcon({
        iconSize: new L.Point(8, 8),
        className: "leaflet-div-icon leaflet-editing-icon"
    });


export class DragMarker {

    private editDragLine: L.Polyline | undefined;
    private mission: Mission;
    private marker: L.Marker;
    private layer: L.LayerGroup<any>;
    private startLocation: L.LatLng;


    constructor(layer: L.LayerGroup<any>, location: L.LatLng, portalId: number, mission: Mission, isDummy = false) {
        this.mission = mission;
        this.layer = layer;
        this.startLocation = location;
        this.marker = new L.Marker(location, <MarkerOptions>{
            icon: touchIcon,
            draggable: true,
            zIndexOffset: 7000,
            opacity: isDummy ? 0.4 : 1,
            portal: portalId,
            isMidPoint: isDummy
        });

        layer.addLayer(this.marker);

        this.marker
            .on("drag", event => { this.onMarkerDrag(event as L.LeafletMouseEvent); })
            .on("dragstart", event => { this.onMarkerDragStart(event); })
            .on("dragend", event => { void this.onMarkerDragEnd(event as L.LeafletDragEndEvent); })
            .on("dblclick", event => { this.onMarkerDblClick(event as L.LeafletMouseEvent); });
    }

    destroy() {
        this.layer.removeLayer(this.marker);
    }


    private onMarkerDragStart(event: L.LeafletEvent) {
        const marker: L.Marker = event.target;
        const options: MarkerOptions = event.target.options;
        const isMidPoint = options.isMidPoint;

        if (this.editDragLine) {
            this.layer.removeLayer(this.editDragLine);
        }

        const portal = options.portal;
        const portal_pre = portal > 0 ? this.mission.portals.get(portal - 1) : undefined;
        const portal_post = this.mission.portals.get(portal + (isMidPoint ? 0 : 1));

        let lls: (L.LatLng | undefined)[] = [
            portal_pre && new L.LatLng(portal_pre.location.latitude, portal_pre.location.longitude),
            marker.getLatLng(),
            portal_post && new L.LatLng(portal_post.location.latitude, portal_post.location.longitude)
        ];

        // special-case:
        // single portal
        if (!portal_pre && !portal_post) lls = [marker.getLatLng(), marker.getLatLng()];
        // is start portal
        else if (!portal_pre) lls.splice(0, 1);
        // is end portal 
        else if (!portal_post) lls = [lls[1], lls[0]];


        this.editDragLine = new L.Polyline(lls as L.LatLng[], {
            color: "#ff9a00",
            weight: 3,
            dashArray: '5,5',
            pointerEvents: 'none'
        });

        this.layer.addLayer(this.editDragLine);
    }


    private onMarkerDrag(event: L.LeafletMouseEvent) {
        if (!this.editDragLine) return;

        const marker: L.Marker = event.target;

        const snappedPortal = this.getSnapPortal(marker.getLatLng(), this.mission.getLocations());
        const newTarget = snappedPortal ? snappedPortal.getLatLng() : marker.getLatLng();

        const latlngs = this.editDragLine.getLatLngs();
        const index = latlngs.length === 3 ? 1 : 0;
        latlngs[index] = newTarget;
        this.editDragLine.setLatLngs(latlngs);
    }


    private async onMarkerDragEnd(event: L.LeafletDragEndEvent) {
        if (this.editDragLine) {
            this.layer.removeLayer(this.editDragLine);
            this.editDragLine = undefined;
        }

        const marker: L.Marker = event.target;
        const options: MarkerOptions = event.target.options;

        const coordinatesList = this.mission.getLocations();

        const snappedPortal = this.getSnapPortal(marker.getLatLng(), coordinatesList);
        if (!snappedPortal) {
            this.marker.setLatLng(this.startLocation);
            return;
        }

        const portalToAdd = this.mission.portals.create(snappedPortal.options.guid);

        if (options.isMidPoint) {
            this.mission.portals.insert(options.portal, portalToAdd);
        } else {
            await this.movePortal(options.portal, portalToAdd);
        }

        main.state.save();
    }


    private async movePortal(portalID: number, target: UMM_Portal) {

        // drag portal to last mission -> merge?
        if (portalID === 0) {
            const missions = main.state.missions;
            const preMission = missions.previous(this.mission);

            if (preMission?.portals.isEnd(target)) {
                if (await confirmDialog({ message: "Merge mission ?" })) {
                    missions.merge(preMission, this.mission);
                    main.state.setCurrent(preMission.id);
                    return;
                }
            } else
                if (this.mission.portals.length === 1 && preMission?.portals.includes(target.guid)) {
                    if (await confirmDialog({ message: "Split mission ?" })) {
                        const index = preMission.portals.indexOf(target);

                        this.mission.portals.clear();
                        missions.split(preMission, index, this.mission);
                        return;
                    }
                }
        }

        // drag portal to next mission -> merge?
        if (portalID === this.mission.portals.length - 1) {
            const missions = main.state.missions;

            const postMission = missions.next(this.mission);
            if (postMission?.portals.isStart(target)) {
                if (await confirmDialog({ message: "Merge mission ?" })) {
                    missions.merge(this.mission, postMission);
                    return;
                }
            }
        }


        this.mission.portals.set(portalID, target);
    }


    private getSnapPortal(unsnappedLatLng: L.LatLng, ignore: L.LatLng[] = []): IITC.Portal | undefined {
        const containerPoint = window.map.latLngToContainerPoint(unsnappedLatLng);
        let best_portal: IITC.Portal | undefined = undefined;
        let best_distance = Infinity;
        for (const guid in window.portals) {
            const portal = window.portals[guid];
            const ll = portal.getLatLng();
            if (ignore.some(x => x.equals(ll))) continue;

            const pp = window.map.latLngToContainerPoint(ll);
            const options = portal.options as unknown as { weight: number; radius: number };  // type: missing Leaflet
            const size = options.weight + options.radius * 5; // allow some extra space for easier snapping
            const distance = pp.distanceTo(containerPoint);
            if (distance > size) continue;

            if (distance < best_distance) {
                best_distance = distance;
                best_portal = portal;
            }
        }

        return best_portal;
    }


    private onMarkerDblClick(event: L.LeafletMouseEvent) {
        const options: MarkerOptions = event.target.options;
        const portal = options.portal;
        if (options.isMidPoint) return;

        this.mission.portals.remove(portal);
        main.state.save();
        notification(`${this.mission.title}\nRemoved #${portal + 1} from mission`);
    }

}