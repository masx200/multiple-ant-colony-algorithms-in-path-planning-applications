import { assert, test } from "vitest";
import { FilterVisibleGridsListWithOutPointsInsideAllConvexPolygons } from "./FilterVisibleGridsListWithOutPointsInsideAllConvexPolygons";
import { FindPointsInsideAllConvexPolygons } from "./FindPointsInsideAllConvexPolygons";
import { getVisibleGridsList } from "./getVisibleGridsList";
import { GridMapFromArray } from "./GridMapFromArray";
import { Point } from "./Point";
import { random_next_point_selector } from "./random_next_point_selector.ts";
//import DrawGridMapAndRoute from "./drawGridMapAndRoute.vue";
import { search_one_route_on_grid_map } from "./search_one_route_on_grid_map";
import 不可到达的测试 from "./test-2023年12月28日 220552不可到达.json";
import { VisibleGridsMatrix } from "./VisibleGridsMatrix";

test("search-drawGridMap-test", () => {
    const start = new Point(1, 21);
    const end = new Point(22, 1);

    const gridmap = GridMapFromArray(不可到达的测试);
    const visibleGridsList = getVisibleGridsList(gridmap);
    const visibleGridsMatrix = VisibleGridsMatrix(visibleGridsList);
    const pointsInsideAllConvexPolygons = new Set(
        [...FindPointsInsideAllConvexPolygons(gridmap, visibleGridsMatrix)].map(
            (a) => a[0] * gridmap.row + a[1],
        ),
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

    const visibleGridsListWithOutPointsInsideAllConvexPolygons =
        FilterVisibleGridsListWithOutPointsInsideAllConvexPolygons(
            visibleGridsList,
            pointsInsideAllConvexPolygons,
        );
    const path = search_one_route_on_grid_map(
        gridmap,
        start,
        end,
        // PheromoneMatrix,
        visibleGridsListWithOutPointsInsideAllConvexPolygons,
        visibleGridsMatrix,
        //  pointsInsideAllConvexPolygons,
        // DefaultOptions.alpha_zero,
        // DefaultOptions.beta_zero,
        // q0_Path_selection_parameters,
        // PheromoneZeroMatrix,
        // DefaultOptions.local_pheromone_volatilization_coefficient,
        // DefaultOptions.global_pheromone_volatilization_coefficient,
        random_next_point_selector,
    );
    // console.log(path);

    assert(path.length == 0);
});
