//@ts-nocheck
import { assert } from "chai";
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
    alpha_Pheromone_factor: number,
    beta_Heuristic_factors: number,
    q0_Path_selection_parameters: number,
    PheromoneZeroMatrix: number[][],
    partial_Local_pheromone_volatility: number,
    rou_Global_pheromone_volatility: number,
): [number, number][] {
    assert(grid.isFree(end.x, end.y));
    assert.isFalse(start.x === end.x && start.y === end.y);
    assert(grid.isFree(start.x, start.y));
    if (canStraightReach([start.x, start.y], [end.x, end.y], grid)) {
        return [
            [start.x, start.y],
            [end.x, end.y],
        ];
    }
    throw new Error("Not Implemented");
}
