import { not_cycle_route_to_segments } from "../functions/not_cycle_route_to_segments";
import { assert_true } from "../test/assert_true";

/**
 * 从给定的路由中提取共同路径，并返回一个二维数组表示共同路径的权重矩阵。
 * @param routes - 二维数组，表示不同的路由。每个路由是一个数组，表示从一个点到另一个点的路径。
 * @returns 二维数组，表示共同路径的权重矩阵。矩阵中的每个元素表示从一个点到另一个点的共同路径权重。
 */
export function extractCommonRoute(routes: number[][]): number[][] {
    assert_true(routes.length > 0); // 断言：确保路由数组不为空
    const n = routes[0].length; // 获取路由数组中第一行的长度
    assert_true(n > 0); // 断言：确保路由数组第一行不为空
    const result: number[][] = Array(n)
        .fill(0)
        .map(() => Array(n).fill(0)); // 创建一个二维数组result，用于存储共同路径的权重矩阵

    let max = 0; // 用于记录最大权重的变量
    for (const route of routes) {
        for (const [x, y] of not_cycle_route_to_segments(route)) {
            result[x] ??= []; // 如果result[x]不存在，则初始化为空数组
            result[y] ??= []; // 如果result[y]不存在，则初始化为空数组
            result[x][y]++; // 在result[x][y]处增加权重
            result[y][x]++; // 在result[y][x]处增加权重
            max = Math.max(max, result[x][y]); // 更新最大权重
        }
    }

    result.forEach((a, i) => {
        a.forEach((v, j) => {
            return (result[i][j] = v / max); // 将每个元素的值除以最大权重，得到归一化后的共同路径权重
        });
    });

    return result; // 返回共同路径的权重矩阵
}
