import { Point } from "./Point";

/**
 * 判断一个点是否在给定半径的圆内
 *
 * @param v 点的坐标
 * @param radiusSquared 半径的平方值
 * @returns 如果点在圆内返回true，否则返回false
 */
export function isWithinRadius(v: Point, radiusSquared: number) {
    // 判断点v是否在半径为radiusSquared的圆内
    return v.x * v.x + v.y * v.y <= radiusSquared;
}
