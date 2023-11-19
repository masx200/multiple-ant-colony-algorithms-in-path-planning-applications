import { Point } from "./Point";

/**
 * 判断两个点是否顺时针排列
 *
 * @param Varm - 第一个点
 * @param Vop - 第二个点
 * @returns 返回一个布尔值，表示两个点是否顺时针排列
 */
export function areClockWise(Varm: Point, Vop: Point) {
    // 判断 Varm 和 Vop 两个点构成的向量是否顺时针旋转
    return -Varm.y * Vop.x + Varm.x * Vop.y > 0;
}
