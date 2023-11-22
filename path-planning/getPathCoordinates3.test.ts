import { describe, expect, it, test } from "vitest";
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
test("getPathCoordinates", () => {
    expect(getPathCoordinates([7, 7], [0, 7])).toEqual(
        [
            [+7, +7],
            [+7, +6],
            [+7, +5],
            [+7, +4],
            [+7, +3],
            [+7, +2],
            [+7, +1],
            [+7, +0],
        ].map((a) => a.reverse())
    );
    expect(getPathCoordinates([0, 7], [7, 7])).toEqual(
        [
            [+7, +7],
            [+7, +6],
            [+7, +5],
            [+7, +4],
            [+7, +3],
            [+7, +2],
            [+7, +1],
            [+7, +0],
        ]
            .reverse()
            .map((a) => a.reverse())
    );
});
