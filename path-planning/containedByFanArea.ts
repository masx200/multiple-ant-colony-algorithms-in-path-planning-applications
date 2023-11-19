import { Point } from "./Point";
import { VecFromTo } from "./VecFromTo";
import { vectorAngle } from "./vectorAngle";

/**
 * 判断一个点是否在一个扇形区域内
 *
 * @param o 扇形中心点
 * @param p 扇形起点
 * @param q 扇形终点
 * @param ij 待判断点
 * @returns 是否在扇形区域内
 */
export function containedByFanArea(
    o: Point,
    p: Point,
    q: Point,
    ij: Point
): boolean {
    let op = VecFromTo(o, p),
        oq = VecFromTo(o, q),
        ox = VecFromTo(o, ij);
    if (0 > vectorAngle([op.x, op.y], [oq.x, oq.y]))
        return !containedByFanArea(o, q, p, ij);
    if (ox.x === 0 && ox.y === 0)
        // 零向量的方向不确定
        return true;
    return op.cos(oq) <= op.cos(ox);
}
