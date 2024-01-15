import { describe, expect, test } from "vitest";

import { FindPointsInsideAllConvexPolygons } from "./FindPointsInsideAllConvexPolygons";
import { getVisibleGridsList } from "./getVisibleGridsList";
import { GridMap } from "./grid-map";
import { GridMapFromArray } from "./GridMapFromArray";
import map from "./screen-capture-2023-11-24-162727_result-result-test.json";
import { VisibleGridsMatrix } from "./VisibleGridsMatrix";

describe("PointsInsideAllConvexPolygons", () => {
    test("测试点在一个凸多边形内部", () => {
        const gridmap: GridMap = GridMapFromArray(map);
        const visibleGridsMatrix = VisibleGridsMatrix(
            getVisibleGridsList(gridmap),
        );

        const result = FindPointsInsideAllConvexPolygons(
            gridmap,
            visibleGridsMatrix,
        );

        // console.log(JSON.stringify([...result]));
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
                [20, 14],
                [21, 14],
                [18, 13],
                [17, 13],
                [16, 13],
                [21, 4],
                [20, 4],
                [19, 5],
                [19, 20],
                [18, 20],
                [18, 19],
                [17, 4],
                [14, 7],
                [13, 7],
                [12, 6],
                [12, 7],
                [13, 8],
                [12, 10],
                [12, 9],
                [12, 20],
                [11, 19],
                [11, 20],
                [10, 20],
                [10, 19],
                [13, 13],
                [8, 17],
                [7, 17],
                [6, 16],
                [6, 17],
                [5, 17],
                [5, 16],
                [7, 8],
                [8, 9],
                [8, 10],
                [6, 12],
                [7, 12],
                [7, 13],
                [7, 14],
                [6, 13],
                [5, 13],
                [2, 11],
                [15, 19],
                [16, 15],
                [10, 17],
                [10, 18],
                [12, 19],
                [6, 15],
                [6, 14],
                [5, 14],
                [5, 15],
                [5, 18],
                [3, 11],
                [7, 16],
                [4, 17],
                [4, 6],
                [13, 9],
                [12, 4],
                [11, 4],
                [12, 5],
                [11, 5],
                [16, 7],
                [15, 7],
            ]),
        );
    });
});
