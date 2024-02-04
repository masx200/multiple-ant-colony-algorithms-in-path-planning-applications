import { expect, describe, it, assert } from "vitest";
import { GridVisibilityChecker } from "./GridVisibilityChecker";
import { GridMap } from "./grid-map";
import { GridMapFromArray } from "./GridMapFromArray";
import { CachedGridVisibilityChecker } from "./CachedGridVisibilityChecker";

describe("CachedGridVisibilityChecker", () => {
    // });

    it("should return visible grid matrix", () => {
        let checker: GridVisibilityChecker = create_test_instance();
        // Arrange
        const a = 3;
        const b = 8;
        const c = 1;
        const d = 10;

        // Act
        const result = checker.visibleGridsMatrix(a, b, c, d);
        // console.log(result);
        // Assert
        expect(result).toBeDefined();
        assert.equal(false, result);

        // Add more assertions here
    });
    it("should return visible grid matrix", () => {
        let checker: GridVisibilityChecker = create_test_instance();
        // Arrange
        const a = 1;
        const b = 10;
        const c = 3;
        const d = 8;

        // Act
        const result = checker.visibleGridsMatrix(a, b, c, d);
        // console.log(result);
        // Assert
        expect(result).toBeDefined();
        assert.equal(false, result);

        // Add more assertions here
    });

    it("should return visible grid matrix", () => {
        let checker: GridVisibilityChecker = create_test_instance();
        // Arrange
        const a = 10;
        const b = 1;
        const c = 0;
        const d = 1;

        // Act
        const result = checker.visibleGridsMatrix(a, b, c, d);
        // console.log(result);
        assert.equal(true, result);
        // Assert
        expect(result).toBeDefined();
        // Add more assertions here
    });
    it("should return visible grid matrix", () => {
        let checker: GridVisibilityChecker = create_test_instance();
        // Arrange
        const a = 0;
        const b = 1;
        const c = 10;
        const d = 1;

        // Act
        const result = checker.visibleGridsMatrix(a, b, c, d);
        // console.log(result);
        assert.equal(true, result);
        // Assert
        expect(result).toBeDefined();
        // Add more assertions here
    });
});
function create_test_instance() {
    let grid: GridMap = GridMapFromArray([
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0],
        [0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0],
        [0, 0, 1, 1, 1, 0, 0, 1, 0, 1, 0],
        [0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 1, 1, 1, 0, 1, 1],
        [0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0],
        [0, 0, 1, 1, 0, 1, 0, 1, 0, 0, 0],
        [0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
    ]);
    let checker: GridVisibilityChecker = CachedGridVisibilityChecker(grid);
    return checker;
}
