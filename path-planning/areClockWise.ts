import { Point } from "./Point";

export function areClockWise(Varm: Point, Vop: Point) {
    return -Varm.y * Vop.x + Varm.x * Vop.y > 0;
}
