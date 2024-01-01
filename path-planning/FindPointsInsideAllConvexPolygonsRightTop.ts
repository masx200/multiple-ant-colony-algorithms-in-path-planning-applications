import { FindPointsInsideAllConvexPolygonsWithMatrixPointIterator } from "./FindPointsInsideAllConvexPolygonsWithMatrixPointIterator";
import { MatrixPointIteratorRightTop } from "./MatrixPointIteratorRightTop";
import { GridMap } from "./grid-map";

/**
 * 计算所有点被所有凸多边形包围的内部点
 *算法类似于岛屿问题
 *反向搜索
 * @param grid 网格地图
 * @param visibleGridsMatrix 可见网格矩阵
 * @returns 被所有凸多边形包围的点的坐标数组
 */
export function FindPointsInsideAllConvexPolygonsRightTop(
    grid: GridMap,

    visibleGridsMatrix: boolean[][][][],
): Iterable<[number, number]> {
    return FindPointsInsideAllConvexPolygonsWithMatrixPointIterator(
        grid,
        visibleGridsMatrix,
        MatrixPointIteratorRightTop,
    );
}
