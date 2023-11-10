import { GridMap } from "./grid-map";

/**
 * 生成随机网格地图
 *
 * @param column 网格列数
 * @param row 网格行数
 * @param ObstacleProbability 障碍物出现概率
 * @returns 返回生成的网格地图
 */
export function buildRandomGrid(
    // 列数
    column: number,
    // 行数
    row: number,
    // 障碍物出现的概率
    ObstacleProbability: number
): GridMap {
    // 创建一个网格对象
    const grid = new GridMap(column, row);
    // 遍历每一列
    for (let i = 0; i < column; i++) {
        // 遍历每一行
        for (let j = 0; j < row; j++) {
            // 如果随机数小于障碍物出现的概率
            if (Math.random() < ObstacleProbability) {
                // 在网格上设置障碍物
                grid.setObstacle(i, j);
            } else {
                // 在网格上设置为自由格子
                grid.setFree(i, j);
            }
        }
    }
    // 返回创建的网格对象
    return grid;
}
