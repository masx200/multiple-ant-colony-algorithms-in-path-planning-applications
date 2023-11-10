import { describe, expect, it } from "vitest";
import { getPathCoordinates } from "./getPathCoordinates";

describe("getPathCoordinates1", () => {
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
            [9, 9],
            [8, 8],
            [7, 8],
            [6, 7],
            [5, 6],
            [4, 5],
            [3, 5],
            [2, 4],
            [1, 3],
        ]);
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
