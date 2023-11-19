import { Point } from "./Point";
import { Vec } from "./Vec";

/**
 * 根据起始点和终点生成向量
 *
 * @param from 起始点坐标
 * @param to   终点坐标
 * @returns     向量对象
 */
export function VecFromTo(from: Point, to: Point) {
    const x = to.x - from.x;
    const y = to.y - from.y;
    return new Vec(x, y);
}
