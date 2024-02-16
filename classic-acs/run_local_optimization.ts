import { uniqBy } from "lodash-es";

import { local_optimization_routes } from "../functions/local_optimization_routes";
import { visibleGridsMatrixCallBack } from "../path-planning/visibleGridsMatrixCallBack";
/**
 * Runs local optimization for a given set of routes and lengths.
 * @param routes_and_lengths_of_one_iteration - An array of objects containing route, length, and time_ms for one iteration.
 * @param get_best_route - A function that returns the best route.
 * @param get_best_length - A function that returns the best length.
 * @param count_of_nodes - The number of nodes.
 * @param max_segments_of_cross_point - The maximum number of segments for cross-point.
 * @param distance_round - A boolean indicating whether to round the distance.
 * @param max_results_of_k_opt - The maximum number of results for K-opt.
 * @param node_coordinates - An array of arrays representing the coordinates of the nodes.
 * @param max_results_of_k_exchange - The maximum number of results for K-exchange.
 * @param max_results_of_2_opt - The maximum number of results for 2-opt.
 * @returns A Promise that resolves to an object containing time_ms, length, and route.
 */
export async function run_local_optimization({
    routes_and_lengths_of_one_iteration,
    get_best_route,
    get_best_length,
    count_of_nodes,
    max_segments_of_cross_point,
    distance_round,
    max_results_of_k_opt,
    node_coordinates,
    max_results_of_k_exchange,
    max_results_of_2_opt,
    canStraightReach,
    getGridDistance,
}: {
    routes_and_lengths_of_one_iteration: {
        route: number[];
        length: number;
        time_ms: number;
    }[];
    get_best_route: () => number[];
    get_best_length: () => number;
    count_of_nodes: number;
    max_segments_of_cross_point: number;
    distance_round: boolean;
    max_results_of_k_opt: number;
    node_coordinates: number[][];
    max_results_of_k_exchange: number;
    max_results_of_2_opt: number;
    canStraightReach: visibleGridsMatrixCallBack;
    getGridDistance: (a: [number, number], b: [number, number]) => number;
}): Promise<{ time_ms: number; length: number; route: number[] }> {
    const routes_and_lengths = routes_and_lengths_of_one_iteration;
    const best_half_routes = Array.from(routes_and_lengths)
        .sort((a, b) => a.length - b.length)
        .slice(0, routes_and_lengths.length / 2);
    const need_to_optimization_routes_and_lengths = uniqBy(
        [
            { route: get_best_route(), length: get_best_length() },
            ...best_half_routes,
        ],
        (a) => a.length,
    );
    const optimization_results = await local_optimization_routes({
        count_of_nodes,
        max_segments_of_cross_point,
        distance_round,
        max_results_of_k_opt,
        node_coordinates,
        max_results_of_k_exchange,
        max_results_of_2_opt,
        routes_and_lengths: need_to_optimization_routes_and_lengths,
        canStraightReach,
        getGridDistance,
    });

    const optimal_route_of_iteration = optimization_results.route;
    const optimal_length_of_iteration = optimization_results.length;
    const optimal_time_ms = optimization_results.time_ms;
    return {
        time_ms: optimal_time_ms,
        length: optimal_length_of_iteration,
        route: optimal_route_of_iteration,
    };
}
