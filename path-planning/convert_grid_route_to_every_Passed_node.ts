import { not_cycle_route_to_segments } from "../functions/not_cycle_route_to_segments";
import { getPathCoordinates } from "./getPathCoordinates";
/**
 * 将网格路由转换为每个经过的节点的数组
 * @param route 网格路由数组，每个元素为一个二维数组，表示一个节点的行列坐标
 * @returns 经过的节点数组，每个元素为一个二维数组，表示一个节点的行列坐标
 */
export function convert_grid_route_to_every_Passed_node(
    route: [number, number][],
): [number, number][] {
    if (route.length === 0) return route;
    const segments = not_cycle_route_to_segments(route);
    const nodes = segments
        .map((segment) => getPathCoordinates(segment[0], segment[1]))
        .flat();
    const result: [number, number][] = [];
    //删除nodes数组中连续相同的节点
    nodes.forEach((node, index) => {
        if (
            nodes[index + 1] &&
            nodes[index + 1][0] === node[0] &&
            nodes[index + 1][1] === node[1]
        ) {
            // nodes.splice(index, 1);
            return;
        } else {
            result.push(node);
        }
    });

    return result;
}
