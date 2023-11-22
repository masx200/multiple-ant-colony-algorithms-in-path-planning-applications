import { assert, test } from "vitest";
import { findVisibleGrids } from "./findVisibleGrids";
import { GridMap } from "./grid-map";

test("findVisibleGrids", () => {
    const column = 9;
    const row = 15;

    const grid = new GridMap(column, row, [
        [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
    ]);
    // console.log(grid);

    const starti = 5;
    const startj = 13;
    const visibleGrids = findVisibleGrids(starti, startj, grid);

    const res = Array(column)
        .fill(0)
        .map((_q, x) =>
            Array(row)
                .fill(0)
                .map((_p, y) => grid.data[x][y])
        );
    for (const [x, y] of visibleGrids) {
        res[x][y] += 10;
    }
    res[starti][startj] += 100;
    assert.equal(visibleGrids.length, 42);
    assert.deepStrictEqual(
        [
            [0, 0, 0, 0, 10, 10, 1, 10, 10, 0, 0, 10, 10, 10, 10],
            [0, 0, 0, 0, 0, 0, 10, 10, 10, 10, 0, 10, 10, 10, 10],
            [0, 0, 0, 0, 0, 0, 0, 0, 10, 10, 10, 1, 10, 10, 10],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 10, 10, 10, 10],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 10, 10],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 100, 10],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 10, 1, 10],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 10, 10, 0, 0, 10],
            [0, 0, 0, 0, 0, 0, 0, 1, 10, 10, 10, 10, 0, 0, 0],
        ].map((a) => a.map((v) => (v == 10 ? 2 : v == 100 ? 3 : v))),
        res.map((a) => a.map((v) => (v == 10 ? 2 : v == 100 ? 3 : v)))
    );
});
