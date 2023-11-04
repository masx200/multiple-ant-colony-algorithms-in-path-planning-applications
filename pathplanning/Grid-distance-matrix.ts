import { EuclideanDistance } from "./Euclidean-distance";
import { GridMethod } from "./grid-method";

export function GridDistanceMatrix(grid: GridMethod): number[][][][] {
    const res: number[][][][] = [];
    for (let i = 0; i < grid.column; i++) {
        for (let j = 0; j < grid.row; j++) {
            for (let k = 0; k < grid.column; k++) {
                for (let l = 0; l < grid.column; l++) {
                    res[i][j][k][l] = EuclideanDistance(i, j, k, l);
                }
            }
        }
    }
    return res;
}
