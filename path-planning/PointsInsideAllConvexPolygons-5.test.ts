import { describe, expect, test } from "vitest";

import { FindPointsInsideAllConvexPolygons } from "./FindPointsInsideAllConvexPolygons";
import { getVisibleGridsList } from "./getVisibleGridsList";
import { GridMap } from "./grid-map";
import { GridMapFromArray } from "./GridMapFromArray";
import map from "./test-simple-map-four-obstacle.json";
import { VisibleGridsMatrix } from "./VisibleGridsMatrix";

describe("PointsInsideAllConvexPolygons", () => {
    test("测试点在一个凸多边形内部", () => {
        const gridmap: GridMap = GridMapFromArray(map);
        // debugger;
        const visibleGridsList = getVisibleGridsList(gridmap);
        // debugger;
        const visibleGridsMatrix = VisibleGridsMatrix(visibleGridsList);
        // debugger;
        const result = FindPointsInsideAllConvexPolygons(
            gridmap,
            visibleGridsMatrix,
        );
        // console.log(result);
        expect(new Set(result)).toEqual(
            new Set([
                [7, 1],
                [6, 1],
                [5, 1],
                [1, 7],
                [1, 6],
                [1, 8],
                [1, 9],
                [1, 10],
                [1, 13],
                [11, 9],
                [11, 8],
                [10, 6],
                [10, 5],
                [9, 3],
                [8, 3],
                [9, 4],
                [9, 5],
                [10, 7],
                [9, 6],
                [10, 8],
                [9, 7],
                [10, 9],
                [9, 10],
                [9, 9],
                [9, 8],
                [8, 8],
                [8, 7],
                [8, 6],
                [8, 5],
                [8, 4],
                [7, 4],
                [7, 5],
                [6, 4],
                [7, 6],
                [7, 7],
                [8, 9],
                [7, 8],
                [8, 10],
                [7, 9],
                [7, 10],
                [6, 10],
                [6, 9],
                [6, 8],
                [6, 7],
                [6, 6],
                [5, 4],
                [6, 5],
                [5, 5],
                [5, 6],
                [5, 7],
                [5, 8],
                [5, 9],
                [5, 10],
                [5, 11],
                [6, 11],
                [4, 9],
                [4, 8],
                [4, 7],
                [4, 6],
                [4, 5],
                [3, 5],
                [9, 13],
                [8, 13],
                [7, 13],
                [13, 5],
                [13, 6],
                [13, 7],
                [6, 12],
                [6, 13],
                [5, 13],
                [5, 12],
                [11, 5],
                [11, 6],
                [6, 3],
                [5, 3],
                [3, 8],
                [3, 9],
                [9, 1],
                [8, 1],
                [1, 5],
                [6, 2],
                [5, 2],
                [3, 6],
                [10, 13],
                [9, 2],
                [8, 2],
                [7, 2],
                [7, 3],
                [4, 4],
                [13, 8],
                [13, 9],
                [12, 9],
                [12, 8],
                [12, 7],
                [12, 6],
                [11, 7],
                [12, 5],
                [13, 13],
            ]),
        );
    });
});
