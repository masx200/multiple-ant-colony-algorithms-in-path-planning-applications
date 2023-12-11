import { assert, test } from "vitest";
import { findVisibleGridsBFS } from "./findVisibleGridsBFS";
import { GridMap } from "./grid-map";

test("findVisibleGridsBFS", () => {
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
    const visibleGrids = findVisibleGridsBFS(starti, startj, grid);

    const res = Array(column)
        .fill(0)
        .map((_q, x) =>
            Array(row)
                .fill(0)
                .map((_p, y) => grid.data[x][y]),
        );
    for (const [x, y] of visibleGrids) {
        res[x][y] += 10;
    }
    res[starti][startj] += 100;
    assert.equal(visibleGrids.length, 33);
    assert.deepStrictEqual(
        res.map((a) => a.map((v) => (v == 10 ? 2 : v == 100 ? 3 : v))),
        [
            [0, 0, 0, 0, 2, 2, 1, 2, 2, 0, 0, 2, 2, 2, 2],
            [0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 0, 2, 2, 2, 2],
            [0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 1, 2, 2, 2],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 3, 2],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, +0, +0, 1, 2],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, +0, +0, +0, 0, 0, 2],
            [0, 0, 0, 0, 0, 0, 0, 1, +0, +0, +0, +0, 0, 0, 0],
        ],
    );
});
