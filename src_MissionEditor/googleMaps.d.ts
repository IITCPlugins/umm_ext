/* eslint-disable no-underscore-dangle */


// eslint-disable-next-line @typescript-eslint/no-extraneous-class
declare class GoogleMap {
    constructor(_element: HTMLElement, _options: GoogleMapOptions);
}

declare global {
    interface Window {
        google: {
            maps: {
                Map: GoogleMap;
            };
        };
    }
}

export interface GoogleMapOptions {
    // we don't need the rest here
    bounds?: object;
}