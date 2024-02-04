import { expect, describe, it } from "vitest";
import { GridVisibilityChecker } from "./GridVisibilityChecker";
import { GridMap } from "./grid-map";
import { GridMapFromArray } from "./GridMapFromArray";
import { CachedGridVisibilityChecker } from "./CachedGridVisibilityChecker";

describe("CachedGridVisibilityChecker", () => {
    // });
    it("should return visible grid list", () => {
        let checker: GridVisibilityChecker = create_test_instance();
        // Arrange
        const a = 1;
        const b = 2;

        // Act
        const result = checker.visibleGridsList(a, b);
        console.log(result);
        // Assert
        expect(result).toBeDefined();
        // Add more assertions here
    });

    it("should return visible grid matrix", () => {
        let checker: GridVisibilityChecker = create_test_instance();
        // Arrange
        const a = 1;
        const b = 2;
        const c = 3;
        const d = 4;

        // Act
        const result = checker.visibleGridsMatrix(a, b, c, d);
        console.log(result);
        // Assert
        expect(result).toBeDefined();
        // Add more assertions here
    });
});
function create_test_instance() {
    let grid: GridMap = GridMapFromArray([
        [1, 0, 1, 0, 1, 0, 1, 0],
        [1, 0, 0, 0, 1, 0, 1, 0],
        [1, 0, 1, 0, 1, 0, 1, 0],
        [1, 0, 1, 0, 0, 0, 1, 0],
        [1, 0, 1, 0, 1, 0, 1, 0],
        [1, 0, 1, 0, 1, 0, 1, 0],
        [1, 0, 1, 0, 1, 0, 1, 0],
        [1, 0, 1, 0, 1, 0, 1, 0],
    ]);
    let checker: GridVisibilityChecker = CachedGridVisibilityChecker(grid);
    return checker;
}
