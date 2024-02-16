import { GridVisibilityChecker } from "./GridVisibilityChecker";
import { CachedCanStraightReach } from "./canStraightReach";
import { findVisibleGridsCircleWithDistanceLimit } from "./findVisibleGridsCircleWithDistanceLimit";
import { GridMap } from "./grid-map";

/**
 * 缓存网格可见性检查器
 * @param grid 网格地图
 * @returns 网格可见性检查器
 */

export function CachedGridVisibilityCheckerFactory(
    grid: GridMap,
    distanceLimit: number,
    getGridDistance: (
        [x1, y1]: [number, number],
        [x2, y2]: [number, number],
    ) => number,
): GridVisibilityChecker {
    const result: Iterable<[number, number]>[][] = [];
    const matrix: boolean[][][][] = [];
    function visibleGridsMatrix(
        [a, b]: [number, number],
        [c, d]: [number, number],
    ): boolean {
        if (
            matrix[a] &&
            matrix[a][b] &&
            matrix[a][b][c] &&
            typeof matrix[a][b][c][d] != "undefined"
        ) {
            // console.log("cache hit", grid, a, b, c, d);
            return matrix[a][b][c][d];
        }

        // console.log(grid, a, b, c, d, result, matrix);
        // const VisibleGrids = visibleGridsList([a, b]);
        // matrix[a] ??= [];
        // matrix[a][b] ??= Array(grid.data.length)
        //     .fill(0)
        //     .map(() => Array(grid.data[0].length).fill(false));
        // for (const element of VisibleGrids) {
        //     // 获取当前元素（VisibleGrids[index]）
        //     // 将对应位置的值设为 true（表示可见）
        //     matrix[a][b][element[0]] ??= [];
        //     matrix[a][b][element[0]][element[1]] = true;
        //     // matrix[element[0]] ??= [];
        //     // matrix[element[0]][element[1]] ??= Array(grid.data.length)
        //     //     .fill(0)
        //     //     .map(() => Array(grid.data[0].length).fill(false));
        //     // matrix[element[0]][element[1]][a] ??= [];
        //     // matrix[element[0]][element[1]][a][b] = true;
        // }
        const result = CachedCanStraightReach([a, b], [c, d], grid);

        matrix[a] ??= [];
        matrix[a][b] ??= [];
        matrix[a][b][c] ??= [];
        matrix[a][b][c][d] = result;
        matrix[c] ??= [];
        matrix[c][d] ??= [];
        matrix[c][d][a] ??= [];
        matrix[c][d][a][b] = result;
        return matrix[a][b][c][d]; // 返回最终结果 result
    }
    function visibleGridsList([a, b]: [number, number]): Iterable<
        [number, number]
    > {
        if (result[a] && typeof result[a][b] != "undefined") {
            // console.log("cache hit", grid, a, b);
            return result[a][b];
        }
        const VisibleGrids = findVisibleGridsCircleWithDistanceLimit(
            [a, b],
            grid,
            distanceLimit,
            getGridDistance,
        );
        result[a] ??= [];
        result[a][b] = VisibleGrids;
        return VisibleGrids;
    }
    const instance: GridVisibilityChecker = {
        /**
         * 获取指定位置的可见网格列表
         * @param a 行索引
         * @param b 列索引
         * @returns 可见网格列表
         */
        visibleGridsList,
        /**
         * 获取指定矩形范围内的可见网格矩阵
         * @param a 矩形左上角行索引
         * @param b 矩形左上角列索引
         * @param c 矩形右下角行索引
         * @param d 矩形右下角列索引
         * @returns 可见网格矩阵
         */
        visibleGridsMatrix,
    } satisfies GridVisibilityChecker;
    return instance;
}
