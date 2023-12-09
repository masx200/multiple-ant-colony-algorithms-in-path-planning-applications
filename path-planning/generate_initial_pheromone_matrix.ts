import { assert } from "vitest";
import { EuclideanDistance } from "./Euclidean-distance";
import { GridMap } from "./grid-map";
import { Point } from "./Point";


export function generate_initial_pheromone_matrix(
    grid: GridMap,
    start: Point,
    end: Point,
) {
    const n = grid.row * grid.column;
    assert.isAtLeast(start.x, 0);
    assert.isAtLeast(start.y, 0);
    assert.isAtMost(start.x, grid.column - 1);
    assert.isAtMost(start.y, grid.row - 1);
    assert.isAtLeast(end.x, 0);
    assert.isAtLeast(end.y, 0);
    assert.isAtMost(end.x, grid.column - 1);
    assert.isAtMost(end.y, grid.row - 1);
    const { column, row } = grid;
    const res: number[][] = Array(column)
        .fill(0)
        .map(() => Array(row).fill(0));

    for (let i = 0; i < column; i++) {
        for (let j = 0; j < row; j++) {
            const distance =
                EuclideanDistance(start.x, start.y, i, j) +
                EuclideanDistance(i, j, end.x, end.y);
            res[i][j] = 1 / n / distance;
        }
    }
    return res;
}
