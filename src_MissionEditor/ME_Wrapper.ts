/* eslint-disable no-underscore-dangle */
import { Mission } from "../src/State/Mission"
import { notification } from "../src/UI/Notification";
import { UMM_Portal } from "../src/UMM_types";
import { showProgress, hideProgress } from "./ProgressDialog";
import * as ME from "./ME_APP";
import * as IMATTC from "./Imattc";


// By creating a new Mission in MC and adding an image for the mission, it uploads the image to googleusercontent. The mission image URL is visible in the console source code.
// After canceling and removing the new mission, the image stays online and can be used as a portal image:
const ummLogo = "https://lh3.googleusercontent.com/s0kCRS7KE-i0gQhbH_gx-qxvC2kHBJ9TDITirnpzSJnEDV-QVDio5OFl8bJ8OC8EhPGGFOFje5HeO9M6RDklZ971e8aSPeLs";


/**
 * Angualar entry points  
*/
let angularApp: ME.App;
export const getAngularApp = (): ME.App => {
    if (!angularApp) {
        const container = document.body;  // or the Element with "ng-app"
        // @ts-ignore
        angularApp = angular.element(container) as unknown as ME.App;
    }
    return angularApp;
}


export const getScope = <T>(element?: Element | JQuery): T => {
    element ??= document.body;
    // @ts-ignore
    return angular.element(element).scope() as T;
}

// angular.element($("div.editor").scope()
export const getEditorScope = (): ME.EditorScope => {
    return getScope($("div.editor"));
}


// const getMissionsScope = (): ME.MissionsScope => {
//     return getScope($(".container").get(0));
// }


/**
 * The new Import
 */
export const doImport = async (mission: Mission) => {

    try {
        // 1. create new mission if not in editor
        showProgress("Create mission");
        if (getEditorScope() === undefined) {
            await createNewMission();
        }

        // 2. make sure Editor is ready
        const editor = getEditorScope();
        if (!checkEditorState(editor)) return;

        // 3. set basics
        editor.$apply(() => {
            const { sequential, hiddenLocation } = mission.getSequential();
            editor.mission.definition._sequential = sequential;
            editor.mission.definition._hidden = editor.mission.definition._sequential && hiddenLocation;
            editor.mission.definition.name = mission.title;
            editor.mission.definition.description = mission.description;
        });

        // 4. import mission
        showProgress("set portals");
        const missingImages = importMissionPorals(editor, mission);

        // 5. upload logo (if availabe)
        if (mission.hasImage()) {
            showProgress("upload image");
            await uploadLogo(mission);
        }

        // 6. save & go to preview page
        const nextPage = mission.hasImage() ? editor.EditorScreenViews.PREVIEW : editor.EditorScreenViews.NAME;
        showProgress("save");
        await editor.save(nextPage);
        if (editor.savingFailed) {
            throw new Error("Mission save failed");
        }


        // 7. refresh missing images
        if (missingImages > 0) {
            showProgress("save");
            notification('Refreshing mission...\n(Missing data detected)', true);
            const scope = getEditorScope();
            await loadMission(scope.mission.mission_id);
        }

        // 8. IMATTC
        if (IMATTC.isInstalled()) {
            showProgress("create category");
            // IMATTC has hijack 
            // editor.setView(editor.EditorScreenViews.PREVIEW); // <- takes 500ms 
            const category = mission.category;
            if (category && category !== "") {
                const catID = IMATTC.findOrCreateCategory(category);
                if (catID === -1) {
                    IMATTC.setCurrentMissionCat(catID);
                }
            }
        }
    } finally {
        hideProgress();
    }
}


const importMissionPorals = (editorScope: ME.EditorScope, mission: Mission): number => {

    resetWaypoints(editorScope);

    let missingImagesCount = 0;

    // disable setSelectedWaypoint
    const originalSetSelectedWaypoint = editorScope.setSelectedWaypoint;

    // add portals
    try {
        editorScope.setSelectedWaypoint = () => 0;

        for (const portal of mission.portals.getRange()) {
            const { mePortal, hasError } = createPortal(portal);
            if (hasError) missingImagesCount++;
            editorScope.addWaypoint(mePortal);
        }
    } finally {
        editorScope.setSelectedWaypoint = originalSetSelectedWaypoint;
    }

    // Store objective data (We can't overwrite objective at once, because we need to retain the constructor inside passphrase_params)
    editorScope.mission.definition.waypoints.forEach((aportal, index) => {
        const portal = mission.portals.get(index)!;
        aportal.objective!.type = portal.objective.type;
        aportal.objective!.passphrase_params.question = portal.objective.passphrase_params.question;
        aportal.objective!.passphrase_params._single_passphrase = portal.objective.passphrase_params._single_passphrase;
    })

    // Let Angular process all modifications
    editorScope.$apply();

    return missingImagesCount;
}


const checkEditorState = (editorScope: ME.EditorScope): boolean => {
    if (!($('.loading').hasClass('ng-hide'))) {
        notification('Please wait for the spinner in the top right to finish loading before importing a (new) mission');
        return false;
    }

    if (!editorScope.mission) {
        notification('You can not import a mission on this page\nStart with Create New Mission');
        return false;
    }

    if (editorScope.mission.definition.waypoints.length > 0) {
        if (!confirm("Your current mission already contains portals/waypoints. Are you sure you want to overwrite these?")) {
            return false;
        }
    }

    return true;
}


const resetWaypoints = (scope: ME.EditorScope) => {
    // Waypoints are the actual portals that get submitted
    scope.mission.definition.waypoints = [];
    // Waypointmarkers are the markers displayed on the map
    scope.waypointMarkers = [];
    scope.$apply();
}


const createPortal = (portal: UMM_Portal): { mePortal: ME.Portal, hasError: boolean } => {
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
        mePortal: {
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

const loadMission = async (missionId: number) => {
    const angularApp = getAngularApp();
    const $http = angularApp.injector().get('$http');
    const Api: ME.Api = angularApp.injector().get('Api');
    const $timeout = angularApp.injector().get('$timeout');
    const wireUtility: ME.WireUtil = angularApp.injector().get('WireUtil');
    const Styles: ME.Styles = angularApp.injector().get('Styles');

    try {
        // Use Angular's $http so MAT handles botGuard/auth/etc.
        const response: { data: { mission: string, pois: [] } } = await $http.post(Api.GET_MISSION, { mission_id: missionId });

        const data = wireUtility.convertMissionWireToLocal(
            response.data.mission,
            response.data.pois
        );

        const editScope = getEditorScope();

        // Replace mission with server version
        editScope.mission = data;

        // Wait until Angular has processed the mission replacement.
        await new Promise<void>(resolve => { $timeout(resolve, 0); });

        // Rebuild waypoint markers
        const waypoints = editScope.mission.definition.waypoints;
        const pois = waypoints.filter(p => p._poi?.location);

        // copy POIs
        editScope.waypointMarkers = pois.map((portal, index) => {
            const label = (index + 1).toString();

            return {
                id: Math.floor(1e10 * Math.random()),
                location: portal._poi!.location,
                icon: editScope.isWaypointSelected(portal)
                    ? Styles.SELECTED_WAYPOINT_ICON
                    : Styles.WAYPOINT_ICON,

                onClicked: () => editScope.setSelectedWaypoint(portal, true),
                options: {
                    labelAnchor: Styles.WAYPOINT_LABEL_ANCHOR,
                    labelClass: "waypoint-label",
                    labelContent: label,
                    zIndex: Styles.WAYPOINT_MARKER_Z_INDEX
                },
                latitude: portal._poi!.location.latitude,
                longitude: portal._poi!.location.longitude
            };
        }
        );
    } catch (error) {
        console.error("Failed to refresh mission", error);

        // If it fails, we'll just do a hard refresh
        window.alert('Failed to refresh mission, refreshing full page to fix this.')
        // eslint-disable-next-line no-self-assign
        window.location.href = window.location.href
    };
}


const createNewMission = async (): Promise<void> => {
    const angularApp = getAngularApp();
    const $location = angularApp.injector().get("$location");
    const appScope = angularApp.scope();

    return new Promise<void>(resolve => {
        const unwatch = appScope.$on("$routeChangeSuccess", () => {
            unwatch();
            resolve();
        });

        appScope.$evalAsync(() => {
            $location.path("/edit");
        });
    });
}



const uploadLogo = async (mission: Mission) => {
    const image = mission.getImage();

    const file = await image.toFile("banner.png", 'image/png');

    const editorScope = getEditorScope();
    const $upload: ME.Upload = getAngularApp().injector().get("$upload");

    const result: any = await $upload.upload({
        url: "/logo_upload/",
        file: file,
        data: {
            missionGuid: editorScope.mission.mission_guid
        }
    });

    const resultData: ME.UploadResult = result.data;

    await new Promise<void>(resolve => {
        editorScope.$evalAsync(() => {
            editorScope.mission.definition.logo_url = resultData.logo_url;
            editorScope.mission.definition.badge_url = resultData.badge_url;
            resolve();
        });
    });
}