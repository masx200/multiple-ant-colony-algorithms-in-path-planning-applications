/**
 * 计算两个点之间的欧几里得距离
 * @param leftpair 左边的点坐标，格式为 [x, y]
 * @param rightpair 右边的点坐标，格式为 [x, y]
 * @param round 是否四舍五入，默认为 false
 * @returns 欧几里得距离
 */
export function euclidean_distance(
    leftpair: [number, number],
    rightpair: [number, number],
    round = false,
): number {
    const round_func: (x: number) => number = round ? Math.round : (a) => a;
    return round_func(
        Number(Math.hypot(...leftpair.map((a, i) => a - rightpair[i]))),
    );
}
