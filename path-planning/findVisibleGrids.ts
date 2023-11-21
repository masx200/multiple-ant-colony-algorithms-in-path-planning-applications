import { canReach } from "./canReach";
import { EuclideanDistance } from "./Euclidean-distance";
import { getAngleRangeOfPointAndSquare1 } from "./getAngleRangeOfPointAndSquare1";
import { GridMap } from "./grid-map";
import { isInsideSectorWithRadius } from "./isInsideSectorWithRadius";
import { Point } from "./Point";

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
    if (grid.isObstacle(starti, startj)) return [];
    // 定义障碍数组，用于标记障碍的网格
    const obstacled: [number, number][] = [] as [number, number][]; // 定义禁止数组，用于标记禁止的网格
    const blocked: boolean[][] = Array(grid.column)
        // 初始化访问数组
        .fill(0)
        // 生成行数为 grid.row，列数为 0 的二维数组
        .map(() => Array(grid.row).fill(false));
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
    loop0: while (stack.length > 0) {
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
            visited[i][j] ||
            blocked[i][j]
        ) {
            // 继续下一次循环，不进行任何操作
            continue;
        }

        for (const [x, y] of obstacled) {
            const [minAngle, maxAngle] = getAngleRangeOfPointAndSquare1(
                x,
                y,
                starti,
                startj
            );
            const LocalStart = new Point(
                Math.cos(minAngle),
                Math.sin(minAngle)
            );
            const LocalEnd = new Point(Math.cos(maxAngle), Math.sin(maxAngle));
            if (
                isInsideSectorWithRadius(
                    new Point(x, y),
                    { x: starti, y: startj },
                    LocalStart,
                    LocalEnd,
                    Math.max(
                        EuclideanDistance(starti, startj, x - 0.5, y),
                        EuclideanDistance(starti, startj, x + 0.5, y),
                        EuclideanDistance(starti, startj, x, y - 0.5),
                        EuclideanDistance(starti, startj, x, y + 0.5)
                    )
                )
            ) {
                blocked[x][y] = true;
                continue loop0;
            }
        }
        // 将当前网格标记为已访问
        visited[i][j] = true;
        /* 
这段 TypeScript 代码似乎是在实现一种简单的路径查找算法，例如宽度优先搜索（BFS）或深度优先搜索（DFS）。代码的主要目的是遍历一个二维网格，可能代表一个地图或迷宫，并标记或跳过不同的网格点。

这段代码中的主要部分是一个 for...of 循环，它遍历一个包含四个元素的数组，每个元素都是一个包含两个元素的数组，分别代表 x 和 y 坐标。这四个坐标分别表示当前格子周围的四个格子：上、下、左、右。

对于每个坐标，代码首先检查这个坐标是否在网格的范围之外。如果是，那么它就跳过这个坐标，因为超出范围的坐标不可能是有效的路径点。

然后，代码检查这个坐标是否已经被障碍物阻挡。如果是，那么它也跳过这个坐标。

最后，如果这个坐标没有被障碍物阻挡，代码会检查这个坐标是否是一个障碍物。如果是，那么它将这个坐标标记为禁止。

在这段代码中，"grid" 应该是一个对象，它有一个 row 和 column 属性，代表网格的行数和列数。它还有一个 isObstacle 方法，用来判断一个坐标是否是障碍物。另外，"blocked" 应该是一个二维数组，用来存储哪些坐标是禁止的。

总的来说，这段代码在遍历一个二维网格并标记或跳过不同的坐标，以实现一种简单的路径查找算法。
*/
        for (const [x, y] of [
            [i + 1, j],
            [i - 1, j],
            [i, j + 1],
            [i, j - 1],
        ]) {
            // 如果x或y超出网格范围，则跳过
            if (x < 0 || x >= grid.row || y < 0 || y >= grid.column) {
                continue;
            }
            // 如果x或y是障碍物，则跳过
            if (blocked[x][y] || visited[i][j]) {
                continue;
            }
            // 如果网格是障碍物，则将该网格标记为禁止
            if (grid.isObstacle(x, y)) {
                // 如果网格是障碍物，则将该网格标记为禁止
                blocked[x][y] = true;
                obstacled.push([x, y]);
            }
        }
        // 如果当前网格可以到达起点网格
        if (canReach([starti, startj], [i, j], grid)) {
            // 将当前网格添加到结果数组中
            result.push([i, j]);
        } else {
            blocked[i][j] = true;
        }
        // 如果上方的网格未被访问且不是障碍物，则将该网格添加到栈中
        if (
            i - 1 >= 0 &&
            !visited[i - 1][j] &&
            !grid.isObstacle(i - 1, j) &&
            !blocked[i - 1][j]
        ) {
            stack.push([i - 1, j]);
        }
        // 如果下方的网格未被访问且不是障碍物，则将该网格添加到栈中
        if (
            i + 1 < grid.row &&
            !visited[i + 1][j] &&
            !blocked[i + 1][j] &&
            !grid.isObstacle(i + 1, j)
        ) {
            stack.push([i + 1, j]);
        }
        // 如果左方的网格未被访问且不是障碍物，则将该网格添加到栈中
        if (
            j - 1 >= 0 &&
            !visited[i][j - 1] &&
            !blocked[i][j - 1] &&
            !grid.isObstacle(i, j - 1)
        ) {
            stack.push([i, j - 1]);
        }
        // 如果右方的网格未被访问且不是障碍物，则将该网格添加到栈中
        if (
            j + 1 < grid.column &&
            !visited[i][j + 1] &&
            !blocked[i][j + 1] &&
            !grid.isObstacle(i, j + 1)
        ) {
            stack.push([i, j + 1]);
        }
    }
    // 返回结果数组，即所有符合条件的网格坐标
    return result.filter(([x, y]) => !(x === starti && y === startj));
}
