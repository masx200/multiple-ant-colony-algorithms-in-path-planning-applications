import { visibleGridsMatrixCallBack } from "./visibleGridsMatrixCallBack";
import { combinations } from "combinatorial-generators";
import { convert_grid_route_to_every_Passed_node } from "./convert_grid_route_to_every_Passed_node";
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
    const every_nodes = convert_grid_route_to_every_Passed_node(route);
    const sequences = [...combinations(every_nodes.keys(), 2)];
    const result: [number, number][][] = [];
    for (const [a, b] of sequences) {
        const point1 = every_nodes[a];
        const point2 = every_nodes[b];
        if (canStraightReach(point1, point2)) {
        }
    }
    return result;
}
