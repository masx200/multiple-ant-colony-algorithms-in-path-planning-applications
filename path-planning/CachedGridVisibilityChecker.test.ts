import { expect, describe, it, assert } from "vitest";
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

        expect([...result].length).toBeGreaterThan(0);
        assert.deepEqual(
            new Set([
                [0, 1],
                [1, 1],
                [2, 1],
                [2, 3],
                [3, 4],
                [4, 5],
                [1, 3],
                [0, 3],
            ]),
            new Set(result),
        );
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
        assert.equal(true, result);

        // Add more assertions here
    });
    it("should return visible grid list", () => {
        let checker: GridVisibilityChecker = create_test_instance();
        // Arrange
        const a = 0;
        const b = 0;

        // Act
        const result = checker.visibleGridsList(a, b);
        console.log(result);
        // Assert
        expect(result).toBeDefined();
        expect([...result].length).toBe(0);
        // Add more assertions here
    });

    it("should return visible grid matrix", () => {
        let checker: GridVisibilityChecker = create_test_instance();
        // Arrange
        const a = 1;
        const b = 2;
        const c = 0;
        const d = 0;

        // Act
        const result = checker.visibleGridsMatrix(a, b, c, d);
        console.log(result);
        assert.equal(false, result);
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
