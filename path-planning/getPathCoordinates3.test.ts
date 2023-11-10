import { describe, expect, it } from "vitest";
import { getPathCoordinates } from "./getPathCoordinates";

describe("getPathCoordinates3", () => {
    it("getPathCoordinates1", () => {
        expect(getPathCoordinates([10, 10], [1, 10])).toEqual([
            [10, 10],

            [9, 10],
            [8, 10],
            [7, 10],
            [6, 10],
            [5, 10],
            [4, 10],
            [3, 10],
            [2, 10],
            [1, 10],
        ]);
    });
    it("getPathCoordinates3", () => {
        expect(getPathCoordinates([10, 10], [10, 10])).toEqual([[10, 10]]);
    });
});
