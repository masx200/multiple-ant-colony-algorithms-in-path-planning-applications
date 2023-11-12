import { canReach } from "./canReach";
import { GridMap } from "./grid-map";

/**
 * 查找所有可见的网格
 *
 * @param starti 起始行索引
 * @param startj 起始列索引
 * @param grid 网格地图
 * @returns 包含所有可见网格的数组
 */
export function findVisibleGrids(
    starti: number,
    startj: number,
    grid: GridMap
): [number, number][] {
    // 定义结果数组，用于存储符合条件的网格坐标
    const result: [number, number][] = [];
    // 定义访问数组，用于标记已访问的网格
    const visited: boolean[][] = Array(grid.column)
        // 初始化访问数组
        .fill(0)
        // 生成行数为 grid.row，列数为 0 的二维数组
        .map(() => Array(grid.row).fill(false));
    // 定义栈，用于存储待访问的网格坐标
    const stack: [number, number][] = [[starti, startj]];

    // 当栈不为空时，循环执行以下操作
    while (stack.length > 0) {
        // 从栈中弹出一个网格坐标
        const [i, j] = stack.pop() as [number, number];
        if (
            // 如果网格坐标越界了
            i < 0 ||
            // 或者网格坐标超出网格行数范围
            i >= grid.row ||
            // 或者网格坐标超出网格列数范围
            j < 0 ||
            // 或者网格坐标超出网格列数范围
            j >= grid.column ||
            // 或者当前网格是障碍物
            grid.isObstacle(i, j) ||
            // 或者该网格已经被访问过了
            visited[i][j]
        ) {
            // 继续下一次循环，不进行任何操作
            continue;
        }
        // 将当前网格标记为已访问
        visited[i][j] = true;
        // 如果当前网格可以到达起点网格
        if (canReach([starti, startj], [i, j], grid)) {
            // 将当前网格添加到结果数组中
            result.push([i, j]);
        }
        // 如果上方的网格未被访问且不是障碍物，则将该网格添加到栈中
        if (i - 1 >= 0 && !visited[i - 1][j] && !grid.isObstacle(i - 1, j)) {
            stack.push([i - 1, j]);
        }
        // 如果下方的网格未被访问且不是障碍物，则将该网格添加到栈中
        if (
            i + 1 < grid.row &&
            !visited[i + 1][j] &&
            !grid.isObstacle(i + 1, j)
        ) {
            stack.push([i + 1, j]);
        }
        // 如果左方的网格未被访问且不是障碍物，则将该网格添加到栈中
        if (j - 1 >= 0 && !visited[i][j - 1] && !grid.isObstacle(i, j - 1)) {
            stack.push([i, j - 1]);
        }
        // 如果右方的网格未被访问且不是障碍物，则将该网格添加到栈中
        if (
            j + 1 < grid.column &&
            !visited[i][j + 1] &&
            !grid.isObstacle(i, j + 1)
        ) {
            stack.push([i, j + 1]);
        }
    }
    // 返回结果数组，即所有符合条件的网格坐标
    return result;
}
