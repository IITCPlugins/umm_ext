
/**
 *  Find location distance to path
 */
export const getPathDistance = (path: L.LatLng[], location: L.LatLng): { distance: number, index: number } => {


    if (path.length === 0) {
        return { distance: Infinity, index: -1 };
    }
    if (path.length === 1) {
        return { distance: location.distanceTo(path[0]), index: 0 };
    }

    let index = 0;
    let bestPoint = path[0];
    let minDistance = Infinity;

    for (let i = 0; i < path.length - 1; i++) {
        const closestPoint = closedPoint(path[i], path[i + 1], location);
        const distance = distance2(location, closestPoint);

        if (distance < minDistance) {
            minDistance = distance;
            index = i;
            bestPoint = closestPoint;
        }
    }

    return { distance: location.distanceTo(bestPoint), index: index };
}


const closedPoint = (a: L.LatLng, b: L.LatLng, x: L.LatLng): L.LatLng => {

    const dx = b.lat - a.lat;
    const dy = b.lng - a.lng;
    const d = (dx * dx + dy * dy);
    if (d === 0) return a;

    let r = (dx * x.lat + dy * x.lng - (dx * a.lat + dy * a.lng)) / d;
    if (r < 0) r = 0;
    if (r > 1) r = 1;

    return L.latLng(a.lat + r * dx, a.lng + r * dy);
}


const distance2 = (a: L.LatLng, b: L.LatLng): number => {

    const dx = b.lat - a.lat;
    const dy = b.lng - a.lng;
    return dx * dx + dy * dy;
}
