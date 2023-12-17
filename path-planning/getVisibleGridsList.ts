import { GridMap } from "./grid-map";
import { findVisibleGridsCircle } from "./findVisibleGridsCircle";

/**
 * 生成一个布尔类型的四维数组，表示网格地图中每个格子与其可视的格子之间的连通关系
 *
 * @param grid - GridMap类型，表示网格地图对象
 * @returns 布尔类型的四维数组，表示网格地图中每个格子与其可视的格子之间的连通关系
 */
export function getVisibleGridsList(grid: GridMap): Set<[number, number]>[][] {
    // 定义一个四维数组 result，用于存储最终的结果
    const result: Set<[number, number]>[][] = [];
    // 遍历 grid.data 数组
    for (let i = 0; i < grid.data.length; ++i) {
        // 定义一个三维数组 row，用于存储当前行的数据
        const row: Set<[number, number]>[] = [];
        // 遍历 grid.data[i] 数组
        for (let j = 0; j < grid.data[i].length; ++j) {
            // 定义一个二维数组 col，用于存储当前列的数据
            const col: Set<[number, number]> = new Set();

            // 将 col 数组推入 row 数组
            row.push(col);
        }
        // 将 row 数组推入 result 数组
        result.push(row);
    }

    // 遍历 grid.data 数组
    for (let i = 0; i < grid.data.length; ++i) {
        // 遍历 grid.data[i] 数组
        for (let j = 0; j < grid.data[i].length; ++j) {
            // 如果当前位置是自由位置（isFree 方法判断）
            if (grid.isFree(i, j)) {
                // 调用 findVisibleGridsBFS 方法找到可见的格子（VisibleGrids）
                const VisibleGrids = findVisibleGridsCircle(i, j, grid);
                // 遍历 VisibleGrids 数组
                result[i][j] = new Set(VisibleGrids);
            }
        }
    }

    // 返回最终结果 result
    return result;
}
