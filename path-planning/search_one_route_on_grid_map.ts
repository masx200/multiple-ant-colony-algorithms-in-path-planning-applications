// @ts-nocheck // 告诉 TypeScript 不要进行类型检查

import { assert } from "chai";
import { canStraightReach } from "./canStraightReach";
import { GridMap } from "./grid-map";
import { Point } from "./Point";


// 导出一个函数，该函数在网格地图上搜索一条从起点到终点的路径
export function search_one_route_on_grid_map(
    // 网格地图对象
    grid: GridMap,
    // 起点对象
    start: Point,
    // 终点对象
    end: Point,
    // 信息素矩阵
    PheromoneMatrix: number[][],
    // 可见网格列表（多维度）
    visibleGridsList: Iterable<[number, number]>[][],
    // 多边形内部点的集合
    pointsInsideAllConvexPolygons: Iterable<[number, number]>,
    // 信息素因子 alpha
    alpha_Pheromone_factor: number,
    // 启发式因子 beta
    beta_Heuristic_factors: number,
    // 路径选择参数 q0
    q0_Path_selection_parameters: number,
    // 信息素零矩阵
    PheromoneZeroMatrix: number[][],
    // 局部信息素挥发系数
    partial_Local_pheromone_volatility: number,
    // 全局信息素挥发系数
    rou_Global_pheromone_volatility: number,
): [number, number][] {
    // 断言终点在地图上是可到达的
    assert(grid.isFree(end.x, end.y));
    // 断言起点和终点不相同
    assert.isFalse(start.x === end.x && start.y === end.y);
    // 断言起点在地图上是可到达的
    assert(grid.isFree(start.x, start.y));

    // 如果可以从起点直接到达终点，则返回包含起点和终点的路径
    if (canStraightReach([start.x, start.y], [end.x, end.y], grid)) {
        return [
            [start.x, start.y],
            [end.x, end.y],
        ];
    }

    // 首先进行随机搜索，然后添加信息素和启发式信息

    // 解决凹型死路问题的方法：使用回退策略。
    // 将当前节点和上一个节点的格子放入禁止表中，回退到上一步继续搜索，
    // 并将凹型死路区域经过的信息素进行清零。
    throw new Error("Not Implemented");
}
