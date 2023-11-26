import { describe, expect, test } from "vitest";
import { GridMap } from "./grid-map";
import { PointsInsideAllConvexPolygons } from "./PointsInsideAllConvexPolygons";
import { VisibleGridsMatrix } from "./VisibleGridsMatrix";


describe("PointsInsideAllConvexPolygons", () => {
    test("测试点在一个凸多边形内部", () => {
        const grid = new GridMap(3, 3, [
            [1, 0, 1],

            [0, 0, 0],
            [1, 0, 1],
        ]);
        const visibleGridsMatrix = VisibleGridsMatrix(grid);

        const result = PointsInsideAllConvexPolygons(grid, visibleGridsMatrix);
        expect(new Set(result)).toEqual(new Set([[1, 1]]));
    });
    test("测试点在一个凸多边形内部", () => {
        const grid = new GridMap(3, 3, [
            [0, 0, 0],

            [0, 0, 0],
            [0, 0, 0],
        ]);
        const visibleGridsMatrix = VisibleGridsMatrix(grid);

        const result = PointsInsideAllConvexPolygons(grid, visibleGridsMatrix);
        expect(new Set(result)).toEqual(new Set([[1, 1]]));
    });
    test("测试点在一个凸多边形内部", () => {
        const grid = new GridMap(3, 5, [
            [0, 0, 0, 0, 0],

            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
        ]);
        const visibleGridsMatrix = VisibleGridsMatrix(grid);

        const result = PointsInsideAllConvexPolygons(grid, visibleGridsMatrix);
        expect(new Set(result)).toEqual(
            new Set([
                [1, 2],
                [1, 1],
                [1, 3],
            ]),
        );
    });
    test("测试点在一个凸多边形内部", () => {
        const grid = new GridMap(3, 5, [
            [1, 1, 1, 1, 1],

            [1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1],
        ]);
        const visibleGridsMatrix = VisibleGridsMatrix(grid);

        const result = PointsInsideAllConvexPolygons(grid, visibleGridsMatrix);
        expect(new Set(result)).toEqual(new Set([]));
    });

    test("测试点在一个凸多边形内部", () => {
        const grid = new GridMap(4, 5, [
            [0, 0, 0, 0, 0],
            [1, 1, 0, 1, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
        ]);
        const visibleGridsMatrix = VisibleGridsMatrix(grid);

        const result = PointsInsideAllConvexPolygons(grid, visibleGridsMatrix);
        expect(new Set(result)).toEqual(new Set([[1, 2]]));
    });

    test("测试点在一个凸多边形内部，并且与另一个凸多边形相邻", () => {
        const grid = new GridMap(5, 5, [
            [0, 0, 0, 0, 0],
            [1, 1, 0, 1, 0],
            [0, 0, 0, 0, 0],
            [0, 2, 2, 2, 0],
            [0, 0, 0, 0, 0],
        ]);
        const visibleGridsMatrix = VisibleGridsMatrix(grid);

        const result = PointsInsideAllConvexPolygons(grid, visibleGridsMatrix);
        expect(new Set(result)).toEqual(new Set([[1, 2]]));
    });

    test("测试点在一个凸多边形内部，并且与多个凸多边形相邻", () => {
        const grid = new GridMap(6, 5, [
            [0, 0, 0, 0, 0],
            [1, 1, 0, 1, 0],
            [0, 0, 0, 0, 0],
            [0, 2, 2, 2, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
        ]);
        const visibleGridsMatrix = VisibleGridsMatrix(grid);

        const result = PointsInsideAllConvexPolygons(grid, visibleGridsMatrix);
        expect(new Set(result)).toEqual(new Set([[1, 2]]));
    });

    test("测试点在一个凸多边形内部，并且与多个凸多边形相邻，且有多组测试数据", () => {
        const grid1 = new GridMap(5, 5, [
            [0, 0, 0, 0, 0],
            [1, 1, 0, 1, 0],
            [0, 0, 0, 0, 0],
            [0, 2, 2, 2, 0],
            [0, 0, 0, 0, 0],
        ]);
        const visibleGridsMatrix1 = VisibleGridsMatrix(grid1);
        const result1 = PointsInsideAllConvexPolygons(
            grid1,
            visibleGridsMatrix1,
        );
        expect(new Set(result1)).toEqual(new Set([[1, 2]]));
    });
    test("测试点在一个凸多边形内部，并且与多个凸多边形相邻，且有多组测试数据", () => {
        const grid2 = new GridMap(5, 5, [
            [0, 0, 0, 0, 0],
            [1, 1, 0, 1, 0],
            [0, 0, 0, 0, 0],
            [0, 2, 2, 2, 2],
            [0, 0, 0, 0, 0],
        ]);
        const visibleGridsMatrix2 = VisibleGridsMatrix(grid2);
        const result2 = PointsInsideAllConvexPolygons(
            grid2,
            visibleGridsMatrix2,
        );
        expect(new Set(result2)).toEqual(
            new Set([
                [2, 3],
                [2, 2],
            ]),
        );
    });
});
