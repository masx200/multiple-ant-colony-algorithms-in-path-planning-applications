import { EuclideanDistance } from "./Euclidean-distance";
/**
 * 计算两个点之间的欧几里得距离
 * @param x1 第一个点的 x 坐标
 * @param y1 第一个点的 y 坐标
 * @param x2 第二个点的 x 坐标
 * @param y2 第二个点的 y 坐标
 * @returns 两点之间的欧几里得距离
 */
export function getGridDistance(
    // 第一个点的 x 坐标
    [
        x1,
        // 第一个点的 y 坐标
        y1,
    ]: [
        number,
        // 第一个点的 y 坐标
        number,
    ],
    // 第二个点的 x 坐标
    [
        x2,
        // 第二个点的 y 坐标
        y2,
    ]: [
        number,
        // 第一个点的 y 坐标
        number,
    ],
) {
    // 返回两点之间的欧几里得距离
    return EuclideanDistance([x1, y1], [x2, y2]);
}
