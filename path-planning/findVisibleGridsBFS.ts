import { MinHeap } from "@datastructures-js/heap";

import { canStraightReach } from "./canStraightReach";
import { EuclideanDistance } from "./Euclidean-distance";
import { GridMap } from "./grid-map";

/**
 * 查找所有可见的网格
 *
 * 使用广度优先搜索,和优先级队列,距离从近到远,遇到障碍物就禁止被阻挡的格子,如果所有格子都禁止了,就停止搜索
 *
 * @param starti 起始行索引
 * @param startj 起始列索引
 * @param grid 网格地图
 * @returns 包含所有可见网格的数组
 */
export function findVisibleGridsBFS(
    [starti, startj]: [number, number],
    grid: GridMap,
): [number, number][] {
    const result: [number, number][] = [];
    // 如果起始位置是障碍物，则返回空数组
    if (grid.isObstacle(starti, startj)) return [];

    // 初始化距离数组，距离从近到远，初始值设置为无穷大
    const distances: number[][] = Array(grid.data.length)
        .fill(0)
        .map(
            (/* _v, _i */) => Array(grid.data[0].length).fill(Infinity),
            //.map((_p, j) => EuclideanDistance(starti, startj, i, j))
        );
    // 使用最小堆来存储网格坐标，按照距离的远近进行排序
    const minheap = new MinHeap<[number, number]>(function ([x, y]) {
        return Number.isFinite(distances[x][y])
            ? distances[x][y]
            : ((distances[x][y] = EuclideanDistance([starti, startj], [x, y])),
              distances[x][y]);
    });
    // 将起始位置添加到最小堆中
    minheap.push([starti, startj]);
    // 记录访问过的网格，避免重复访问
    const visited: boolean[][] = Array(grid.data.length)
        .fill(0)
        .map(() => Array(grid.data[0].length).fill(false));

    // 当最小堆不为空时，循环查找
    while (minheap.size() > 0) {
        // 从最小堆中取出一个坐标
        const [x, y] = minheap.pop() as [number, number];
        // 范围判断,如果范围错误就跳过
        if (x < 0 || x >= grid.data.length) continue;
        if (y < 0 || y >= grid.data[0].length) continue;
        if (grid.isObstacle(x, y)) continue;

        // 如果该位置已被访问过，则跳过
        if (visited[x][y]) continue;
        visited[x][y] = true;
        // 如果该位置是空闲的，且不是起始位置，且可以直接到达，则将其加入结果数组
        if (
            grid.isFree(x, y) &&
            !(starti == x && startj == y) &&
            canStraightReach([starti, startj], [x, y], grid)
        ) {
            result.push([x, y]);
        }
        //4个方向(上,右，左,下)遍历，不能斜方向

        // 上下左右四个方向进行遍历
        // 如果当前位置的x坐标大于0，并且它的左边网格没有被访问过，且左边的网格是自由的（即没有被占据），则将左边的网格加入到最小堆中
        if (x > 0 && !visited[x - 1][y] && grid.isFree(x - 1, y)) {
            minheap.push([x - 1, y]);
        }

        // 如果当前位置的x坐标小于网格的总行数减1，并且它的右边网格没有被访问过，且右边的网格是自由的（即没有被占据），则将右边的网格加入到最小堆中
        if (
            x < grid.data.length - 1 &&
            !visited[x + 1][y] &&
            grid.isFree(x + 1, y)
        ) {
            minheap.push([x + 1, y]);
        }

        // 如果当前位置的y坐标大于0，并且它的上边网格没有被访问过，且上边的网格是自由的（即没有被占据），则将上边的网格加入到最小堆中
        if (y > 0 && !visited[x][y - 1] && grid.isFree(x, y - 1)) {
            minheap.push([x, y - 1]);
        }

        // 如果当前位置的y坐标小于网格的总列数减1，并且它的下边网格没有被访问过，且下边的网格是自由的（即没有被占据），则将下边的网格加入到最小堆中
        if (
            y < grid.data[0].length - 1 &&
            !visited[x][y + 1] &&
            grid.isFree(x, y + 1)
        ) {
            minheap.push([x, y + 1]);
        }
    }

    // 返回结果数组，即所有符合条件的网格坐标
    return result;
}
