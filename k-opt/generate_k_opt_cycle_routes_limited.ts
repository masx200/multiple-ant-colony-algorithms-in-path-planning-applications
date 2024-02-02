import { reversearray } from "../functions/reversearray";
import { whether_k_sections_reverse_opt } from "../k-opt/whether_k_sections_reverse-opt";
import { assert_true } from "../test/assert_true";
import { divide_route_to_k_opt_random } from "./divide_route_to_k-opt-random";

/**
 * 生成k-opt非循环路径的限制版本
 * @param oldRoute - 旧路径数组
 * @param k - k值
 * @param max_results - 最大结果数
 * @returns 生成的路径数组
 */
export function generate_k_opt_not_cycle_routes_limited({
    oldRoute,
    k,
    max_results,
}: {
    oldRoute: number[];
    k: number;
    max_results: number;
}): number[][] {
    assert_true(oldRoute.length >= 2 * k); // 断言旧路径长度大于等于2k
    const splitted_Routes = divide_route_to_k_opt_random(
        oldRoute,
        Math.round(k),
    ); // 将旧路径划分为k-opt随机子路径

    assert_true(
        splitted_Routes.every((partial_route) => partial_route.length >= 2), // 断言每个子路径长度大于等于2
    );

    const routes: number[][] = [
        ...whether_k_sections_reverse_opt({
            max_of_results: max_results,
            k: Math.round(k),
        }), // 生成是否翻转k个子路径的结果数组
    ].map((values) => {
        return values
            .map((value, index) => {
                return value
                    ? reversearray(splitted_Routes[index]) // 如果值为真，则翻转对应子路径
                    : splitted_Routes[index];
            })
            .flat();
    });
    assert_true(routes.every((route) => route.length === oldRoute.length)); // 断言生成的路径数组长度与旧路径长度相等
    return routes;
}
