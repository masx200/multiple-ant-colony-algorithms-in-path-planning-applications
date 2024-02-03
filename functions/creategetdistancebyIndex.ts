import { geteuclideandistancebyindex } from "./geteuclideandistancebyindex";

/**
 * 创建一个函数，用于通过索引获取两个节点之间的距离
 * @param node_coordinates 节点坐标的数组
 * @param round 是否对结果进行四舍五入，默认为false
 * @returns 一个接受两个参数(left和right)的函数，返回left和right节点之间的距离
 */
export function creategetdistancebyIndex(
    node_coordinates: number[][],
    round = false,
): (left: number, right: number) => number {
    return (left: number, right: number) =>
        geteuclideandistancebyindex(left, right, node_coordinates, round);
}
