import { generate_local_optimization_grid_routes } from "../path-planning/generate_local_optimization_grid_routes";
import { get_length_of_one_route_on_grid_map } from "../path-planning/get_length_of_one_route_on_grid_map";
import { oneDimensionToTwoDimensions } from "../path-planning/oneDimensionToTwoDimensions";
import { twoDimensionsToOneDimension } from "../path-planning/twoDimensionsToOneDimension";
import { set_distance_round } from "../src/set_distance_round";
import { getBestRoute_Of_Series_routes_and_lengths } from "./getBestRoute_Of_Series_routes_and_lengths";
import { LocalOptimizationRouteOptions } from "./LocalOptimizationRouteOptions";

/**
 * 本地优化路由
 * @param {LocalOptimizationRouteOptions} options - 参数对象
 * @returns {{
 *  route: number[];
 *  length: number;
 *  time_ms: number;
 * }} - 返回对象包含路由、长度和运行时间
 */
export function local_optimization_route({
    distance_round,
    route: oldRoute,

    node_coordinates,
    length: oldLength,
    getGridDistance,
    canStraightReach,
}: LocalOptimizationRouteOptions): {
    route: number[];
    length: number;
    time_ms: number;
} {
    set_distance_round(distance_round);
    const starttime_of_one_route = Number(new Date());

    const n = node_coordinates[0].length;
    const route3 = generate_local_optimization_grid_routes(
        oldRoute.map((a) => oneDimensionToTwoDimensions(a, n)),
        canStraightReach,
    );
    const length3 = get_length_of_one_route_on_grid_map(
        route3,
        getGridDistance,
    );

    const temp_set_of_routes: {
        route: number[];
        length: number;
    }[] = [
        {
            route: route3.map((a) =>
                twoDimensionsToOneDimension(a[0], a[1], n),
            ),
            length: length3,
        },
        { route: oldRoute, length: oldLength },
    ];
    const { route, length } =
        getBestRoute_Of_Series_routes_and_lengths(temp_set_of_routes);
    const endtime_of_one_route = Number(new Date());
    const time_ms = endtime_of_one_route - starttime_of_one_route;
    return { route, length, time_ms: time_ms };
}
