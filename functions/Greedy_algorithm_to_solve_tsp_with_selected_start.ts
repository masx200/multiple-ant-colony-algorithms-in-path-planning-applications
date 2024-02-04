// import { FilterVisibleGridsListWithOutPointsInsideAllConvexPolygons } from "../path-planning/FilterVisibleGridsListWithOutPointsInsideAllConvexPolygons";
// import { FindPointsInsideAllConvexPolygons } from "../path-planning/FindPointsInsideAllConvexPolygons";
import { GreedyWithStartOptions } from "./GreedyWithStartOptions";
// import { GridDistanceMatrix } from "../path-planning/Grid-distance-matrix";
import { GridMapFromArray } from "../path-planning/GridMapFromArray";
import { Point } from "../path-planning/Point";
// import { VisibleGridsMatrix } from "../path-planning/VisibleGridsMatrix";
// import { getVisibleGridsList } from "../path-planning/getVisibleGridsList";
import { get_length_of_one_route_on_grid_map } from "../path-planning/get_length_of_one_route_on_grid_map";
import { greedy_next_point_selector } from "../path-planning/greedy_next_point_selector";
import { oneDimensionToTwoDimensions } from "../path-planning/oneDimensionToTwoDimensions";
import { search_one_route_on_grid_map } from "../path-planning/search_one_route_on_grid_map";
import { twoDimensionsToOneDimension } from "../path-planning/twoDimensionsToOneDimension";
/**
 * Greedy算法，选择指定起始点求解TSP问题
 * @param node_coordinates 城市坐标
 * @param start 起始点
 * @param end 结束点
 * @returns 包含路径和路径长度的对象
 */
export function Greedy_algorithm_to_solve_tsp_with_selected_start({
    node_coordinates,
    start,
    getGridDistance,
    // gridDistanceMatrix,
    // round = false,
    // max_cities_of_greedy = Infinity,
    end,
    visibleGridsList: visibleGridsList,
    visibleGridsMatrix,
}: GreedyWithStartOptions): { route: number[]; length: number } {
    // console.log({ start, end, node_coordinates });
    if (Math.random() > 0.5) {
        // [start, end] = [end, start];
        const res = Greedy_algorithm_to_solve_tsp_with_selected_start({
            node_coordinates,
            start: end,
            visibleGridsMatrix,
            end: start,
            getGridDistance,
            // gridDistanceMatrix,
            visibleGridsList: visibleGridsList,
        });
        res.route = res.route.toReversed();
        return res;
    }

    const map = node_coordinates;
    const gridmap = GridMapFromArray(map);

    // const gridDistanceMatrix = GridDistanceMatrix(
    //     gridmap.data.length,
    //     gridmap.data[0].length,
    // );
    // const visibleGridsList = getVisibleGridsList(gridmap);
    // const visibleGridsMatrix = VisibleGridsMatrix(visibleGridsList);
    // const pointsInsideAllConvexPolygons = new Set(
    //     [...FindPointsInsideAllConvexPolygons(gridmap, visibleGridsMatrix)].map(
    //         (a) => a[0] * gridmap.row + a[1],
    //     ),
    // );
    // const visibleGridsListWithOutPointsInsideAllConvexPolygons =
    //     FilterVisibleGridsListWithOutPointsInsideAllConvexPolygons(
    //         visibleGridsList,
    //         pointsInsideAllConvexPolygons,
    //     );
    const n = gridmap.data[0].length;
    const startPoint = new Point(...oneDimensionToTwoDimensions(start, n));
    const endPoint = new Point(...oneDimensionToTwoDimensions(end, n));
    /**
     * 在网格地图上搜索一条路径
     */
    const path = search_one_route_on_grid_map(
        gridmap,
        startPoint,
        endPoint,
        // PheromoneMatrix,
        visibleGridsList,
        visibleGridsMatrix,
        //   pointsInsideAllConvexPolygons,
        // DefaultOptions.alpha_zero,
        // DefaultOptions.beta_zero,
        // q0_Path_selection_parameters,
        // PheromoneZeroMatrix,
        // DefaultOptions.local_pheromone_volatilization_coefficient,
        // DefaultOptions.global_pheromone_volatilization_coefficient,
        (a, b, endPoint) =>
            greedy_next_point_selector(a, b, getGridDistance, endPoint),
    );

    const result = path.map((a) => twoDimensionsToOneDimension(a[0], a[1], n));
    const length = get_length_of_one_route_on_grid_map(path, getGridDistance);
    // console.log({ route: result, length: length });
    return { route: result, length: length };
}
