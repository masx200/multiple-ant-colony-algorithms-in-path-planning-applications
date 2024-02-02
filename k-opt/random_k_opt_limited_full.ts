import { random } from "lodash-es";

import { assert_true } from "../test/assert_true";
import { generate_k_opt_not_cycle_routes_limited } from "./generate_k_opt_cycle_routes_limited";

/**
 * 生成随机的k-opt循环路由，限制结果数量为max_results_of_k_opt
 * @param oldRoute - 旧的路由数组
 * @param max_results_of_k_opt - k-opt循环路由的最大结果数量
 * @returns 生成的k-opt循环路由数组
 */
export function random_k_opt_limited_full({
    oldRoute,
    max_results_of_k_opt,
}: {
    oldRoute: number[];
    max_results_of_k_opt: number;
}): number[][] {
    assert_true(oldRoute.length >= 4); // 断言旧路由长度大于等于4
    const length_of_route = oldRoute.length; // 节点数量
    const routes_of_max: number[][] = []; // 存储最大结果的路由数组

    while (routes_of_max.length < max_results_of_k_opt) {
        // 当最大结果数量未达到时
        const k = Math.round(random(2, Math.floor(length_of_route / 2), false)); // 生成一个随机的k值
        const routes_of_k_opt = generate_k_opt_not_cycle_routes_limited({
            // 生成k-opt循环路由
            oldRoute,
            k,
            max_results: max_results_of_k_opt - routes_of_max.length, // 限制生成的结果数量
        });
        routes_of_k_opt.forEach((r) => {
            routes_of_max.push(r); // 将生成的路由添加到最大结果数组中
        });
    }
    return routes_of_max; // 返回生成的k-opt循环路由数组
}
