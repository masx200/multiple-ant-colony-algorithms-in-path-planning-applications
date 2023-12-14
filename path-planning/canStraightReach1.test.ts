import { describe, expect, test } from "vitest";
import { canStraightReach } from "./canStraightReach";
import { GridMap } from "./grid-map";

describe("canStraightReach", () => {
    const grid1 = new GridMap(3, 3, [
        [0, 0, 0],
        [0, 1, 0],
        [0, 0, 0],
    ]);

    const grid2 = new GridMap(3, 3, [
        [0, 0, 0],
        [0, 1, 0],
        [0, 0, 1],
    ]);

    const grid3 = new GridMap(3, 3, [
        [0, 0, 0],
        [0, 1, 0],
        [0, 0, 0],
    ]);

    const grid4 = new GridMap(3, 3, [
        [0, 0, 0],
        [0, 1, 0],
        [0, 0, 0],
    ]);

    test("canStraightReach: test case 1", () => {
        expect(canStraightReach([0, 0], [2, 2], grid1)).toBe(false);
    });

    test("canStraightReach: test case 2", () => {
        expect(canStraightReach([0, 0], [2, 2], grid2)).toBe(false);
    });

    test("canStraightReach: test case 3", () => {
        expect(canStraightReach([0, 0], [1, 1], grid3)).toBe(false);
    });

    test("canStraightReach: test case 4", () => {
        expect(canStraightReach([0, 0], [0, 0], grid4)).toBe(true);
    });
});
