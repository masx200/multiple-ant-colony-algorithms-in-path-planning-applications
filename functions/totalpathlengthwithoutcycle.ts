import { sum } from "lodash-es";

import { geteuclideandistancebyindex } from "./geteuclideandistancebyindex";

/**
 * 计算路径的总长度，不包括循环路径
 * @param path 路径数组
 * @param node_coordinates 节点坐标的数组
 * @param round 是否四舍五入，默认为false
 * @returns 路径的总长度
 */
export function totalpathlengthwithoutcycle(
    path: number[],
    node_coordinates: number[][],
    round = false,
): number {
    if (path.length >= node_coordinates.length) {
        throw Error("invalid path not match node_coordinates");
    }
    return sum(
        path
            .map((value, index, array) => {
                const nextindex = index === array.length - 1 ? 0 : index + 1;
                return [value, array[nextindex]];
            })
            .slice(0, -1) // 去掉最后一个元素
            .map(([left, right]) =>
                geteuclideandistancebyindex(
                    left,
                    right,
                    node_coordinates,
                    round,
                ),
            ),
    );
}
