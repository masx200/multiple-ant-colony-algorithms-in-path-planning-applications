import { minBy } from "lodash-es";

import { Point } from "./Point";

/**
 * 选择下一个贪心的点
 * @param neighbors - 点的邻居列表
 * @param current - 当前点
 * @param gridDistanceMatrix - 网格距离矩阵
 * @param end - 终点
 * @returns 下一个贪心的点
 */
export function greedy_next_point_selector(
    neighbors: Array<Point>,
    current: Point,
    gridDistanceMatrix: number[][][][],
    end: Point,
): Point {
    // 找到距离最近的点
    const next = minBy(neighbors, (point: Point) => {
        const distance =
            gridDistanceMatrix[current.x][current.y][point.x][point.y] +
            gridDistanceMatrix[end.x][end.y][point.x][point.y];
        return distance;
    });
    // 如果没有找到距离最近的点，则返回邻居列表的第一个点
    return next ?? neighbors[0];
}
