import { FindPointsInsideAllConvexPolygonsWithMatrixPointIterator } from "./FindPointsInsideAllConvexPolygonsWithMatrixPointIterator";
import { GridMap } from "./grid-map";
import { MatrixPointIteratorLeftButton } from "./MatrixPointIteratorLeftButton";

export function FindPointsInsideAllConvexPolygonsLeftButton(
    grid: GridMap,
    visibleGridsMatrix: boolean[][][][],
): Iterable<[number, number]> {
    return FindPointsInsideAllConvexPolygonsWithMatrixPointIterator(
        grid,
        visibleGridsMatrix,
        MatrixPointIteratorLeftButton,
    );
}
