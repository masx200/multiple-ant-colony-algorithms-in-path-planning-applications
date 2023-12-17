import { containedByFanArea } from "./containedByFanArea";

/**
 * 判断一个点是否在扇形区域内部
 *
 * @param i1 - 点的x坐标
 * @param j1 - 点的y坐标
 * @param x1 - 扇形区域的起点x坐标
 * @param y1 - 扇形区域的起点y坐标
 * @param x2 - 扇形区域的终点x坐标
 * @param y2 - 扇形区域的终点y坐标
 * @returns 如果点在扇形区域内则返回true，否则返回false
 */
export function isPointInSector(
    [i1, j1]: [number, number],
    [x1, y1]: [number, number],
    [x2, y2]: [number, number],
) {
    // 判断点 (i1, j1) 是否在扇形区域中，该扇形区域由 (x1, y1) 和 (x2, y2) 两个端点以及原点 (0, 0) 确定
    return containedByFanArea(
        // 原点坐标为 (0, 0)
        { x: 0, y: 0 },
        // 第一个端点坐标为 (x1, y1)
        { x: x1, y: y1 },
        // 第二个端点坐标为 (x2, y2)
        { x: x2, y: y2 },
        // 待判断的点坐标为 (i1, j1)
        { x: i1, y: j1 },
    );
}
