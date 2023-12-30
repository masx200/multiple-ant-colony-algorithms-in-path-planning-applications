import { describe, expect, test } from "vitest";
import { getVisibleGridsList } from "./getVisibleGridsList";
import { GridMap } from "./grid-map";
import { GridMapFromArray } from "./GridMapFromArray";
import { PointsInsideAllConvexPolygons } from "./PointsInsideAllConvexPolygons";
import { VisibleGridsMatrix } from "./VisibleGridsMatrix";
import map from "./屏幕截图-2023-11-24-162727_结果_结果test.json";

describe("PointsInsideAllConvexPolygons", () => {
    test("测试点在一个凸多边形内部", () => {
        const gridmap: GridMap = GridMapFromArray(map);
        const visibleGridsMatrix = VisibleGridsMatrix(
            getVisibleGridsList(gridmap),
        );

        const result = PointsInsideAllConvexPolygons(
            gridmap,
            visibleGridsMatrix,
        );
        // console.log(result);
        expect(new Set(result)).toEqual(
            new Set([
                [1, 4],
                [1, 5],
                [1, 6],
                [1, 7],
                [1, 8],
                [1, 9],
                [1, 10],
                [1, 11],
                [1, 12],
                [4, 20],
                [3, 20],
                [3, 19],
                [2, 19],
                [2, 18],
                [1, 18],
                [1, 17],
                [1, 19],
                [1, 20],
                [2, 20],
                [7, 15],
                [6, 4],
                [6, 5],
                [5, 5],
                [6, 6],
                [5, 6],
                [9, 10],
                [10, 11],
                [9, 11],
                [8, 11],
                [7, 11],
                [6, 11],
                [5, 11],
                [5, 12],
                [4, 12],
                [4, 11],
                [11, 18],
                [11, 17],
                [16, 19],
                [17, 20],
                [16, 20],
                [15, 20],
                [14, 20],
                [13, 20],
                [13, 6],
                [21, 5],
                [20, 5],
                [21, 6],
                [21, 7],
                [21, 8],
                [20, 8],
                [20, 7],
                [20, 6],
                [19, 6],
                [19, 7],
                [18, 6],
                [19, 8],
                [18, 8],
                [17, 6],
                [18, 7],
                [17, 8],
                [17, 7],
                [16, 8],
                [12, 8],
                [20, 13],
                [19, 13],
                [19, 14],
                [18, 14],
                [17, 14],
                [16, 14],
                [15, 14],
                [14, 14],
                [13, 14],
                [21, 15],
                [21, 20],
            ]),
        );
    });
});
