import { test } from "vitest";

import { buildRandomGrid } from "./buildRandomGrid";
import { findVisibleGridsBFS } from "./findVisibleGridsBFS";
import { findVisibleGridsCircle } from "./findVisibleGridsCircle";

const findVisibleGridsBFSMapOfNameAndImpl = new Map([
    ["findVisibleGridsBFS", findVisibleGridsBFS],

    ["findVisibleGridsCircle", findVisibleGridsCircle],
]);
for (const [fnname, fnimpl] of findVisibleGridsBFSMapOfNameAndImpl) {
    test.skip(fnname, () => {
        const column = Math.floor(4 + 25 * Math.random());
        const row = Math.floor(3 + 26 * Math.random());
        const obstacleProbability = Math.random();
        const grid = buildRandomGrid(column, row, obstacleProbability);

        const startj = Math.floor(Math.random() * row);
        const starti = Math.floor(Math.random() * column);
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
        console.log(
            JSON.stringify({
                column,
                row,
                starti,
                startj,
                visibleGrids,
                grid,
                obstacleProbability,
                result: res.map((a) =>
                    a.map((v) => (v == 10 ? 2 : v == 100 ? 3 : v)),
                ),
            }),
        );
    });
}
