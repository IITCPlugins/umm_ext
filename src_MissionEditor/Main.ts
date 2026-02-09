/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { loadFileInput } from "../src/ImportExport";
import { State } from "../src/State/State";
import { notification } from "../src/UI/Notification";
import { UMM_Objective, UMM_Portal } from "../src/UMM_types";

// By creating a new Mission in MC and adding an image for the mission, it uploads the image to googleusercontent. The mission image URL is visible in the console source code.
// After canceling and removing the new mission, the image stays online and can be used as a portal image:
const ummLogo = "https://lh3.googleusercontent.com/s0kCRS7KE-i0gQhbH_gx-qxvC2kHBJ9TDITirnpzSJnEDV-QVDio5OFl8bJ8OC8EhPGGFOFje5HeO9M6RDklZ971e8aSPeLs";


interface AScope {
    mission: {
        mission_id: number;
        definition: {
            name: string;
            description: string;
            waypoints: MEPortal[];
        }
    }
    waypointMarkers: any[];
    pendingSave: boolean;
    $apply: (callback?: () => void) => void;
    addWaypoint: (portal: MEPortal) => void;
    injector: () => any;
    isWaypointSelected: (b: AMarker) => boolean;
    setSelectedWaypoint: (b: AMarker, f: boolean) => void;
};

interface AMarker {
    _poi?: {
        location: {
            latitude: number,
            longitude: number
        }
    }
}

interface MEPortal {
    "$$hashKey": string | null;
    guid: PortalGUID;
    description: string;
    location: {
        latitude: number;
        longitude: number;
    };
    imageUrl: string;
    isOrnamented: boolean; // Unknown what it does, seems false everwhere
    isStartPoint: boolean; // Unknown what NIA uses it for, seems false everywhere
    title: string;
    type: string;
    objective?: UMM_Objective;
};


class UMM_Editor {
    public state: State;


    init() {
        // eslint-disable-next-line @typescript-eslint/no-require-imports
        require("./styles.pcss");


        $('body').append("<div class='umm-notification' style='display:none'></div>");


        $('.navbar-header').append(
            $("<div>", { id: "umm-badge", text: "UMM:" }),
            $("<div>", { id: "umm-mission-editor-bar", text: "UMM:" }).append(
                $("<div>", { id: "umm-mission-title" }),
                $("<div>", { style: "display: inline-block" }).append(
                    $("<input>", { id: "umm-import-file" }),
                    $("<label>", { for: "umm-import-file", class: "umm-upload-label", text: "& nbsp;" })
                ),
                $("<div>", { id: "umm-mission-picker-wrapper" }).append(
                    $("<select>", { id: "umm-mission-picker", class: "umm-mission-picker" }),
                    $("<button>", { id: "umm-mission-picker-btn", class: "umm-mission-picker-btn", click: this.importMission, disabled: true }),
                )
            )
        );


        this.state = new State();

        this.setActiveBannerTitle();
        this.bindFileImport();
        this.generateMissionSelect();

    }


    setActiveBannerTitle() {
        if (this.state.getBannerName() === "") {
            $("#umm-mission-title").text('Please load a mission file...');
        } else {
            $("#umm-mission-title").text(this.state.getBannerName());
        }
    }


    bindFileImport() {
        $("#umm-import-file").on('change', async (event: Event) => {
            if (this.state.getBannerName() !== "") {
                if (!confirm("Are you sure you want to load this file? Doing so will overwrite any previously imported UMM data. Your existing missions will not be affected.")) {
                    return;
                }
            }
            $("#umm-mission-title").text("Loading banner... ");
            await loadFileInput(event);
            this.setActiveBannerTitle();
            this.generateMissionSelect();
        });
    }

    generateMissionSelect() {
        const selectedMission = this.state.getCurrent();

        const container = $("#umm-mission-picker");
        container.empty();

        this.state.missions.forEach(mission => {
            container.append(
                $("<option", { value: mission.id, text: `${mission.id + 1}: ${mission.title}` })
                    .prop("selected", mission.id === selectedMission)
            )
        })

        if (this.state.missions.count() > 0) {
            $("#umm-mission-picker-btn").prop("disabled", false);
        }
    }


    importMission() {
        const selectedMission = parseInt($("#umm-mission-picker").val() as string);
        main.state.setCurrent(selectedMission);
        main.state.save();

        const mission = main.state.getEditMission();

        const angularApp = this.getAngularApp();

        if (!mission || mission.title === "" || mission.description === '' && mission.portals.length === 0) {
            notification('There is no mission data loaded');
            return;
        }

        if (!($('.loading').hasClass('ng-hide'))) {
            notification('Please wait for the spinner in the top right to finish loading before importing a (new) mission');
            return;
        }

        if (!angularApp.mission) {
            notification('You can not import a mission on the preview page\nStart with Create New Mission');
            return;
        }

        if (($('.title.title-4').length > 0 && !$('.title.title-4').hasClass("ng-hide")) || $('.pagination li:nth-child(4)').hasClass('active')) { // stop import if (IMATTC) preview bullet is displayed
            notification('You can not import a mission on this page\nGo back to a previous page');
            return;
        }

        if (angularApp.mission.definition.waypoints.length > 0) {
            if (!confirm("Your current mission already contains portals/waypoints. Are you sure you want to overwrite these?")) {
                return;
            }
        }

        this.resetWaypoints(angularApp);

        angularApp.mission.definition.name = mission.title;
        angularApp.mission.definition.description = mission.description;

        let missingImagesCount = 0;
        mission.portals.getRange().forEach(portal => {
            const { mePortal, hasError } = this.createPortal(portal);
            if (hasError) missingImagesCount++;
            angularApp.addWaypoint(mePortal);
        })

        // for (let portal in scope.mission.definition.waypoints) {
        angularApp.mission.definition.waypoints.forEach((aportal, index) => {
            // We can't overwrite objective at once, because we need to retain the constructor inside passphrase_params
            const portal = mission.portals.get(index)!;
            aportal.objective!.type = portal.objective.type;
            aportal.objective!.passphrase_params.question = portal.objective.passphrase_params.question;
            // eslint-disable-next-line no-underscore-dangle
            aportal.objective!.passphrase_params._single_passphrase = portal.objective.passphrase_params._single_passphrase;
        })

        angularApp.$apply();


        // @ts-ignore
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        const angularTimeout = angularApp.injector().get('$timeout');
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        angularTimeout(() => {
            if (missingImagesCount > 0) {
                // If there are missing images, refresh as soon as the new import has been saved, otherwise it'll load the old mission data

                notification('Missing data detected\nRefreshing data to correct the issue. Standby...', true);
                const triggerRefresh = () => {
                    setTimeout(validateRefresh, 200)
                }

                const validateRefresh = () => {
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
                    const angularHttp = angularApp.injector().get('$http');
                    let isMissionSaving = false;
                    for (const request of angularHttp.pendingRequests) {
                        if (request.url === '/api/author/saveMission') {
                            isMissionSaving = true;
                        }
                    }
                    if (angularApp.pendingSave || isMissionSaving) {
                        triggerRefresh();
                    } else {
                        // When the mission has been saved, refresh it
                        notification('Refreshing mission...', true);
                        const app = this.getAngularApp();
                        void this.reloadMAT(app.mission.mission_id);
                    }
                }
                // Wait for a little bit before trigging the first refresh to increase reliability of pending save detection
                setTimeout(triggerRefresh, 200);
            } else {
                notification('UMM Mission import succesful:\n' + angularApp.mission.definition.name);
            }
        })
    }


    getAngularApp(): AScope {
        // Get angular container
        const container = document.getElementsByClassName('container')[0]
        // Get angular element
        // @ts-ignore
        const ngElement = angular.element(container);
        // Get angular scope
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        const scope: AScope = ngElement.scope();
        return scope;
    }


    resetWaypoints(scope: AScope) {
        // Waypoints are the actual portals that get submitted
        scope.mission.definition.waypoints = [];
        // Waypointmarkers are the markers displayed on the map
        scope.waypointMarkers = [];
        scope.$apply();
    }

    createPortal(portal: UMM_Portal): { mePortal: MEPortal, hasError: boolean } {
        let hasError = false;

        let imageUrl = portal.imageUrl;
        if (!imageUrl) {
            hasError = true;
            imageUrl = ummLogo; // if undefined, use the ummLogo by default until page reloads; if null, the portal has no image, keep it that way
        }

        if (imageUrl.startsWith('http:')) {
            imageUrl = imageUrl.replace('http:', 'https:'); // fix warnings: Mixed Content: The page at '<URL>' was loaded over HTTPS, but requested an insecure element '<URL>'
        }

        return {
            mePortal: <MEPortal>{
                // eslint-disable-next-line unicorn/no-null
                "$$hashKey": null,
                guid: portal.guid,
                description: portal.description,
                location: {
                    latitude: portal.location.latitude,
                    longitude: portal.location.longitude
                },
                imageUrl,
                isOrnamented: false, // Unknown what it does, seems false everwhere
                isStartPoint: false, // Unknown what NIA uses it for, seems false everywhere
                title: portal.title,
                type: "PORTAL"
            }, hasError
        };
    }



    async reloadMAT(missionId: number) {
        const angularApp = this.getAngularApp();
        const angularHttp = angularApp.injector().get('$http');
        const angularApi = angularApp.injector().get('Api');
        const angularTimeout = angularApp.injector().get('$timeout');
        const wireUtil = angularApp.injector().get('WireUtil');
        const styles = angularApp.injector().get('Styles');

        // By using the build in http we don't have to mess with botGuard and it just gets handled by MAT
        angularHttp.post(angularApi.GET_MISSION, { mission_id: missionId }).success((data: any) => {

            data = wireUtil.convertMissionWireToLocal(data.mission, data.pois);
            const angularApp = this.getAngularApp();

            // Replace mission data with the mission data retrieved from the server
            angularApp.mission = data;

            // AngularTimeout to fix double $digest issue
            angularTimeout(() => {
                // Replace the markers with the ones retrieved from the server
                // Without this, they become non-interactive

                // waypointMarkerProcessing, copied from MAT r1227
                angularApp.waypointMarkers = ((waypoints): any[] => {
                    const d: any[] = [];

                    // Processing of individual waypoints, copied from MAT r595
                    const u = (b: AMarker, d: number): any => {
                        if (b._poi) {
                            const c = (d + 1).toString();
                            return {
                                id: Math.floor(1e10 * Math.random()),
                                location: b._poi.location,
                                icon: angularApp.isWaypointSelected(b) ? styles.SELECTED_WAYPOINT_ICON : styles.WAYPOINT_ICON,
                                onClicked: function () {
                                    angularApp.$apply(() => {
                                        angularApp.setSelectedWaypoint(b, !0)
                                    })
                                },
                                options: {
                                    labelAnchor: styles.WAYPOINT_LABEL_ANCHOR,
                                    labelClass: "waypoint-label",
                                    labelContent: c,
                                    zIndex: styles.WAYPOINT_MARKER_Z_INDEX
                                },
                                latitude: b._poi.location.latitude,
                                longitude: b._poi.location.longitude
                            }
                        }
                    }
                    // @ts-ignore
                    angular.forEach(waypoints, (a, b) => {
                        const c = u(a, b);
                        d.push(c)
                    });
                    return d;
                })(angularApp.mission.definition.waypoints);
                angularApp.$apply();
                notification('UMM Mission import succesful:\n' + angularApp.mission.definition.name);
            });

        }).catch(() => {
            // If it fails, we'll just do a hard refresh
            window.alert('Failed to refresh mission, refreshing full page to fix this.')
            // eslint-disable-next-line no-self-assign
            window.location.href = window.location.href
        });
    }
}


export const main = new UMM_Editor();

// this is not IITC. just run it
(() => {
    main.init();
})();

