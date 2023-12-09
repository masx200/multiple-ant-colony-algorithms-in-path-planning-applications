import { uniqBy } from "lodash-es";
import { assert } from "vitest";
import { EuclideanDistance } from "./Euclidean-distance";
import { getPathCoordinates } from "./getPathCoordinates";
import { GridMap } from "./grid-map";
import { Point } from "./Point";


export function generate_initial_pheromone_matrix(
    grid: GridMap,
    start: Point,
    end: Point,
) {
    // 计算地图的行数和列数
    const n = grid.row * grid.column;
    // 检查起始点是否在地图范围内
    assert.isAtLeast(start.x, 0);
    assert.isAtLeast(start.y, 0);
    assert.isAtMost(start.x, grid.column - 1);
    assert.isAtMost(start.y, grid.row - 1);
    //assert.isAtAtMost(start.y, grid.row - 1);
    // 检查结束点是否在地图范围内
    assert.isAtLeast(end.x, 0);
    assert.isAtLeast(end.y, 0);
    assert.isAtMost(end.x, grid.column - 1);
    assert.isAtMost(end.y, grid.row - 1);
    // assert.isAtAtMost(end.x, grid.column - 1);
    //assert.isAtAtMost(end.y, grid.row - 1);
    // 获取地图的列数和行数
    const { column, row } = grid;
    // 初始化一个二维数组，用于存储初始信息素矩阵
    const res: number[][] = Array(column)
        .fill(0)
        .map(() => Array(row).fill(0));

    // 遍历地图的每一个点
    for (let i = 0; i < column; i++) {
        for (let j = 0; j < row; j++) {
            // 如果当前点是障碍物，则跳过
            if (grid.isObstacle(i, j)) {
                continue;
            }
            // 计算当前点到起始点和结束点的距离
            const distance =
                EuclideanDistance(start.x, start.y, i, j) +
                EuclideanDistance(i, j, end.x, end.y);

            // 获取当前点到起始点和结束点的路径坐标
            const pcds = uniqBy(
                [
                    getPathCoordinates([start.x, start.y], [i, j]),
                    getPathCoordinates([end.x, end.y], [i, j]),
                ].flat(),
                (item) => JSON.stringify(item),
            );
            // 计算当前点是障碍物的次数
            const obstacleCount = pcds.filter((item) =>
                grid.isObstacle(item[0], item[1]),
            ).length;
            // 计算当前点是空地的次数
            const freecount = pcds.length - obstacleCount;
            // 计算当前点的信息素矩阵
            res[i][j] = 1 / n / distance ** (freecount / pcds.length);
        }
    }
    // 返回初始信息素矩阵
    return res;
}
