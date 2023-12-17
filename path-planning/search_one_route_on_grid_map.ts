import { assert } from "vitest";
import { canStraightReach } from "./canStraightReach";
import { GridMap } from "./grid-map";
import { Point } from "./Point";

export function search_one_route_on_grid_map(
    grid: GridMap,
    start: Point,
    end: Point,
    PheromoneMatrix: number[][],
    visibleGridsList: Iterable<[number, number]>[][],
    pointsInsideAllConvexPolygons: Iterable<[number, number]>,
): [number, number][] {
    assert.isTrue(grid.isFree(end.x, end.y));

    assert.isTrue(grid.isFree(start.x, start.y));
    if (canStraightReach([start.x, start.y], [end.x, end.y], grid)) {
        return [
            [start.x, start.y],
            [end.x, end.y],
        ];
    }
    throw new Error("Not Implemented");
}
