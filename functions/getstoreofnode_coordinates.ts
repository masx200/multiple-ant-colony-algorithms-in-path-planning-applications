import { MatrixSymmetry } from "@masx200/sparse-2d-matrix";

import { cachenode_coordinatestostore } from "./cachenode_coordinatestostore";
import { createdistancestore } from "./createdistancestore";

/**
 * 获取节点坐标的存储距离矩阵对称性
 * @param node_coordinates 节点坐标的二维数组
 * @param round 是否四舍五入，默认为false
 * @returns 节点坐标的存储矩阵对称性
 */
export function get_distance_store_of_node_coordinates(
    node_coordinates: number[][],
    round = false,
): MatrixSymmetry<number> {
    return (
        cachenode_coordinatestostore.get(node_coordinates) ??
        createdistancestore(node_coordinates, round)
    );
}
