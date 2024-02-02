import { Point } from "./Point";
/**
 * 随机选择一个邻居节点
 * @param neighbors - 邻居节点数组
 * @returns 选择的邻居节点
 */
export function random_next_point_selector(neighbors: Array<Point>): Point {
    // 随机选择一个邻居节点
    const neighbor = neighbors[Math.floor(Math.random() * neighbors.length)];
    return neighbor;
}
