import { describe, it } from "vitest";
import { buildRandomGrid } from "./buildRandomGrid";

describe.skip("buildRandomGrid function", () => {
    it("should create a grid with all free cells", () => {
        const column = 10;
        const row = 10;
        const obstacleProbability = Math.random();
        const grid = buildRandomGrid(column, row, obstacleProbability);
        // for (let i = 0; i < column; i++) {
        //     for (let j = 0; j < row; j++) {
        //         expect(grid.isObstacle(i, j)).toBeFalsy();
        //         expect(grid.isFree(i, j)).toBeTruthy();
        //     }
        // }
        console.log(JSON.stringify({ grid, column, row, obstacleProbability }));
    });
});
