/**
 * 计算启发式信息的函数
 *
 * @param current 当前位置坐标 [[number, number]]
 * @param next 下一个位置坐标 [[number, number]]
 * @param destination 目标位置坐标 [[number, number]]
 * @param distanceMatrix 距离矩阵
 * @returns 返回启发式信息
 */
export function HeuristicInformation(
    current: [number, number],
    next: [number, number],
    destination: [number, number],
    distanceMatrix: number[][][][]
): number {
    return (
        // 计算当前节点到下一个节点的距离
        1 /
        (distanceMatrix[next[0]][next[1]][destination[0]][destination[1]] +
            distanceMatrix[current[0]][current[1]][next[0]][next[1]])
    );
}
