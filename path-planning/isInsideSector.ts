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
    point: Point,
    center: Point,
    sectorStart: Point,
    sectorEnd: Point,
    min_radiusSquared: number
) {
    //point即为任意一点,sectorStart即为"start arm", 同理sectorEnd.
    const relPoint: Point = {
        x: point.x - center.x,
        y: point.y - center.y,
    };

    return (
        !areClockWise(sectorStart, relPoint) &&
        areClockWise(sectorEnd, relPoint) &&
        !isWithinRadius(relPoint, min_radiusSquared)
    );
}
