import { describe, expect, test } from "vitest";
import { FindPointsInsideAllConvexPolygons } from "./FindPointsInsideAllConvexPolygons";
import { getVisibleGridsList } from "./getVisibleGridsList";
import { GridMap } from "./grid-map";
import { VisibleGridsMatrix } from "./VisibleGridsMatrix";


describe("PointsInsideAllConvexPolygons", () => {
    test("测试点在一个凸多边形内部", () => {
        const grid = new GridMap(3, 3, [
            [1, 0, 1],

            [0, 0, 0],
            [1, 0, 1],
        ]);
        const visibleGridsMatrix = VisibleGridsMatrix(
            getVisibleGridsList(grid),
        );

        const result = FindPointsInsideAllConvexPolygons(
            grid,
            visibleGridsMatrix,
        );
        expect(new Set(result)).toEqual(new Set([[1, 1]]));
    });
    test("测试点在一个凸多边形内部", () => {
        const grid = new GridMap(3, 3, [
            [0, 0, 0],

            [0, 0, 0],
            [0, 0, 0],
        ]);
        const visibleGridsMatrix = VisibleGridsMatrix(
            getVisibleGridsList(grid),
        );

        const result = FindPointsInsideAllConvexPolygons(
            grid,
            visibleGridsMatrix,
        );
        expect(new Set(result)).toEqual(new Set([[1, 1]]));
    });
    test("测试点在一个凸多边形内部", () => {
        const grid = new GridMap(3, 5, [
            [0, 0, 0, 0, 0],

            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
        ]);
        const visibleGridsMatrix = VisibleGridsMatrix(
            getVisibleGridsList(grid),
        );

        const result = FindPointsInsideAllConvexPolygons(
            grid,
            visibleGridsMatrix,
        );
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
        const visibleGridsMatrix = VisibleGridsMatrix(
            getVisibleGridsList(grid),
        );

        const result = FindPointsInsideAllConvexPolygons(
            grid,
            visibleGridsMatrix,
        );
        expect(new Set(result)).toEqual(new Set([]));
    });

    test("测试点在一个凸多边形内部，并且与另一个凸多边形相邻", () => {
        const grid = new GridMap(5, 5, [
            [0, 0, 0, 0, 0],
            [1, 1, 0, 1, 0],
            [0, 0, 0, 0, 0],
            [0, 2, 2, 2, 0],
            [0, 0, 0, 0, 0],
        ]);
        const visibleGridsMatrix = VisibleGridsMatrix(
            getVisibleGridsList(grid),
        );

        const result = FindPointsInsideAllConvexPolygons(
            grid,
            visibleGridsMatrix,
        );
        expect(new Set(result)).toEqual(new Set([]));
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
        const visibleGridsMatrix = VisibleGridsMatrix(
            getVisibleGridsList(grid),
        );

        const result = FindPointsInsideAllConvexPolygons(
            grid,
            visibleGridsMatrix,
        );
        expect(new Set(result)).toEqual(new Set([]));
    });

    test("测试点在一个凸多边形内部，并且与多个凸多边形相邻，且有多组测试数据", () => {
        const grid = new GridMap(5, 5, [
            [0, 0, 0, 0, 0],
            [1, 1, 0, 1, 0],
            [0, 0, 0, 0, 0],
            [0, 2, 2, 2, 0],
            [0, 0, 0, 0, 0],
        ]);
        const visibleGridsMatrix1 = VisibleGridsMatrix(
            getVisibleGridsList(grid),
        );
        const result1 = FindPointsInsideAllConvexPolygons(
            grid,
            visibleGridsMatrix1,
        );
        expect(new Set(result1)).toEqual(new Set([]));
    });
    test("测试点在一个凸多边形内部，并且与多个凸多边形相邻，且有多组测试数据", () => {
        const grid = new GridMap(5, 5, [
            [0, 0, 0, 0, 0],
            [1, 1, 0, 1, 0],
            [0, 0, 0, 0, 0],
            [0, 2, 2, 2, 2],
            [0, 0, 0, 0, 0],
        ]);
        const visibleGridsMatrix2 = VisibleGridsMatrix(
            getVisibleGridsList(grid),
        );
        const result2 = FindPointsInsideAllConvexPolygons(
            grid,
            visibleGridsMatrix2,
        );
        expect(new Set(result2)).toEqual(new Set([]));
    });

    test("测试点在一个凸多边形内部", () => {
        const grid = new GridMap(4, 5, [
            [0, 0, 0, 0, 0],
            [1, 1, 0, 1, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
        ]);
        const visibleGridsMatrix = VisibleGridsMatrix(
            getVisibleGridsList(grid),
        );

        const result = FindPointsInsideAllConvexPolygons(
            grid,
            visibleGridsMatrix,
        );
        expect(new Set(result)).toEqual(new Set([[2, 2]]));
    });
    test("测试点在一个凸多边形内部", () => {
        const grid = new GridMap(4, 5, [
            [0, 1, 0, 1, 0],
            [1, 0, 1, 0, 1],
            [0, 1, 0, 1, 0],
            [1, 0, 1, 0, 1],
        ]);
        const visibleGridsMatrix = VisibleGridsMatrix(
            getVisibleGridsList(grid),
        );

        const result = FindPointsInsideAllConvexPolygons(
            grid,
            visibleGridsMatrix,
        );
        expect(new Set(result)).toEqual(new Set([]));
    });
    test("测试点在一个凸多边形内部", () => {
        const grid = new GridMap(4, 5, [
            [0, 1, 0, 0, 0],
            [1, 0, 0, 0, 0],
            [0, 1, 0, 0, 0],
            [1, 0, 1, 0, 1],
        ]);
        const visibleGridsMatrix = VisibleGridsMatrix(
            getVisibleGridsList(grid),
        );

        const result = FindPointsInsideAllConvexPolygons(
            grid,
            visibleGridsMatrix,
        );
        expect(new Set(result)).toEqual(
            new Set([
                [1, 2],
                [1, 3],
                [2, 3],
            ]),
        );
    });
});
