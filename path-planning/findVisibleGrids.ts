import { MinHeap } from "@datastructures-js/heap";
import { canStraightReach } from "./canStraightReach";
import { EuclideanDistance } from "./Euclidean-distance";
import { GridMap } from "./grid-map";

/**
 * 查找所有可见的网格
 *
 * 使用广度优先搜索,和优先级队列,距离从近到远,添加角度的范围模块,遇到障碍物就禁止被遮挡的角度,如果所有角度都禁止了,就停止搜索
 *
 * @param starti 起始行索引
 * @param startj 起始列索引
 * @param grid 网格地图
 * @returns 包含所有可见网格的数组
 */
export function findVisibleGrids(
    starti: number,
    startj: number,
    grid: GridMap,
): [number, number][] {
    const result: [number, number][] = [];
    if (grid.isObstacle(starti, startj)) return [];

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
            : ((distances[x][y] = EuclideanDistance(starti, startj, x, y)),
              distances[x][y]);
    });
    minheap.push([starti, startj]);
    // 记录访问过的网格，避免重复访问
    const visited: boolean[][] = Array(grid.data.length)
        .fill(0)
        .map(() => Array(grid.data[0].length).fill(false));

    while (minheap.size() > 0) {
        const [x, y] = minheap.pop() as [number, number];
        //范围判断,如果范围错误就跳过
        if (x < 0 || x >= grid.data.length) continue;
        if (y < 0 || y >= grid.data[0].length) continue;
        if (grid.isObstacle(x, y)) continue;

        if (visited[x][y]) continue;
        visited[x][y] = true;
        if (
            grid.isFree(x, y) &&
            !(starti == x && startj == y) &&
            canStraightReach([starti, startj], [x, y], grid)
        ) {
            result.push([x, y]);
        }
        //4个方向(上,右，左,下)遍历，不能斜方向

        // 上下左右四个方向进行遍历
        if (x > 0 && !visited[x - 1][y] && grid.isFree(x - 1, y)) {
            minheap.push([x - 1, y]);
        }
        if (
            x < grid.data.length - 1 &&
            !visited[x + 1][y] &&
            grid.isFree(x + 1, y)
        ) {
            minheap.push([x + 1, y]);
        }
        if (y > 0 && !visited[x][y - 1] && grid.isFree(x, y - 1)) {
            minheap.push([x, y - 1]);
        }
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
