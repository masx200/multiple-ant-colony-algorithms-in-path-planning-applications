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
    // 点o
    o: Point,
    // 点p
    p: Point,
    // 点q
    q: Point,
    // 点ij
    ij: Point,
): boolean {
    // 从o到p的向量
    let op = VecFromTo(o, p),
        // 从o到q的向量
        oq = VecFromTo(o, q),
        // 从o到ij的向量
        ox = VecFromTo(o, ij);
    // 如果从op到oq的夹角大于90度，则说明点o在扇形区域外部，递归调用containedByFanArea函数判断点o、q、p和ij是否满足要求
    if (0 > vectorAngle([op.x, op.y], [oq.x, oq.y]))
        return !containedByFanArea(o, q, p, ij);
    // 如果ox为零向量（ox.x和ox.y都为0），则说明点o与点ij共线，此时无法确定点o是否在扇形区域内，返回true
    if (ox.x === 0 && ox.y === 0)
        // 零向量的方向不确定
        return true;
    // 判断op与oq之间的夹角是否小于等于op与ox之间的夹角，如果小于等于则说明点o在扇形区域内，返回true，否则返回false
    return op.cos(oq) <= op.cos(ox);
}
