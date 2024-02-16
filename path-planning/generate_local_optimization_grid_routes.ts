import { visibleGridsMatrixCallBack } from "./visibleGridsMatrixCallBack";
import { combinations } from "combinatorial-generators";
import { convert_grid_route_to_every_Passed_node } from "./convert_grid_route_to_every_Passed_node";
import { ArrayShuffle } from "../functions/ArrayShuffle";
import { isEqual } from "lodash-es";
/**
 * 生成局部优化网格路径的路由
 * @param route 路径数组
 * @param canStraightReach 判断两个点是否可以直线到达的函数
 * @returns 局部优化网格路径的路由数组
 */
export function generate_local_optimization_grid_routes(
    route: [number, number][],
    canStraightReach: visibleGridsMatrixCallBack,
): [number, number][] {
    const every_nodes = convert_grid_route_to_every_Passed_node(route);
    let result: [number, number][] = every_nodes;

    loop1: for (let i = 0; i < every_nodes.length; i++) {
        const sequences = combinations(ArrayShuffle([...result.keys()]), 2);

        for (const [a, b] of sequences) {
            const point1 = result[a];
            const point2 = result[b];
            if (
                canStraightReach(point1, point2) &&
                //必须是不相邻的点,否则和原来的路径一样
                Math.abs(point1[0] - point2[0]) +
                    Math.abs(point1[1] - point2[1]) >
                    2
            ) {
                const result_new = [
                    ...result.slice(0, a + 1),
                    ...result.slice(b),
                ];
                //替换后的路径必须不相同
                if (
                    !isEqual(result_new, route) &&
                    !isEqual(result_new, every_nodes) &&
                    !isEqual(result_new, result)
                ) {
                    // return generate_local_optimization_grid_routes(
                    //     result,
                    //     canStraightReach,
                    // );
                    result = result_new;
                    continue loop1;
                }
            }
        }
        return result;
    }
    return result;
}
