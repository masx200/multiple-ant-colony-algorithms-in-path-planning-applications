import { combinations } from "combinatorial-generators";

import { geteuclideandistancebyindex } from "./geteuclideandistancebyindex";

/**
 * 获取所有节点之间的距离
 * @param node_coordinates 节点坐标的数组
 * @param round 是否对距离进行四舍五入，默认为false
 * @returns 所有节点之间的距离数组
 */
export function getalldistancesofnodes(
    node_coordinates: number[][],
    round = false,
): number[] {
    const inputarray = Array(node_coordinates.length)
        .fill(0)
        .map((_v, i) => i);
    return [...combinations(inputarray, 2)].map(([left, right]) =>
        geteuclideandistancebyindex(left, right, node_coordinates, round),
    );
}
