export interface Coordinates {
    latitude: number
    longitude: number
}

/**
 * Calculates the distance between two geographical coordinates.
 *
 * This function uses the Haversine formula to determine the distance
 * between two points on the Earth's surface specified by their
 * latitude and longitude in decimal degrees.
 *
 * @param from - The starting point coordinates.
 * @param to - The destination point coordinates.
 * @returns The distance in kilometers between the two coordinates.
 */
export function getDistanceBetweenCoordinates(from: Coordinates, to: Coordinates) {

    const fromRadian = Math.PI * from.latitude / 180
    const toRadian = Math.PI * to.latitude / 180

    const theta = from.longitude - to.longitude;
    const radTheta = (Math.PI * theta) / 180;

    let distance = Math.sin(fromRadian) * Math.sin(toRadian) + Math.cos(fromRadian) * Math.cos(toRadian) * Math.cos(radTheta);
    if (distance > 1) {
        distance = 1;
    }
    distance = Math.acos(distance);
    distance = (distance * 180) / Math.PI;
    distance = distance * 60 * 1.1515;
    distance = distance * 1.609344;
    return distance;
}