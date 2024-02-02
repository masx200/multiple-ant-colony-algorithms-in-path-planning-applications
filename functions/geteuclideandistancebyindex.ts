import { get_distance_store_of_node_coordinates } from "./getstoreofnode_coordinates";

/**
 * 根据索引获取两个节点之间的欧氏距离
 * @param left - 左节点的索引
 * @param right - 右节点的索引
 * @param node_coordinates - 节点的坐标数组
 * @param round - 是否四舍五入，默认为false
 * @returns {number} - 两个节点之间的欧氏距离
 * @throws {Error} - 当索引超出范围时抛出错误
 */
export function geteuclideandistancebyindex(
    left: number,
    right: number,
    node_coordinates: number[][],
    round = false,
): number {
    const euclideandistancerecord = get_distance_store_of_node_coordinates(
        node_coordinates,
        round,
    );
    if (euclideandistancerecord.has(left, right)) {
        return euclideandistancerecord.get(left, right);
    } else {
        throw Error("out of bounds:" + left + "," + right);
    }
}
