// import { random } from "lodash-es";

// import { generate_k_opt_not_cycle_routes_limited } from "../k-opt/generate_k_opt_cycle_routes_limited";
import { divide_route_to_2_opt_with_segment } from "./divide_route_to_2-opt-with-segment";
import { find_one_intersection_partial_with_cycle_route } from "./find_one_intersection_partial_with_cycle_route";
import { generate_2_opt_cycle_routes_with_splitted_Routes } from "./generate_2_opt_cycle_routes_with_splitted_Routes";
/**
 * 通过随机或交叉点生成2-opt路由
 * @param {Object} options - 参数对象
 * @param {number} options.max_of_segments - 最大段数
 * @param {number[]} options.route - 路由数组
 * @param {number[][]} options.node_coordinates - 节点坐标数组
 * @param {number} options.count_of_nodes - 节点数量
 * @returns {number[][]} - 生成的路由数组
 */
export function generate_2_opt_routes_by_random_or_cross_point({
    max_of_segments,
    route,
    node_coordinates,
    // count_of_nodes,
}: {
    max_of_segments: number;
    route: number[];
    node_coordinates: number[][];
    count_of_nodes: number;
}): number[][] {
    // 查找部分循环路由的交点
    const intersection = find_one_intersection_partial_with_cycle_route({
        max_of_segments,
        cycle_route: route,
        node_coordinates,
    });
    if (intersection) {
        // 将路由拆分为2-opt的两个子路由
        const splitted_Routes = divide_route_to_2_opt_with_segment(
            route,
            intersection,
        );
        // 生成准确的2-opt循环路由
        const routes_of_2_opt_accurate =
            generate_2_opt_cycle_routes_with_splitted_Routes(
                route,
                splitted_Routes,
            );
        return routes_of_2_opt_accurate;
    } else {
        return [];
        // 生成非循环的k-opt路由
        // const k = Math.round(random(2, Math.floor(count_of_nodes / 2), false));
        // return generate_k_opt_not_cycle_routes_limited({
        //     k: k,
        //     oldRoute: route,
        //     max_results: 1,
        // });
    }
}
