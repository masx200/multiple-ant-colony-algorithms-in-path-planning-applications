import { describe, expect, it } from "vitest";
import { getPathCoordinates } from "./getPathCoordinates";

describe("getPathCoordinates", () => {
    it("getPathCoordinates", () => {
        expect(getPathCoordinates([0, 0], [10, 1])).toEqual([
            [0, 0],

            [1, 0],
            [2, 0],
            [3, 0],
            [4, 0],
            [5, 1],
            [6, 1],
            [7, 1],
            [8, 1],
            [9, 1],
            [10, 1],
        ]);
        expect(getPathCoordinates([0, 0], [1, 1])).toEqual([
            [0, 0],

            [1, 1],
        ]);
        expect(getPathCoordinates([0, 0], [1, 10])).toEqual([
            [0, 0],

            [0, 1],
            [0, 2],
            [0, 3],
            [0, 4],

            [1, 5],
            [1, 6],
            [1, 7],
            [1, 8],
            [1, 9],
            [1, 10],
        ]);
        expect(getPathCoordinates([10, 0], [10, 10])).toEqual([
            [10, 0],

            [10, 1],
            [10, 2],
            [10, 3],
            [10, 4],
            [10, 5],
            [10, 6],
            [10, 7],
            [10, 8],
            [10, 9],
            [
                10,

                10,
            ],
        ]);
        expect(getPathCoordinates([0, 0], [1, 10])).toEqual([
            [0, 0],

            [0, 1],
            [0, 2],
            [0, 3],
            [0, 4],

            [1, 5],
            [1, 6],
            [1, 7],
            [1, 8],
            [1, 9],
            [1, 10],
        ]);
        expect(getPathCoordinates([10, 0], [1, 10])).toEqual([
            [10, 0],
            [9, 1],
            [8, 2],
            [7, 3],
            [6, 4],
            [5, 5],
            [5, 6],
            [4, 7],
            [3, 8],
            [2, 9],
            [1, 10],
        ]);

        expect(getPathCoordinates([10, 10], [1, 3])).toEqual([
            [10, 10],
            [10, 11],
            [10, 12],
            [10, 13],
            [10, 14],
            [10, 15],
            [10, 16],
            [10, 17],
            [10, 18],
            [10, 19],
            [10, 20],
            [10, 21],
            [10, 22],
            [10, 23],
        ]);
        expect(getPathCoordinates([10, 10], [1, 30])).toEqual([
            [10, 10],
            [10, 11],
            [10, 12],
            [10, 13],
            [10, 14],
            [10, 15],
            [10, 16],
            [10, 17],
            [10, 18],
            [10, 19],
            [10, 20],
            [10, 21],
            [10, 22],
            [10, 23],
            [10, 30],
            [10, 31],
            [10, 32],
            [10, 33],
            [10, 34],
            [10, 35],
        ]);
    });
});
