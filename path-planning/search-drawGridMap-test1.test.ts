import { uniqBy } from "lodash-es";
import { assert, test } from "vitest";

import { FilterVisibleGridsListWithOutPointsInsideAllConvexPolygons } from "./FilterVisibleGridsListWithOutPointsInsideAllConvexPolygons";
import { FindPointsInsideAllConvexPolygons } from "./FindPointsInsideAllConvexPolygons";
import { getVisibleGridsList } from "./getVisibleGridsList";
import { GridMapFromArray } from "./GridMapFromArray";
import { Point } from "./Point";
import { random_next_point_selector } from "./random_next_point_selector.ts";
import { search_one_route_on_grid_map } from "./search_one_route_on_grid_map";
import map from "./test-2023年12月28日 220552.json";
import { twoDimensionsToOneDimension } from "./twoDimensionsToOneDimension";
import { VisibleGridsMatrix } from "./VisibleGridsMatrix";

//import { VisibleGridsMatrix } from "./VisibleGridsMatrix";

//import DrawGridMapAndRoute from "./drawGridMapAndRoute.vue";

test("search-drawGridMap-test", () => {
    const start = new Point(1, 21);
    const end = new Point(22, 1);

    const gridmap = GridMapFromArray(map);

    const n = gridmap.data[0].length;
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
    // const PheromoneMatrix = generate_initial_pheromone_matrix(
    //     gridmap,
    //     start,
    //     end,
    // );
    // const PheromoneZeroMatrix = structuredClone(PheromoneMatrix);
    // const q0_Path_selection_parameters = 0.8;
    //console.log(route.value);
    //const visibleGridsMatrix=VisibleGridsMatrix(visibleGridsList)
    const path = search_one_route_on_grid_map({
        grid: gridmap,
        start,
        end,
        // PheromoneMatrix,
        visibleGridsList: function ([a, b]: [number, number]) {
            return visibleGridsListWithOutPointsInsideAllConvexPolygons[a][b];
        },
        visibleGridsMatrix: function (
            [a, b]: [number, number],
            [c, d]: [number, number],
        ) {
            return visibleGridsMatrix[a][b][c][d];
        },
        //  pointsInsideAllConvexPolygons,
        // DefaultOptions.alpha_zero,
        // DefaultOptions.beta_zero,
        // q0_Path_selection_parameters,
        // PheromoneZeroMatrix,
        // DefaultOptions.local_pheromone_volatilization_coefficient,
        // DefaultOptions.global_pheromone_volatilization_coefficient,
        next_point_selector: random_next_point_selector,
    });
    // console.log(path);

    assert(path.length >= 3);

    assert.equal(path[0][0], start.x);

    assert.equal(path[0][1], start.y);

    assert.equal(path[path.length - 1][0], end.x);

    assert.equal(path[path.length - 1][1], end.y);
    assert.equal(
        path.length,
        uniqBy(path, ([i, j]) => {
            return twoDimensionsToOneDimension(i, j, n);
        }).length,
    );
});
