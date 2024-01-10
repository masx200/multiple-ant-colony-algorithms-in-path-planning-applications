import { uniqBy } from "lodash-es";

import { FindPointsInsideAllConvexPolygonsLeftButton } from "./FindPointsInsideAllConvexPolygonsLeftButton";
import { FindPointsInsideAllConvexPolygonsLeftTop } from "./FindPointsInsideAllConvexPolygonsLeftTop";
import { FindPointsInsideAllConvexPolygonsRightButton } from "./FindPointsInsideAllConvexPolygonsRightButton";
import { FindPointsInsideAllConvexPolygonsRightTop } from "./FindPointsInsideAllConvexPolygonsRightTop";
import { GridMap } from "./grid-map";
import { twoDimensionsToOneDimension } from "./twoDimensionsToOneDimension";

/**
 * 计算所有点被所有凸多边形包围的内部点
 *算法类似于岛屿问题
 *  为了解决有偏差的问题,正向搜索和方向搜索的结果合并一下
 * @param grid 网格地图
 * @param visibleGridsMatrix 可见网格矩阵
 * @returns 被所有凸多边形包围的点的坐标数组
 */
export function FindPointsInsideAllConvexPolygons(
    grid: GridMap,
    visibleGridsMatrix: boolean[][][][],
): Iterable<[number, number]> {
    const n = grid.data[0].length;

    return new Set(
        uniqBy(
            [
                ...FindPointsInsideAllConvexPolygonsLeftTop(
                    grid,
                    visibleGridsMatrix,
                ),
                ...FindPointsInsideAllConvexPolygonsRightButton(
                    grid,
                    visibleGridsMatrix,
                ),
                ...FindPointsInsideAllConvexPolygonsLeftButton(
                    grid,
                    visibleGridsMatrix,
                ),
                ...FindPointsInsideAllConvexPolygonsRightTop(
                    grid,
                    visibleGridsMatrix,
                ),
            ],
            ([i, j]) => {
                return twoDimensionsToOneDimension(i, j, n);
            },
        ),
    );
}
