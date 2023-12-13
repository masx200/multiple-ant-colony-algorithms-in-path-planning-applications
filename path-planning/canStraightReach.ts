import { robustsegmentintersect } from "../cross-points/robust-segment-intersect";
import { cycle_route_to_segments } from "../functions/cycle_route_to_segments";
import { getPathCoordinates } from "./getPathCoordinates";
import { GridMap } from "./grid-map";
import { Whether_the_four_sides_of_two_beveled_squares_have_an_intersection_with_a_line_segment } from "./Whether_the_four_sides_of_two_beveled_squares_have_an_intersection_with_a_line_segment";

/**
 * 判断从起始点能否通过一条直线到达终点
 *
 * @param start 起始点坐标
 * @param end 终点坐标
 * @param grid 地图数据
 * @returns 布尔值，表示是否能够到达终点
 */
export function canStraightReach(
    start: [number, number],
    end: [number, number],
    grid: GridMap,
): boolean {
    const [startCol, startRow] = start;
    const [endCol, endRow] = end;

    // 获取地图的列和行
    const mapColumn = grid.column,
        mapRow = grid.row;

    // 判断起始点和终点是否在地图范围内
    // 判断起始点和终点是否在地图范围内
    if (
        // 起始行号小于0或大于等于地图行数或起始列号小于0或大于等于地图列数
        startRow < 0 ||
        startRow >= mapRow ||
        startCol < 0 ||
        startCol >= mapColumn
    ) {
        return false;
    }

    if (endRow < 0 || endRow >= mapRow || endCol < 0 || endCol >= mapColumn) {
        return false;
    }

    // 判断起始点是否是终点
    // 判断起始点是否是终点
    if (startRow === endRow && startCol === endCol) {
        return true;
    }
    const pcd = getPathCoordinates(start, end);
    if (grid.isObstacle(startCol, startRow)) return false;
    if (grid.isObstacle(endCol, endRow)) return false;

    // 检查路径是否在网格内
    // 检查路径是否在网格内
    for (let i = 0; i + 1 < pcd.length; i++) {
        const [x1, y1] = pcd[i];
        const [x2, y2] = pcd[i + 1];

        // 如果相邻点之间的横坐标差为1且纵坐标差为1
        if (Math.abs(x1 - x2) == 1 && Math.abs(y1 - y2) == 1) {
            // 如果横坐标为x1的纵坐标位置和横坐标为x2的纵坐标位置都是障碍物，则返回false
            if (grid.isObstacle(x1, y2) && grid.isObstacle(x2, y1))
                return false;
            //需要判断如果有一个障碍物时,格子的四条边会不会与路线产生交点,如果有交点,则无法通过.

            if (
                Whether_the_four_sides_of_two_beveled_squares_have_an_intersection_with_a_line_segment(
                    x1,
                    y1,
                    x2,
                    y2,
                    start,
                    end,
                    grid,
                )
            ) {
                return false;
            }
        }
    }

    // 如果路径上所有点的值都为0，则返回true，否则返回false
    if (
        !pcd.every(([x, y]) => {
            return grid.data[x][y] === 0;
        })
    ) {
        return false;
    }
    /* 为了减小误差,应该对于直线路径经过的所有格子的周围一圈八个格子都判断有没有与路径直线有交点,如果没有交点,则可以通过. */

    const visited = new Array(mapColumn)
        .fill(0)
        .map(() => Array(mapRow).fill(false)) as Array<Array<boolean>>;

    for (const [i, j] of pcd) {
        for (let k = -1; k <= 1; k++) {
            for (let l = -1; l <= 1; l++) {
                const [ii, jj] = [i + k, j + l];
                if (
                    ii >= 0 &&
                    ii < grid.column &&
                    jj >= 0 &&
                    jj < grid.row &&
                    grid.isFree(ii, jj) &&
                    !visited[ii][jj]
                ) {
                    visited[ii][jj] = true;
                    const [x, y] = [ii, jj];
                    const four_edges = [
                        [x - 0.5, y + 0.475],
                        [x - 0.475, y + 0.5],
                        [x + 0.475, y + 0.5],
                        [x + 0.5, y + 0.475],
                        [x + 0.5, y - 0.475],
                        [x + 0.475, y - 0.5],
                        [x - 0.475, y - 0.5],
                        [x - 0.5, y - 0.475],
                    ] as Array<[number, number]>; // 将数组标记为只读，防止后续更改这个数组的内容
                    const segments = cycle_route_to_segments(four_edges);
                    // 使用数组的some方法，遍历这个四边形的四个边，检查是否存在一条边与第二个线段相交

                    if (
                        segments.some(([point1, point2]) => {
                            // 使用自定义函数robustsegmentintersect，检查一条边是否与第二个线段相交，如果相交返回true，否则返回false
                            return robustsegmentintersect(
                                [point1[0], point1[1]], // 第一条边的起点坐标
                                [point2[0], point2[1]], // 第一条边的终点坐标
                                start, // 第二条边的起点坐标
                                end, // 第二条边的终点坐标
                            );
                        })
                    ) {
                        return false;
                    }
                }
            }
        }
    }
    return true;
}
