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
    const segments = not_cycle_route_to_segments(route);
    const nodes = segments
        .map((segment) => getPathCoordinates(segment[0], segment[1]))
        .flat();
    return nodes;
}
