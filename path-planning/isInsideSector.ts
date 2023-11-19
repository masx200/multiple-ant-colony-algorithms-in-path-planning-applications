import { areClockWise } from "./areClockWise";
import { isWithinRadius } from "./isWithinRadius";
import { Point } from "./Point";

export function isInsideSector(
    point: Point,
    center: Point,
    sectorStart: Point,
    sectorEnd: Point,
    min_radiusSquared: number
) {
    //point即为任意一点,sectorStart即为"start arm", 同理sectorEnd.
    var relPoint: Point = {
        x: point.x - center.x,
        y: point.y - center.y,
    };

    return (
        !areClockWise(sectorStart, relPoint) &&
        areClockWise(sectorEnd, relPoint) &&
        !isWithinRadius(relPoint, min_radiusSquared)
    );
}
