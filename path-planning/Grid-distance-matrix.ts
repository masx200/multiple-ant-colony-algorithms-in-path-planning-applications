import { EuclideanDistance } from "./Euclidean-distance";

/**
 * 计算二维网格中任意两点之间的欧几里得距离的矩阵
 *
 * @param column - 网格的列数
 * @param row - 网格的行数
 * @returns 四维数组，表示网格中任意两点之间的欧几里得距离矩阵
 */
export function GridDistanceMatrix(
    column: number,
    row: number,
): number[][][][] {
    // 定义一个四维数组 res，用于存储计算结果
    const res: number[][][][] = Array(column)
        .fill(0)
        .map(() =>
            Array(row)
                .fill(0)
                .map(() =>
                    Array(column)
                        .fill(0)
                        .map(() => Array(row).fill(0) as number[]),
                ),
        );
    // console.log(res);
    // 遍历 grid 的列
    for (let i = 0; i < column; i++) {
        // 遍历 grid 的行
        for (let j = 0; j < row; j++) {
            // 遍历 grid 的列
            for (let k = 0; k < column; k++) {
                // 遍历 grid 的列
                for (let l = 0; l < row; l++) {
                    const distance = EuclideanDistance([i, j], [k, l]);
                    // 计算欧几里得距离，并赋值给 res[i][j][k][l]

                    if (res[k][l][i][j] === 0) {
                        res[k][l][i][j] = distance;
                    }
                    if (res[i][j][k][l] === 0) {
                        res[i][j][k][l] = distance;
                    }
                }
            }
        }
    }
    // 返回计算结果 res
    return res;
}
