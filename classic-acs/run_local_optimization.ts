import { uniqBy } from "lodash-es";

import { local_optimization_routes } from "../functions/local_optimization_routes";
import { visibleGridsMatrixCallBack } from "../path-planning/visibleGridsMatrixCallBack";
/**
 * 对一组给定的路线和长度运行局部优化。
 * @param routes_and_lengths_of_one_iteration - 包含一次迭代的路线、长度和time_ms的对象数组。
 * @param get_best_route - 返回最佳路由的函数。
 * @param get_best_length - 返回最佳长度的函数。
 * @param count_of_nodes - 节点数。
 * @param max_segments_of_cross_point - 交叉点的最大段数。
 * @param distance_round - 指示是否对距离进行舍入的布尔值。
//  * @param max_results_of_k_opt - K-opt 的最大结果数。
 * @param node_coordinates - 表示节点坐标的数组数组。
//  * @param max_results_of_k_exchange - K-exchange 的最大结果数。
//  * @param max_results_of_2_opt - 2-opt 的最大结果数。
 * @returns 解析为包含time_ms、长度和路由的对象的 Promise。
 */
export async function run_local_optimization({
    routes_and_lengths_of_one_iteration,
    get_best_route,
    get_best_length,
    count_of_nodes,
    max_segments_of_cross_point,
    distance_round,
    // max_results_of_k_opt,
    node_coordinates,
    // max_results_of_k_exchange,
    // max_results_of_2_opt,
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
    // max_results_of_k_opt: number;
    node_coordinates: number[][];
    // max_results_of_k_exchange: number;
    // max_results_of_2_opt: number;
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
        // max_results_of_k_opt,
        node_coordinates,
        // max_results_of_k_exchange,
        // max_results_of_2_opt,
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
