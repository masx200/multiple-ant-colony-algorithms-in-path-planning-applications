import { total_path_length_of_not_closed_route } from "../functions/closed-total-path-length";
import { creategetdistancebyIndex } from "../functions/creategetdistancebyIndex";
import { getBestRoute_Of_Series_routes_and_lengths } from "../functions/getBestRoute_Of_Series_routes_and_lengths";
import { get_distance_round } from "../src/set_distance_round";
import { assert_true as assert_true } from "../test/assert_true";
import { generate_2_opt_routes_by_random_or_cross_point } from "./generate_2_opt_routes_by_random_or_cross_point";

/**
 * 函数：partial_precise_random_2_opt_eliminates_cross_points
 * 功能：通过随机或消除交叉点生成2-opt路径，并选择最优路径
 * 参数：
 *   - max_of_segments：最大分割数
 *   - max_results_of_2_opt：2-opt路径的最大结果数
 *   - route：原始路径
 *   - length：原始路径长度
 *   - node_coordinates：节点坐标
 *   - count_of_nodes：节点数量
 * 返回值：
 *   - length：最优路径长度
 *   - route：最优路径
 */
export function partial_precise_random_2_opt_eliminates_cross_points({
    max_of_segments,
    max_results_of_2_opt,
    route,
    length,
    node_coordinates,
    count_of_nodes,
}: {
    count_of_nodes: number;
    max_of_segments: number;
    max_results_of_2_opt: number;
    route: number[];
    length: number;
    node_coordinates: number[][];
}): { length: number; route: number[] } {
    assert_true(max_results_of_2_opt >= 1);

    for (let count = 0; count <= max_results_of_2_opt; count++) {
        const routes_of_2_opt_accurate =
            generate_2_opt_routes_by_random_or_cross_point({
                count_of_nodes,
                max_of_segments,
                route,
                node_coordinates,
            });

        const routes_and_lengths = routes_of_2_opt_accurate
            .map((route) => {
                const length = total_path_length_of_not_closed_route({
                    round: get_distance_round(),
                    path: route,
                    getdistancebyIndex: creategetdistancebyIndex(
                        node_coordinates,
                        get_distance_round(),
                    ),
                });
                return { length, route };
            })
            .filter((a) => a.length !== length);
        const { route: best_route_of_2_opt, length: best_length_of_2_opt } =
            routes_and_lengths.length
                ? getBestRoute_Of_Series_routes_and_lengths(routes_and_lengths)
                : { length: length, route: route };
        if (best_length_of_2_opt < length) {
            route = best_route_of_2_opt;
            length = best_length_of_2_opt;
        }
    }
    return { length, route };
}
