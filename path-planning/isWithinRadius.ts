import { Point } from "./Point";

/**
 * 判断一个点是否在给定半径的圆内
 *
 * @param v 点的坐标
 * @param radius 半径
 * @returns 如果点在圆内返回true，否则返回false
 */
export function isWithinRadius(v: Point, radius: number) {
    const radiusSquared = radius * radius;
    // 判断点v是否在半径为radiusSquared的圆内
    // 返回判断结果，如果点v的x平方加上y平方小于等于radiusSquared，则表示在圆内
    return v.x * v.x + v.y * v.y <= radiusSquared;
}
