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
