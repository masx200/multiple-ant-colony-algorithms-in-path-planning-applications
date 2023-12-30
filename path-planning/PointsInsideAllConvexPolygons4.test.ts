import { describe, expect, test } from "vitest";
import { FindPointsInsideAllConvexPolygons } from "./FindPointsInsideAllConvexPolygons";
import { getVisibleGridsList } from "./getVisibleGridsList";
import { GridMap } from "./grid-map";
import { GridMapFromArray } from "./GridMapFromArray";
import map from "./space-findVisibleGrids2-test-two-line-Obstacle-partial.json";
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
                [1, 1],
                [1, 2],
                [1, 3],
                [1, 4],
                [1, 5],
                [1, 6],
                [1, 7],
                [1, 8],
                [1, 9],
                [1, 13],
                [1, 14],
                [1, 15],
                [1, 16],
                [1, 17],
                [1, 18],
                [1, 19],
                [1, 20],
                [1, 21],
                [1, 22],
                [5, 1],
                [5, 2],
                [5, 3],
                [5, 4],
                [5, 5],
                [5, 6],
                [5, 7],
                [5, 8],
                [5, 9],
                [5, 13],
                [5, 14],
                [5, 15],
                [5, 16],
                [5, 17],
                [5, 18],
                [5, 19],
                [5, 20],
                [5, 21],
                [5, 22],
            ]),
        );
    });
});
