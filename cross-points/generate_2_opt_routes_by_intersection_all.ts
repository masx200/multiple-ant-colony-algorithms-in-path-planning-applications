// import { random } from "lodash-es";

// import { generate_k_opt_not_cycle_routes_limited } from "../k-opt/generate_k_opt_cycle_routes_limited";
import { cacheble_intersection_filter_with_cycle_route_find_one } from "./cacheble_intersection_filter_with_cycle_route_find_one";
import { divide_route_to_2_opt_with_segment } from "./divide_route_to_2-opt-with-segment";
import { generate_2_opt_cycle_routes_with_splitted_Routes } from "./generate_2_opt_cycle_routes_with_splitted_Routes";

/**
 * 通过交叉点生成所有可能的2-opt路径
 * @param {number[]} route - 路径数组
 * @param {number[][]} node_coordinates - 节点坐标数组
 * @param {number} count_of_nodes - 节点数量
 * @returns {number[][]} - 生成的2-opt路径数组
 */
export function generate_2_opt_routes_by_intersection_all({
    route,
    node_coordinates,
    // count_of_nodes,
}: {
    route: number[];
    node_coordinates: number[][];
    // count_of_nodes: number;
}): number[][] {
    // 查找路径中是否存在交叉点
    const intersection = cacheble_intersection_filter_with_cycle_route_find_one(
        {
            cycle_route: route,
            node_coordinates,
        },
    );
    if (intersection) {
        // 将路径拆分为多个子路径
        const splitted_Routes = divide_route_to_2_opt_with_segment(
            route,
            intersection,
        );
        // 生成准确的2-opt循环路径
        const routes_of_2_opt_accurate =
            generate_2_opt_cycle_routes_with_splitted_Routes(
                route,
                splitted_Routes,
            );
        return routes_of_2_opt_accurate;
    } else {
        return [];
        // 生成非循环路径
        // const k = Math.round(random(2, Math.floor(count_of_nodes / 2), false));
        // return generate_k_opt_not_cycle_routes_limited({
        //     k: k,
        //     oldRoute: route,
        //     max_results: 1,
        // });
    }
}
