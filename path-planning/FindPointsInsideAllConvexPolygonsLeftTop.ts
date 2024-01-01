import { FindPointsInsideAllConvexPolygonsWithMatrixPointIterator } from "./FindPointsInsideAllConvexPolygonsWithMatrixPointIterator";
import { GridMap } from "./grid-map";
import { MatrixPointIteratorLeftTop } from "./MatrixPointIteratorLeftTop";

/**
 * 计算所有点被所有凸多边形包围的内部点
 *
 * 算法类似于岛屿问题
 * 正向搜索

 * @param grid 网格地图
 * @param visibleGridsMatrix 可见网格矩阵
 * @returns 被所有凸多边形包围的点的坐标数组
 */
export function FindPointsInsideAllConvexPolygonsLeftTop(
    grid: GridMap,
    visibleGridsMatrix: boolean[][][][],
): Iterable<[number, number]> {
    return FindPointsInsideAllConvexPolygonsWithMatrixPointIterator(
        grid,
        visibleGridsMatrix,
        MatrixPointIteratorLeftTop,
    );
}
