import { test } from "vitest";
import { buildRandomGrid } from "./buildRandomGrid";
import { findVisibleGrids } from "./findVisibleGrids";

test("findVisibleGrids", () => {
    const column = Math.floor(4 + 25 * Math.random());
    const row = Math.floor(3 + 26 * Math.random());
    const obstacleProbability = Math.random();
    const grid = buildRandomGrid(column, row, obstacleProbability);

    const startj = Math.floor(Math.random() * row);
    const starti = Math.floor(Math.random() * column);
    const visibleGrids = findVisibleGrids(starti, startj, grid);

    console.log(
        JSON.stringify({
            column,
            row,
            starti,
            startj,
            visibleGrids,
            grid,
            obstacleProbability,
        }),
    );
});
