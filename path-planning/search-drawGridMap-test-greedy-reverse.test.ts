import { assert } from "chai";
import { test } from "vitest";

import { FilterVisibleGridsListWithOutPointsInsideAllConvexPolygons } from "./FilterVisibleGridsListWithOutPointsInsideAllConvexPolygons";
import { FindPointsInsideAllConvexPolygons } from "./FindPointsInsideAllConvexPolygons";
import { getVisibleGridsList } from "./getVisibleGridsList";
import { greedy_next_point_selector } from "./greedy_next_point_selector";
// import { GridDistanceMatrix } from "./Grid-distance-matrix";
import { GridMapFromArray } from "./GridMapFromArray";
import { Point } from "./Point";
import map from "./screen-capture-2023-11-24-162727_result-result-test.json";
import { search_one_route_on_grid_map } from "./search_one_route_on_grid_map";
import { VisibleGridsMatrix } from "./VisibleGridsMatrix";
import { isEqual } from "lodash-es";
import { getGridDistance } from "./getGridDistance";

test("search-drawGridMap-test-greedy-reverse", () => {
    const start = new Point(22, 1);
    const end = new Point(1, 21);

    const gridmap = GridMapFromArray(map);

    // const gridDistanceMatrix = GridDistanceMatrix(
    //     gridmap.data.length,
    //     gridmap.data[0].length,
    // );
    const visibleGridsList = getVisibleGridsList(gridmap);
    const visibleGridsMatrix = VisibleGridsMatrix(visibleGridsList);
    const pointsInsideAllConvexPolygons = new Set(
        [...FindPointsInsideAllConvexPolygons(gridmap, visibleGridsMatrix)].map(
            (a) => a[0] * gridmap.row + a[1],
        ),
    );

    const visibleGridsListWithOutPointsInsideAllConvexPolygons =
        FilterVisibleGridsListWithOutPointsInsideAllConvexPolygons(
            visibleGridsList,
            pointsInsideAllConvexPolygons,
        );
    const path = search_one_route_on_grid_map({
        grid: gridmap,
        start,
        end,
        visibleGridsList: visibleGridsListWithOutPointsInsideAllConvexPolygons,
        visibleGridsMatrix,
        next_point_selector: (a, b, end) =>
            greedy_next_point_selector(a, b, getGridDistance, end),
    });
    // console.log(path)
    assert.isTrue(
        isEqual(path, [
            [1, 21],
            [2, 20],
            [3, 19],
            [4, 18],
            [5, 17],
            [6, 16],
            [7, 15],
            [8, 14],
            [9, 13],
            [10, 12],
            [11, 11],
            [12, 10],
            [13, 9],
            [14, 8],
            [15, 7],
            [16, 6],
            [17, 5],
            [18, 4],
            [19, 4],
            [20, 3],
            [21, 3],
            [22, 3],
            [22, 4],
            [21, 4],
            [20, 4],
            [20, 5],
            [21, 5],
            [22, 5],
            [22, 6],
            [21, 6],
            [21, 7],
            [22, 7],
            [22, 8],
            [21, 8],
            [19, 5],
            [18, 5],
            [17, 4],
            [16, 5],
            [17, 6],
            [18, 6],
            [19, 6],
            [18, 7],
            [17, 7],
            [18, 8],
            [17, 8],
            [16, 7],
            [15, 6],
            [14, 7],
            [15, 8],
            [16, 8],
            [17, 9],
            [16, 9],
            [15, 9],
            [14, 9],
            [13, 8],
            [13, 6],
            [13, 5],
            [13, 4],
            [13, 3],
            [12, 3],
            [12, 4],
            [12, 5],
            [12, 6],
            [11, 5],
            [11, 4],
            [11, 3],
            [11, 2],
            [12, 1],
            [22, 1],
        ]) ||
            isEqual(path, [
                [1, 21],
                [10, 5],
                [11, 2],
                [12, 1],
                [14, 1],
                [15, 1],
                [16, 1],
                [17, 1],
                [20, 1],
                [21, 1],
                [22, 1],
            ]),
    );
});
