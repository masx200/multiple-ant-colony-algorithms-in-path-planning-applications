import { assert, test } from "vitest";
import { findVisibleGrids } from "./findVisibleGrids";
import { GridMap } from "./grid-map";

test("findVisibleGrids", () => {
    const data = {
        column: 12,
        row: 10,
        starti: 1,
        startj: 2,

        grid: {
            column: 12,
            row: 10,
            data: [
                [1, 1, 0, 1, 1, 1, 0, 1, 1, 1],
                [0, 1, 1, 1, 0, 1, 1, 1, 1, 0],
                [0, 0, 1, 1, 1, 1, 1, 0, 1, 1],
                [1, 1, 1, 0, 1, 1, 1, 1, 0, 1],
                [1, 1, 1, 1, 1, 0, 1, 1, 1, 1],
                [1, 1, 1, 0, 1, 0, 1, 1, 1, 1],
                [1, 1, 0, 0, 0, 1, 1, 1, 0, 0],
                [1, 0, 1, 1, 1, 0, 0, 0, 1, 1],
                [0, 1, 1, 1, 0, 0, 1, 1, 0, 1],
                [1, 1, 0, 1, 1, 0, 1, 0, 1, 1],
                [1, 1, 1, 0, 1, 1, 1, 1, 1, 1],
                [1, 0, 1, 1, 0, 1, 1, 0, 0, 1],
            ],
        },
    };
    const column = data.column;
    const row = data.row;

    const grid = new GridMap(column, row, data.grid.data);
    // console.log(grid);

    const starti = data.starti;
    const startj = data.startj;
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
    assert.equal(visibleGrids.length, 0);
    assert.deepStrictEqual(
        [
            [1, 1, 0, 1, 1, 1, 0, 1, 1, 1],
            [0, 1, 101, 1, 0, 1, 1, 1, 1, 0],
            [0, 0, 1, 1, 1, 1, 1, 0, 1, 1],
            [1, 1, 1, 0, 1, 1, 1, 1, 0, 1],
            [1, 1, 1, 1, 1, 0, 1, 1, 1, 1],
            [1, 1, 1, 0, 1, 0, 1, 1, 1, 1],
            [1, 1, 0, 0, 0, 1, 1, 1, 0, 0],
            [1, 0, 1, 1, 1, 0, 0, 0, 1, 1],
            [0, 1, 1, 1, 0, 0, 1, 1, 0, 1],
            [1, 1, 0, 1, 1, 0, 1, 0, 1, 1],
            [1, 1, 1, 0, 1, 1, 1, 1, 1, 1],
            [1, 0, 1, 1, 0, 1, 1, 0, 0, 1],
        ],
        res.map((a) => a.map((v) => (v == 10 ? 2 : v == 100 ? 3 : v)))
    );
});
