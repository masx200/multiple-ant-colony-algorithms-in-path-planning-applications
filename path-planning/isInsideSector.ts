import { areClockWise } from "./areClockWise";
import { isWithinRadius } from "./isWithinRadius";
import { Point } from "./Point";

/**
 * 判断给定点是否在扇区内
 *
 * @param point 给定点
 * @param center 扇区中心点
 * @param sectorStart 扇区起始向量
 * @param sectorEnd 扇区终止向量
 * @param min_radiusSquared 扇区最小半径的平方
 * @returns 如果给定点在扇区内则返回true，否则返回false
 */
export function isInsideSector(
    // 任意一点
    point: Point,
    // 圆心
    center: Point,
    // "起始臂"
    sectorStart: Point,
    // "结束臂"
    sectorEnd: Point,
    // 最小半径
    min_radius: number
) {
    // 计算相对坐标
    //point即为任意一点,sectorStart即为"start arm", 同理sectorEnd.
    const relPoint: Point = {
        x: point.x - center.x,
        y: point.y - center.y,
    };
    const min_radiusSquared = Math.pow(min_radius, 2);
    return (
        // 判断点不在扇形的起始臂并且在扇形的结束臂内
        !areClockWise(sectorStart, relPoint) &&
        areClockWise(sectorEnd, relPoint) &&
        // 判断点不在指定半径内
        !isWithinRadius(relPoint, min_radiusSquared)
    );
}
