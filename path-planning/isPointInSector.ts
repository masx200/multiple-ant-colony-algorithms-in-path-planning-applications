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
    i1: number,
    j1: number,
    x1: number,
    y1: number,
    x2: number,
    y2: number
) {
    return containedByFanArea(
        { x: 0, y: 0 },

        { x: x1, y: y1 },
        { x: x2, y: y2 },
        { x: i1, y: j1 }
    );
}
