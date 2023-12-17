/**
 * 生成一个布尔类型的四维数组，表示网格地图中每个格子与其可视的格子之间的连通关系
 *
 * @param grid - GridMap类型，表示网格地图对象
 * @returns 布尔类型的四维数组，表示网格地图中每个格子与其可视的格子之间的连通关系
 */
export function VisibleGridsMatrix(
    visibleGridsList: Array<[number, number]>[][],
): boolean[][][][] {
    const column = visibleGridsList.length;
    const row = visibleGridsList[0].length;
    // 定义一个四维数组 result，用于存储最终的结果
    const result: boolean[][][][] = [];
    // 遍历 grid.data 数组
    for (let i = 0; i < column; ++i) {
        // 定义一个三维数组 row，用于存储当前行的数据
        const row1: boolean[][][] = [];
        // 遍历 grid.data[i] 数组
        for (let j = 0; j < row; ++j) {
            // 定义一个二维数组 col，用于存储当前列的数据
            const col: boolean[][] = [];
            // 遍历 grid.data 数组
            for (let k = 0; k < column; ++k) {
                // 定义一个一维数组 col2，用于存储当前单元格的数据
                const col2: boolean[] = [];
                // 遍历 grid.data[i] 数组
                for (let l = 0; l < row; ++l) {
                    // 将 false 推入 col2 数组，初始化结果为 false
                    col2.push(false);
                }
                // 将 col2 数组推入 col 数组
                col.push(col2);
            }
            // 将 col 数组推入 row 数组
            row1.push(col);
        }
        // 将 row 数组推入 result 数组
        result.push(row1);
    }

    // 遍历 grid.data 数组
    for (let i = 0; i < column; ++i) {
        // 遍历 grid.data[i] 数组
        for (let j = 0; j < row; ++j) {
            // 如果当前位置是自由位置（isFree 方法判断）

            // 调用 findVisibleGridsBFS 方法找到可见的格子（VisibleGrids）
            const VisibleGrids = visibleGridsList[i][j];
            // 遍历 VisibleGrids 数组
            for (let index = 0; index < VisibleGrids.length; index++) {
                // 获取当前元素（VisibleGrids[index]）
                const element = VisibleGrids[index];
                // 将对应位置的值设为 true（表示可见）
                result[i][j][element[0]][element[1]] = true;
                result[element[0]][element[1]][i][j] = true;
            }
        }
    }

    // 返回最终结果 result
    return result;
}
