import { visibleGridsMatrixCallBack } from "./visibleGridsMatrixCallBack";

/**
 * 生成局部优化网格路径的路由
 * @param route 路径数组
 * @param canStraightReach 判断两个点是否可以直线到达的函数
 * @returns 局部优化网格路径的路由数组
 */
export function generate_local_optimization_grid_routes(
    route: [number, number][],
    canStraightReach: visibleGridsMatrixCallBack,
): [number, number][][] {
    return [route];
}
