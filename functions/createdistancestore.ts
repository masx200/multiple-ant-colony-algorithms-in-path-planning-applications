import { MatrixSymmetry } from "@masx200/sparse-2d-matrix";

import { cachenode_coordinatestostore } from "./cachenode_coordinatestostore";
import { createsymmetrymatrixdistancestore } from "./createsymmetrymatrixdistancestore";

/**
 * 创建距离存储矩阵对称性
 * @param node_coordinates 节点坐标数组
 * @param round 是否四舍五入，默认为false
 * @returns 矩阵对称性
 */
export function createdistancestore(
    node_coordinates: number[][],
    round = false,
): MatrixSymmetry<number> {
    // 创建欧几里得距离记录矩阵
    const euclideandistancerecord = createsymmetrymatrixdistancestore(
        node_coordinates,
        round,
    );
    // 将节点坐标和欧几里得距离记录矩阵添加到缓存中
    cachenode_coordinatestostore.set(node_coordinates, euclideandistancerecord);

    return euclideandistancerecord;
}
