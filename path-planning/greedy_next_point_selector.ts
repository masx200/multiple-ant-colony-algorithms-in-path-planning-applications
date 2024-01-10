import { minBy } from "lodash-es";
import { Point } from "./Point";

export function greedy_next_point_selector(
    neighbors: Array<Point>,
    current: Point,
    gridDistanceMatrix: number[][][][],
    end: Point,
): Point {
    const next = minBy(neighbors, (point: Point) => {
        const distance =
            gridDistanceMatrix[current.x][current.y][point.x][point.y] +
            gridDistanceMatrix[end.x][end.y][point.x][point.y];
        return distance;
    });
    return next ?? neighbors[0];
}
