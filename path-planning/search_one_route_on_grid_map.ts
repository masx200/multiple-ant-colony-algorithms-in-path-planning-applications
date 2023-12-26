//@ts-nocheck
// 告诉 TypeScript 不要进行类型检查

import { GridMap } from "./grid-map";
import { Point } from "./Point";
import { assert } from "chai";
import { canStraightReach } from "./canStraightReach";
import { getAvailableNeighbors } from "./getAvailableNeighbors";
import { getPathCoordinates } from "./getPathCoordinates";

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
    pointsInsideAllConvexPolygons: Set<number>,
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
    // 将当前节点的格子放入禁止表中，回退到上一步继续搜索，
    // 并将凹型死路区域经过的信息素进行清零。

    const current = start;

    const path: [number, number][] = [[start.x, start.y]];

    const blocked = new Set<number>();
    blocked.add(start.x * grid.row + start.y);

    while (!(current.x == end.x && current.y == end.y)) {
        console.log(JSON.stringify(path));
        // 获取当前节点的所有邻居节点
        const neighbors = getAvailableNeighbors(
            pointsInsideAllConvexPolygons,
            blocked,
            visibleGridsList,
            grid,
            [current.x, current.y],
        );
        // console.log(neighbors);
        if (neighbors.length === 0) {
            //如果在起点所有节点都不可达,则返回空路径
            if (current.x === start.x && current.y === start.y) return path; // return [];
            const last = path[path.length - 1 - 1] ?? current;
            //由于一步可能跨过多个格子,先把这一步经过的格子都从禁止表中删除
            for (const [x, y] of getPathCoordinates(
                [last[0], last[1]],
                [current.x, current.y],
            )) {
                blocked.delete(x * grid.row + y);
            }
            blocked.add(current.x * grid.row + current.y);
            blocked.add(last[0] * grid.row + last[1]);
            // 如果邻居节点在禁止表中，则进行回退

            path.pop();
            current.x = last[0];
            current.y = last[1];
        } else {
            // 随机选择一个邻居节点
            const neighbor =
                neighbors[Math.floor(Math.random() * neighbors.length)];

            current.x = neighbor[0];
            current.y = neighbor[1];
            path.push([current.x, current.y]);
            /* 如果一步跨越多个格子,则经过的格子都需要更新信息素.每走一步时,对于跨越多个格子的直线路径走过的格子都放入禁止表中.蚂蚁禁止选择已经走过的路径. */ const last =
                path[path.length - 1 - 1] ?? current;
            for (const [x, y] of getPathCoordinates(
                [last[0], last[0]],
                [current.x, current.y],
            )) {
                blocked.add(x * grid.row + y);
            }
            blocked.add(current.x * grid.row + current.y);
        }
        // return path;
    }
    return path;
}
