import { Point } from "./Point";
//import DrawGridMapAndRoute from "./drawGridMapAndRoute.vue";
import map from "./屏幕截图-2023-11-24-162727_结果_结果test.json";
import { assert, test } from "vitest";
import { uniqBy } from "lodash-es";
import { VisibleGridsMatrix } from "./VisibleGridsMatrix";
test("search-drawGridMap-test", () => {
    const start = new Point(1, 21);
    const end = new Point(22, 1);

    const gridmap = GridMapFromArray(map);
    const visibleGridsList = getVisibleGridsList(gridmap);
    const visibleGridsMatrix = VisibleGridsMatrix(visibleGridsList);
    const pointsInsideAllConvexPolygons = new Set(
        [...PointsInsideAllConvexPolygons(gridmap, visibleGridsMatrix)].map(
            (a) => a[0] * gridmap.row + a[1],
        ),
    );
    const visibleGridsListWithOutPointsInsideAllConvexPolygons =
        FilterVisibleGridsListWithOutPointsInsideAllConvexPolygons(
            visibleGridsList,
            pointsInsideAllConvexPolygons,
        );
    const PheromoneMatrix = generate_initial_pheromone_matrix(
        gridmap,
        start,
        end,
    );
    const PheromoneZeroMatrix = structuredClone(PheromoneMatrix);
    const q0_Path_selection_parameters = 0.8;
    //console.log(route.value);
    //const visibleGridsMatrix=VisibleGridsMatrix(visibleGridsList)
    const path = search_one_route_on_grid_map(
        gridmap,
        start,
        end,
        PheromoneMatrix,
        visibleGridsListWithOutPointsInsideAllConvexPolygons,
        visibleGridsMatrix,
        //  pointsInsideAllConvexPolygons,
        DefaultOptions.alpha_zero,
        DefaultOptions.beta_zero,
        q0_Path_selection_parameters,
        PheromoneZeroMatrix,
        DefaultOptions.local_pheromone_volatilization_coefficient,
        DefaultOptions.global_pheromone_volatilization_coefficient,
    );
    console.log(path);

    assert(path.length >= 3);

    assert.equal(path[0][0], start.x);

    assert.equal(path[0][1], start.y);

    assert.equal(path[path.length - 1][0], end.x);

    assert.equal(path[path.length - 1][1], end.y);
    assert.equal(path.length, uniqBy(path, JSON.stringify).length);
});

import {
    search_one_route_on_grid_map,
    FilterVisibleGridsListWithOutPointsInsideAllConvexPolygons,
} from "./search_one_route_on_grid_map";
import { getVisibleGridsList } from "./getVisibleGridsList";
import { GridMapFromArray } from "./GridMapFromArray";
//import { VisibleGridsMatrix } from "./VisibleGridsMatrix";
import { PointsInsideAllConvexPolygons } from "./PointsInsideAllConvexPolygons";
import { generate_initial_pheromone_matrix } from "./generate_initial_pheromone_matrix";
import { DefaultOptions } from "../src/default_Options";
import 不可到达的测试 from "./不可到达的测试.json";
test("search-drawGridMap-test", () => {
    const start = new Point(1, 21);
    const end = new Point(22, 1);

    const gridmap = GridMapFromArray(不可到达的测试);
    const visibleGridsList = getVisibleGridsList(gridmap);
    const visibleGridsMatrix = VisibleGridsMatrix(visibleGridsList);
    const pointsInsideAllConvexPolygons = new Set(
        [...PointsInsideAllConvexPolygons(gridmap, visibleGridsMatrix)].map(
            (a) => a[0] * gridmap.row + a[1],
        ),
    );
    const PheromoneMatrix = generate_initial_pheromone_matrix(
        gridmap,
        start,
        end,
    );
    const PheromoneZeroMatrix = structuredClone(PheromoneMatrix);
    const q0_Path_selection_parameters = 0.8;
    //console.log(route.value);
    //const visibleGridsMatrix=VisibleGridsMatrix(visibleGridsList)

    const visibleGridsListWithOutPointsInsideAllConvexPolygons =
        FilterVisibleGridsListWithOutPointsInsideAllConvexPolygons(
            visibleGridsList,
            pointsInsideAllConvexPolygons,
        );
    const path = search_one_route_on_grid_map(
        gridmap,
        start,
        end,
        PheromoneMatrix,
        visibleGridsListWithOutPointsInsideAllConvexPolygons,
        visibleGridsMatrix,
        //  pointsInsideAllConvexPolygons,
        DefaultOptions.alpha_zero,
        DefaultOptions.beta_zero,
        q0_Path_selection_parameters,
        PheromoneZeroMatrix,
        DefaultOptions.local_pheromone_volatilization_coefficient,
        DefaultOptions.global_pheromone_volatilization_coefficient,
    );
    console.log(path);

    assert(path.length == 0);
});
