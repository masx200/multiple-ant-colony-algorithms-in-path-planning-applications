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
    // 计算x轴坐标的差值
    const x = to.x - from.x;
    // 计算y轴坐标的差值
    const y = to.y - from.y;
    // 返回一个新的Vec对象，使用差值作为参数
    return new Vec(x, y);
}
