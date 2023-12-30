import { describe, expect, test } from "vitest";
import { getVisibleGridsList } from "./getVisibleGridsList";
import { GridMap } from "./grid-map";
import { GridMapFromArray } from "./GridMapFromArray";
import { PointsInsideAllConvexPolygons } from "./PointsInsideAllConvexPolygons";
import map from "./space-findVisibleGrids2-test.json";
import { VisibleGridsMatrix } from "./VisibleGridsMatrix";

describe("PointsInsideAllConvexPolygons", () => {
    test("测试点在一个凸多边形内部", () => {
        const gridmap: GridMap = GridMapFromArray(map);
        // debugger;
        const visibleGridsList = getVisibleGridsList(gridmap);
        // debugger;
        const visibleGridsMatrix = VisibleGridsMatrix(visibleGridsList);
        // debugger;
        const result = PointsInsideAllConvexPolygons(
            gridmap,
            visibleGridsMatrix,
        );
        // console.log(result);
        expect(new Set(result)).toEqual(
            new Set([
                [+1, +1],
                [+1, +10],
                [+1, +11],
                [+1, +12],
                [+1, +13],
                [+1, +14],
                [+1, +15],
                [+1, +16],
                [+1, +17],
                [+1, +18],
                [+1, +19],
                [+1, +2],
                [+1, +20],
                [+1, +21],
                [+1, +22],
                [+1, +3],
                [+1, +4],
                [+1, +5],
                [+1, +6],
                [+1, +7],
                [+1, +8],
                [+1, +9],
                [+2, +1],
                [+2, +10],
                [+2, +11],
                [+2, +12],
                [+2, +13],
                [+2, +14],
                [+2, +15],
                [+2, +16],
                [+2, +17],
                [+2, +18],
                [+2, +19],
                [+2, +2],
                [+2, +20],
                [+2, +21],
                [+2, +22],
                [+2, +3],
                [+2, +4],
                [+2, +5],
                [+2, +6],
                [+2, +7],
                [+2, +8],
                [+2, +9],
            ]),
        );
    });
});
