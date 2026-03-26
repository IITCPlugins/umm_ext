
export const getMapPortals = (useDrawTool: boolean = false, skipMarkers: boolean): IITC.Portal[] => {

    let allPortals = Object.values(window.portals);

    if (useDrawTool) {
        const polygons = getDTPolygons();
        if (polygons.length > 0) {
            allPortals = allPortals.filter(p => {
                return polygons.some(polygon => isInPolygon(polygon, p.getLatLng()))
            });
        }
    }

    if (skipMarkers) {
        const skipLocations = getDTMarkerLocations();
        if (skipLocations.length > 0) {
            allPortals = allPortals.filter(p => {
                return skipLocations.every(loc => !loc.equals(p.getLatLng()))
            });
        }

    }

    return allPortals;
}

export const hasDrawTools = (): boolean => {
    return !!window.plugin.drawTools;
}

const getDTPolygons = (): L.LatLng[][] => {
    const DT = window.plugin.drawTools;
    if (DT) {
        // eslint-disable-next-line no-underscore-dangle, @typescript-eslint/no-unsafe-argument
        return Object.values(DT.drawnItems._layers)
            .filter(layer => layer instanceof L.GeodesicPolygon)
            .map(polygon => polygon.getLatLngs());
    }
    return [];
}


const getDTMarkerLocations = (): L.LatLng[] => {
    const DT = window.plugin.drawTools;
    if (DT) {
        // eslint-disable-next-line no-underscore-dangle, @typescript-eslint/no-unsafe-argument
        return Object.values(DT.drawnItems._layers)
            .filter(layer => layer instanceof L.Marker)
            .map(marker => marker.getLatLng());
    }
    return [];
}


const isInPolygon = (polygon: L.LatLng[], point: L.LatLng): boolean => {

    if (polygon.some(p => point.equals(p))) return true;

    let c = false;
    for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
        if (((polygon[i].lat > point.lat) !== (polygon[j].lat > point.lat)) &&
            (point.lng < polygon[i].lng
                + (polygon[j].lng - polygon[i].lng) * (point.lat - polygon[i].lat)
                / (polygon[j].lat - polygon[i].lat))) {
            c = !c;
        }
    }

    return c;
}