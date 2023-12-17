import { assert, test } from "vitest";
import { findVisibleGridsBFS } from "./findVisibleGridsBFS";
import { findVisibleGridsCircle } from "./findVisibleGridsCircle";
import { GridMap } from "./grid-map";

const findVisibleGridsBFSMapOfNameAndImpl = new Map([
    ["findVisibleGridsBFS", findVisibleGridsBFS],

    ["findVisibleGridsCircle", findVisibleGridsCircle],
]);
for (const [fnname, fnimpl] of findVisibleGridsBFSMapOfNameAndImpl) {
    test(fnname, () => {
        const data = {
            column: 3,
            row: 3,
            starti: 1,
            startj: 1,

            grid: {
                column: 3,
                row: 3,
                data: [
                    [0, 1, 0],
                    [1, 0, 1],
                    [0, 1, 0],
                ],
            },
        };
        const column = data.column;
        const row = data.row;

        const grid = new GridMap(column, row, data.grid.data);
        // console.log(grid);

        const starti = data.starti;
        const startj = data.startj;
        const visibleGrids = fnimpl([starti, startj], grid);

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
        assert.equal(visibleGrids.length, 0);
        assert.deepStrictEqual(
            [
                [0, 1, 0],
                [1, 3, 1],
                [0, 1, 0],
            ],
            res.map((a) => a.map((v) => (v == 10 ? 2 : v == 100 ? 3 : v))),
        );
    });
}
