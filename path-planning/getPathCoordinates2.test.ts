import { describe, expect, it } from "vitest";
import { getPathCoordinates } from "./getPathCoordinates";

describe("getPathCoordinates2", () => {
    it("getPathCoordinates2", () => {
        expect(getPathCoordinates([10, 10], [1, 30])).toEqual([
            [10, 10],
            [10, 11],
            [9, 12],
            [9, 13],
            [8, 14],
            [8, 15],
            [7, 16],
            [7, 17],
            [6, 18],
            [6, 19],
            [6, 20],
            [5, 21],
            [5, 22],
            [4, 23],
            [4, 24],
            [3, 25],
            [3, 26],
            [2, 27],
            [2, 28],
            [1, 29],
            [1, 30],
        ]);
    });
});
