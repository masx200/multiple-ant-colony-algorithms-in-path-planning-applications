import { Point } from "./Point";

export function random_next_point_selector(neighbors: Array<Point>) {
    // 随机选择一个邻居节点
    const neighbor = neighbors[Math.floor(Math.random() * neighbors.length)];
    return neighbor;
}
