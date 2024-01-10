import { Point } from "./Point";

export function PointFromArray(array: number[]): Point {
    return new Point(array[0], array[1]);
}
