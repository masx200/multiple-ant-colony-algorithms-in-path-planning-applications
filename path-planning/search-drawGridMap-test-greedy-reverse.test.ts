import { assert } from "chai";
import { test } from "vitest";
import { FilterVisibleGridsListWithOutPointsInsideAllConvexPolygons } from "./FilterVisibleGridsListWithOutPointsInsideAllConvexPolygons";
import { FindPointsInsideAllConvexPolygons } from "./FindPointsInsideAllConvexPolygons";
import { getVisibleGridsList } from "./getVisibleGridsList";
import { greedy_next_point_selector } from "./greedy_next_point_selector";
import { GridDistanceMatrix } from "./Grid-distance-matrix";
import { GridMapFromArray } from "./GridMapFromArray";
import { Point } from "./Point";
import map from "./screen-capture-2023-11-24-162727_result-result-test.json";
import { search_one_route_on_grid_map } from "./search_one_route_on_grid_map";
import { VisibleGridsMatrix } from "./VisibleGridsMatrix";

test("search-drawGridMap-test-greedy-reverse", () => {
    const start = new Point(22, 1);
    const end = new Point(1, 21);

    const gridmap = GridMapFromArray(map);

    const gridDistanceMatrix = GridDistanceMatrix(
        gridmap.data.length,
        gridmap.data[0].length,
    );
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
    const path = search_one_route_on_grid_map(
        gridmap,
        start,
        end,
        visibleGridsListWithOutPointsInsideAllConvexPolygons,
        visibleGridsMatrix,
        (a, b) => greedy_next_point_selector(a, b, gridDistanceMatrix, end),
    );
    // console.log(path)
    assert.deepEqual(path, [
        [22, 1],
        [21, 1],
        [20, 1],
        [17, 1],
        [16, 1],
        [15, 1],
        [14, 1],
        [12, 1],
        [11, 2],
        [10, 5],
        [1, 21],
    ]);
});
