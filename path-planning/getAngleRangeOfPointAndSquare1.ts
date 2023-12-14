import { formatSmallArcsAngleRange } from "./formatSmallArcsAngleRange";

/**
 * 获取一个点与正方形四个顶点连线形成的角度范围
 *
 * @param 当前a 中心点x坐标
 * @param 当前b 中心点y坐标
 * @param 目标格子x 点的x坐标
 * @param 目标格子y 点的y坐标
 * @returns 返回角度范围，以[最小角度, 最大角度]的形式返回
 */
export function getAngleRangeOfPointAndSquare1(
    a: number,
    b: number,
    x: number,
    y: number,
): [number, number][] {
    const four_edges = [
        [x - 0.5, y + 0.475],
        [x - 0.475, y + 0.5],
        [x + 0.475, y + 0.5],
        [x + 0.5, y + 0.475],
        [x + 0.5, y - 0.475],
        [x + 0.475, y - 0.5],
        [x - 0.475, y - 0.5],
        [x - 0.5, y - 0.475],
    ] as Array<[number, number]>;
    // 计算四个角度值
    const angles = four_edges.map(([i, j]) => Math.atan2(j - b, i - a));
    return formatSmallArcsAngleRange(angles);
    // 找到最大值和最小值
}
