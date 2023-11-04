import { EuclideanDistance } from "./Euclidean-distance";
import { GridMethod } from "./grid-method";

/**
 * 计算网格距离矩阵
 *
 * @param grid 网格方法
 * @returns 返回距离矩阵
 */
export function GridDistanceMatrix(grid: GridMethod): number[][][][] {
    // 定义一个四维数组 res，用于存储计算结果
    const res: number[][][][] = [];
    // 遍历 grid 的列
    for (let i = 0; i < grid.column; i++) {
        // 遍历 grid 的行
        for (let j = 0; j < grid.row; j++) {
            // 遍历 grid 的列
            for (let k = 0; k < grid.column; k++) {
                // 遍历 grid 的列
                for (let l = 0; l < grid.column; l++) {
                    // 计算欧几里得距离，并赋值给 res[i][j][k][l]
                    res[i][j][k][l] = EuclideanDistance(i, j, k, l);
                }
            }
        }
    }
    // 返回计算结果 res
    return res;
}
