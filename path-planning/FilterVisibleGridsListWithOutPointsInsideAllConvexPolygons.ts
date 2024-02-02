/**
 * 过滤掉所有包含在凸多边形内部的点的可见网格列表。
 * @param visibleGridsList 可见网格列表，格式为二维数组。
 * @param pointsInsideAllConvexPolygons 凸多边形内部的点集合。
 * @returns 过滤后的可见网格列表，格式为二维数组。
 */
export function FilterVisibleGridsListWithOutPointsInsideAllConvexPolygons(
    visibleGridsList: Iterable<[number, number]>[][],
    pointsInsideAllConvexPolygons: Set<number>,
): Iterable<[number, number]>[][] {
    const gridrow = visibleGridsList.length;
    return Array(visibleGridsList.length)
        .fill(0)
        .map((_, i) =>
            Array(visibleGridsList[0].length)
                .fill(0)
                .map((_, j) =>
                    [...visibleGridsList[i][j]].filter(
                        ([nx, ny]) =>
                            !pointsInsideAllConvexPolygons.has(
                                nx * gridrow + ny,
                            ),
                    ),
                ),
        );
}
