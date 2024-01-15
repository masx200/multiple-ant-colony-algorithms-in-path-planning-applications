import {
    MatrixSymmetry,
    MatrixSymmetryCreate,
} from "@masx200/sparse-2d-matrix";
import { euclidean_distance } from "./euclidean_distance";
import { oneDimensionToTwoDimensions } from "../path-planning/oneDimensionToTwoDimensions";

/**
 * 创建不对称矩阵，用于存储节点之间的距离
 * @param node_coordinates 节点坐标信息
 * @param round 是否四舍五入，默认为false
 * @returns 返回不对称矩阵
 */
export function createsymmetrymatrixdistancestore(
    node_coordinates: number[][],
    round = false,
): MatrixSymmetry<number> {
    const row = node_coordinates.length;
    const column = node_coordinates[0].length;
    return MatrixSymmetryCreate({
        row: row * column,

        initializer: (left, right) => {
            const leftpair = oneDimensionToTwoDimensions(left, column);
            const rightpair = oneDimensionToTwoDimensions(right, column);
            const distance = euclidean_distance(leftpair, rightpair, round);
            return distance;
        },
    });
}
