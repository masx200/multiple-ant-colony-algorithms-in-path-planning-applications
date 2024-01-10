import { FilterVisibleGridsListWithOutPointsInsideAllConvexPolygons } from "../path-planning/FilterVisibleGridsListWithOutPointsInsideAllConvexPolygons";
import { FindPointsInsideAllConvexPolygons } from "../path-planning/FindPointsInsideAllConvexPolygons";
import { get_length_of_one_route_on_grid_map } from "../path-planning/get_length_of_one_route_on_grid_map";
import { getVisibleGridsList } from "../path-planning/getVisibleGridsList";
import { greedy_next_point_selector } from "../path-planning/greedy_next_point_selector";
import { GridDistanceMatrix } from "../path-planning/Grid-distance-matrix";
import { GridMapFromArray } from "../path-planning/GridMapFromArray";
import { oneDimensionToTwoDimensions } from "../path-planning/oneDimensionToTwoDimensions";
import { Point } from "../path-planning/Point";
import { search_one_route_on_grid_map } from "../path-planning/search_one_route_on_grid_map";
import { twoDimensionsToOneDimension } from "../path-planning/twoDimensionsToOneDimension";
import { VisibleGridsMatrix } from "../path-planning/VisibleGridsMatrix";
import { GreedyWithStartOptions } from "./GreedyWithStartOptions";

export function Greedy_algorithm_to_solve_tsp_with_selected_start({
    node_coordinates,
    start,
    // round = false,
    // max_cities_of_greedy = Infinity,
    end,
}: GreedyWithStartOptions): { route: number[]; length: number } {
    const map = node_coordinates;
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
    const n = gridmap.data[0].length;
    const startPoint = new Point(...oneDimensionToTwoDimensions(start, n));
    const endPoint = new Point(...oneDimensionToTwoDimensions(end, n));
    const path = search_one_route_on_grid_map(
        gridmap,
        startPoint,
        endPoint,
        // PheromoneMatrix,
        visibleGridsListWithOutPointsInsideAllConvexPolygons,
        visibleGridsMatrix,
        //   pointsInsideAllConvexPolygons,
        // DefaultOptions.alpha_zero,
        // DefaultOptions.beta_zero,
        // q0_Path_selection_parameters,
        // PheromoneZeroMatrix,
        // DefaultOptions.local_pheromone_volatilization_coefficient,
        // DefaultOptions.global_pheromone_volatilization_coefficient,
        (a, b) =>
            greedy_next_point_selector(a, b, gridDistanceMatrix, endPoint),
    );

    const result = path.map((a) => twoDimensionsToOneDimension(a[0], a[1], n));
    const length = get_length_of_one_route_on_grid_map(
        path,
        gridDistanceMatrix,
    );
    return { route: result, length: length };
}
