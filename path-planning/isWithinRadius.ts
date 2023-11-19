import { Point } from "./Point";

export function isWithinRadius(v: Point, radiusSquared: number) {
    return v.x * v.x + v.y * v.y <= radiusSquared;
}
