/* eslint-disable no-underscore-dangle */
import { GoogleMapOptions } from "./googleMaps";


/**
 * Fixing Nia / Angular Google Map - Bug  (from used ancient version)
 **/


/**
 * Patch 1)
 * the lib requires GoogleMapsApi 3.15, which is no longer available.
 * GoogleMaps-Api v3.66 treats MapOption.bounds = {} as valid element and will raise an exception.
 * we simply remove that.
 */
let originalMap: any;

const patchGoogleMaps = () => {
    // @ts-expect-error 2339 google maps is not defined
    if (!window.google?.maps?.Map || google.maps.Map === PatchedMap) {
        return false;
    }

    console.log("PATCHING google map");
    originalMap = window.google.maps.Map;
    PatchedMap.prototype = originalMap.prototype;
    window.google.maps.Map = PatchedMap;

    return true;
}

// eslint-disable-next-line prefer-arrow-functions/prefer-arrow-functions
const PatchedMap = function (element: HTMLElement, options: GoogleMapOptions): any {
    if (options?.bounds) {
        const bounds = options.bounds;

        // The old angular-google-maps library passes {}
        // during initialization. Don't give that to Google Maps.
        if (Object.keys(bounds).length === 0) {
            options = Object.assign({}, options);
            delete options.bounds;
        }
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    return new originalMap(element, options);
}

/**
 * Patch 2)
 * PolylineChildModel.clean()
 * Uses "this.polyline" without testing it.
 * If the PolyLine was created with zero points the "this.polyline" can be null/undefined.
 */
const patchPolylineClear = () => {
    // @ts-ignore
    const injector = angular.element($(".container")).injector();

    if (!injector) {
        return false;
    }

    const PolylineChildModel: any = injector.get("PolylineChildModel");

    if (PolylineChildModel.__cleanPatched) {
        return true;
    }

    console.log("PATCHING polyline");

    const originalClean = PolylineChildModel.prototype.clean;

    PolylineChildModel.prototype.clean = function () {
        if (!this.polyline) {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-call
            this.removeEvents(this.listeners);
            // eslint-disable-next-line unicorn/no-null
            this.polyline = null;
            return;
        }

        // eslint-disable-next-line @typescript-eslint/no-unsafe-return, unicorn/prefer-reflect-apply, @typescript-eslint/no-unsafe-call, prefer-rest-params
        return originalClean.apply(this, arguments);
    };

    PolylineChildModel.__cleanPatched = true;

    return true;
};


$(() => {
    patchGoogleMaps();
    // repeat until loaded
    /*const mapTimer = setInterval(() => {
        if (patchGoogleMaps()) {
            clearInterval(mapTimer);
        }
    }, 100);*/

    // Angular's injector/factory becomes available later.
    const polylineTimer = setInterval(() => {
        if (patchPolylineClear()) {
            clearInterval(polylineTimer);
        }
    }, 100);
});