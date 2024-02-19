// 告诉 TypeScript 不要进行类型检查

import { assert } from "chai";

import { getAvailableNeighbors } from "./getAvailableNeighbors";
import { getPathCoordinates } from "./getPathCoordinates";
import { GridMap } from "./grid-map";
import { Point } from "./Point";
import { PointFromArray } from "./PointFromArray";
import { PointToArray } from "./PointToArray";
import { GridVisibilityChecker } from "./GridVisibilityChecker";

/**
 * 在网格地图上搜索从起点到终点的路径
 * @param grid 网格地图对象
 * @param start 起点对象
 * @param end 终点对象
 * @param visibleGridsList 可见网格列表（多维度）
 * @param visibleGridsMatrix 多边形内部点的集合
 * @param next_point_selector 选择下一个点的函数
 * @returns 包含起点和终点的路径数组
 * // 导出一个函数，该函数在网格地图上搜索一条从起点到终点的路径
 */
export function search_one_route_on_grid_map({
    grid,
    start,
    end,
    visibleGridsList,
    visibleGridsMatrix,
    next_point_selector,
}: {
    // 网格地图对象
    grid: GridMap;
    // 起点对象
    start: Point;
    // 终点对象
    end: Point;
    // 可见网格列表（多维度）
    // visibleGridsList: (a: number, b: number) => Iterable<[number, number]>;
    // visibleGridsMatrix: (a: number, b: number, c: number, d: number) => boolean;
    next_point_selector: (
        neighbors: Array<Point>,
        current: Point,
        end: Point,
    ) => Point;
} & GridVisibilityChecker): [number, number][] {
    // 断言终点在地图上是可到达的
    assert(grid.isFree(end.x, end.y), "终点不能有障碍物");
    // 断言起点和终点不相同
    assert.isFalse(
        start.x === end.x && start.y === end.y,
        "起点和终点不能相同",
    );
    // 断言起点在地图上是可到达的
    assert(grid.isFree(start.x, start.y), "起点不能有障碍物");

    // 如果可以从起点直接到达终点，则返回包含起点和终点的路径
    if (visibleGridsMatrix([start.x, start.y], [end.x, end.y])) {
        // console.log("如果可以从起点直接到达终点，则返回包含起点和终点的路径");
        return [
            [start.x, start.y],
            [end.x, end.y],
        ];
    }
    //有一半的概率随机反向搜索
    if (Math.random() > 0.5) {
        // [start, end] = [end, start];
        const route = search_one_route_on_grid_map({
            /* {
                node_coordinates,
                start: end,
                end: start,
            } */ grid,
            start: end,
            end: start,
            visibleGridsList,
            visibleGridsMatrix,
            next_point_selector,
        });
        return /* res.route = */ /* res */ route.toReversed();
        // return route;
    }

    // 首先进行随机搜索，然后添加信息素和启发式信息

    // 解决凹型死路问题的方法：使用回退策略。
    // 将当前节点的格子放入禁止表中，回退到上一步继续搜索，
    // 并将凹型死路区域经过的信息素进行清零。
    /* 不能修改起点,需要克隆对象 */
    //终于能够开始回退到上一步
    const current = structuredClone(start);
    const 经过的所有格子 = new Array<Point>();
    const path: [number, number][] = [[start.x, start.y]];
    经过的所有格子.push(structuredClone(start));
    const blocked = new Set<number>();
    blocked.add(start.x * grid.row + start.y);
    let count = 0;
    while (!(current.x == end.x && current.y == end.y)) {
        console.log(JSON.stringify({ start, end, count, path }, null, 4));
        // 如果可以从当前点直接到达终点，则返回包含当前路径和终点的路径
        if (visibleGridsMatrix([current.x, current.y], [end.x, end.y])) {
            // console.log(
            //     "如果可以从当前点直接到达终点，则返回包含当前路径和终点的路径",
            // );
            return [...path, [end.x, end.y]];
        }
        //   console.log({ start: JSON.stringify(start) });
        //   console.log({ current: JSON.stringify(current) });
        //console.log({ path: JSON.stringify(path) });
        // 获取当前节点的所有邻居节点
        const neighbors = getAvailableNeighbors(
            //  pointsInsideAllConvexPolygons,
            blocked,
            visibleGridsList,
            grid,
            [current.x, current.y],
        ); //.filter((n) => !(n[0] == start.x && n[1] == start.y));
        // console.log(neighbors);
        if (neighbors.length === 0) {
            //如果在起点所有节点都不可达,则返回空路径
            if (current.x === start.x && current.y === start.y) {
                // console.log("走到了死路");
                return []; //path;
            } // return [];
            // debugger;
            // console.log("走到了死路,开始回退到上一步");
            const last = path[path.length - 1 - 1] ?? current;
            //由于一步可能跨过多个格子，只需要退一个格子，不需要退太多格子
            //   for (const [x, y] of getPathCoordinates(
            //    [last[0], last[1]],
            // [current.x, current.y],
            //  )) {
            //       blocked.delete(x * grid.row + y);
            //    }

            //可能之前这里已经被禁止了，不能从禁止表中删除
            blocked.add(current.x * grid.row + current.y);
            blocked.add(last[0] * grid.row + last[1]);
            // 如果邻居节点在禁止表中，则进行回退

            const 经过的上一个格子 =
                经过的所有格子[经过的所有格子.length - 1 - 1];
            经过的所有格子.pop();
            path.pop();
            path.push([经过的上一个格子.x, 经过的上一个格子.y]);
            current.x = 经过的上一个格子.x;
            current.y = 经过的上一个格子.y;
            // debugger;
            //   console.log({ path: JSON.stringify(path) });

            //console.log(经过的所有格子)
            //return path
        } else {
            // 随机选择一个邻居节点
            // const neighbor =
            //     neighbors[Math.floor(Math.random() * neighbors.length)];
            const neighbor = PointToArray(
                next_point_selector(
                    neighbors.map((n) => ({ x: n[0], y: n[1] })),
                    PointFromArray([current.x, current.y]),
                    end,
                ),
            );

            //  console.log({ neighbor: JSON.stringify(neighbor) });
            current.x = neighbor[0];
            current.y = neighbor[1];
            path.push([current.x, current.y]);
            /* 如果一步跨越多个格子,则经过的格子都需要更新信息素.每走一步时,对于跨越多个格子的直线路径走过的格子都放入禁止表中.蚂蚁禁止选择已经走过的路径. */

            const last = path[path.length - 1 - 1] ?? current;
            for (
                const [x, y] of getPathCoordinates(
                    [last[0], last[1]],
                    [current.x, current.y],
                )
            ) {
                if (!(x == last[0] && y == last[1])) {
                    blocked.add(x * grid.row + y);

                    经过的所有格子.push({ x, y });
                }
            }
            //console.log(经过的所有格子)
            //  blocked.add(current.x * grid.row + current.y);
            //    console.log({ path: JSON.stringify(path) });
        }
        // return pa
        /* 为了修复错误的重复路径问题,删除最后的重复点 */
        if (
            path[path.length - 1][0] === path[path.length - 2]?.[0] &&
            path[path.length - 1][1] === path[path.length - 2]?.[1]
        ) {
            path.pop();
        }
        if (
            经过的所有格子[经过的所有格子.length - 1].x ===
            经过的所有格子[经过的所有格子.length - 2]?.x &&
            经过的所有格子[经过的所有格子.length - 1].y ===
            经过的所有格子[经过的所有格子.length - 2]?.y
        ) {
            经过的所有格子.pop();
        }
        // console.log({ path: JSON.stringify(path) });
        // console.log({ 经过的所有格子: JSON.stringify(经过的所有格子) });
        count++;
    }
    // console.log("正常搜索走到了终点");
    path.push([end.x, end.y]);
    return path;
}
