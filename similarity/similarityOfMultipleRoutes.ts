// import { assert_true } from "../test/assert_true";
import { similarityOfTwoRoutes } from "./similarityOfTwoRoutes";

/**
 * 计算多个路由与最优路由的相似度
 * @param routes - 路由数组，每个路由为一个数字数组
 * @param bestRoute - 最优路由，数字数组
 * @returns - 多个路由与最优路由的相似度
 */
export function similarityOfMultipleRoutes(
    routes: number[][],
    bestRoute: number[],
): number {
    // 确保每个路由的长度与最优路由的长度相同
    // assert_true(routes.every((r) => r.length === bestRoute.length));
    // 计算多个路由与最优路由的相似度
    return (
        routes.reduce(
            (p, route) => p + similarityOfTwoRoutes(route, bestRoute),
            0,
        ) / routes.length
    );
}
