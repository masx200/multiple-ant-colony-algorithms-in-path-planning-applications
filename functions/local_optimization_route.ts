// import { partial_precise_random_2_opt_eliminates_cross_points } from "../cross-points/partial_precise_random_2_opt_eliminates_cross_points";
// import { Precise_2_opt_eliminates_all_intersections } from "../cross-points/Precise_2_opt_eliminates_all_intersections";
// import { random_k_exchange_limited } from "../cross-points/random_k_exchange_limited";
// import { Random_K_OPT_full_limited_find_best } from "../k-opt/Random_K_OPT_full_limited_find_best";
import { set_distance_round } from "../src/set_distance_round";
import { getBestRoute_Of_Series_routes_and_lengths } from "./getBestRoute_Of_Series_routes_and_lengths";
import { LocalOptimizationRouteOptions } from "./LocalOptimizationRouteOptions.1";
// import { pickRandomOne } from "./pickRandomOne";

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
    // count_of_nodes,
    // max_segments_of_cross_point,
    distance_round,
    route: oldRoute,
    // max_results_of_k_opt,
    node_coordinates,
    length: oldLength,
    // max_results_of_k_exchange,
    // max_results_of_2_opt,
}: LocalOptimizationRouteOptions): {
    route: number[];
    length: number;
    time_ms: number;
} {
    set_distance_round(distance_round);
    const starttime_of_one_route = Number(new Date());
    // const is_count_not_large = count_of_nodes <= max_segments_of_cross_point;

    // const { route: route1, length: length1 } =
    //     Random_K_OPT_full_limited_find_best({
    //         count_of_nodes,
    //         route: oldRoute,
    //         max_results_of_k_opt,
    //         node_coordinates,
    //         length: oldLength,
    //     });
    // const route_and_length_selection1 = pickRandomOne([
    //     { route: route1, length: length1 },
    //     { route: oldRoute, length: oldLength },
    // ]);
    // const { route: route2, length: length2 } = random_k_exchange_limited({
    //     ...route_and_length_selection1,
    //     node_coordinates,
    //     max_results_of_k_exchange,
    // });
    const route_and_length_selection2 =
        /* pickRandomOne([
        { route: route2, length: length2 }, */
        { route: oldRoute, length: oldLength }; //,
    //]);
    const { route: route3, length: length3 } = route_and_length_selection2;
    // is_count_not_large
    //     ? Precise_2_opt_eliminates_all_intersections({
    //           ...route_and_length_selection2,
    //           //   count_of_nodes,
    //           max_results_of_2_opt,
    //           node_coordinates,
    //       })
    //     : partial_precise_random_2_opt_eliminates_cross_points({
    //           ...route_and_length_selection2,
    //           count_of_nodes,
    //           max_of_segments: max_segments_of_cross_point,
    //           max_results_of_2_opt,
    //           node_coordinates,
    //       });

    const temp_set_of_routes = [
        // { route: route1, length: length1 },
        // { route: route2, length: length2 },
        { route: route3, length: length3 },
        { route: oldRoute, length: oldLength },
    ];
    const { route, length } =
        getBestRoute_Of_Series_routes_and_lengths(temp_set_of_routes);
    const endtime_of_one_route = Number(new Date());
    const time_ms = endtime_of_one_route - starttime_of_one_route;
    return { route, length, time_ms: time_ms };
}
