import { describe, expect, it } from "vitest";
import { GridDistanceMatrix } from "./Grid-distance-matrix";

describe("GridDistanceMatrix", () => {
    it("test constructor1", () => {
        const column = 2,
            row = 2;
        const result1 = GridDistanceMatrix(column, row);

        expect(result1).toEqual([
            [
                [
                    [0, 1],
                    [1, 1.4142135623730951],
                ],
                [
                    [1, 0],
                    [1.4142135623730951, 1],
                ],
            ],
            [
                [
                    [1, 1.4142135623730951],
                    [0, 1],
                ],
                [
                    [1.4142135623730951, 1],
                    [1, 0],
                ],
            ],
        ]);
    });
    it("test constructor2", () => {
        const column = 5,
            row = 5;
        const result = GridDistanceMatrix(column, row);

        expect(result).toEqual([
            [
                [
                    [0, 1, 2, 3, 4],
                    [
                        1, 1.4142135623730951, 2.23606797749979,
                        3.1622776601683795, 4.123105625617661,
                    ],
                    [
                        2, 2.23606797749979, 2.8284271247461903,
                        3.605551275463989, 4.47213595499958,
                    ],
                    [
                        3, 3.1622776601683795, 3.605551275463989,
                        4.242640687119285, 5,
                    ],
                    [
                        4, 4.123105625617661, 4.47213595499958, 5,
                        5.656854249492381,
                    ],
                ],
                [
                    [1, 0, 1, 2, 3],
                    [
                        1.4142135623730951, 1, 1.4142135623730951,
                        2.23606797749979, 3.1622776601683795,
                    ],
                    [
                        2.23606797749979, 2, 2.23606797749979,
                        2.8284271247461903, 3.605551275463989,
                    ],
                    [
                        3.1622776601683795, 3, 3.1622776601683795,
                        3.605551275463989, 4.242640687119285,
                    ],
                    [
                        4.123105625617661, 4, 4.123105625617661,
                        4.47213595499958, 5,
                    ],
                ],
                [
                    [2, 1, 0, 1, 2],
                    [
                        2.23606797749979, 1.4142135623730951, 1,
                        1.4142135623730951, 2.23606797749979,
                    ],
                    [
                        2.8284271247461903, 2.23606797749979, 2,
                        2.23606797749979, 2.8284271247461903,
                    ],
                    [
                        3.605551275463989, 3.1622776601683795, 3,
                        3.1622776601683795, 3.605551275463989,
                    ],
                    [
                        4.47213595499958, 4.123105625617661, 4,
                        4.123105625617661, 4.47213595499958,
                    ],
                ],
                [
                    [3, 2, 1, 0, 1],
                    [
                        3.1622776601683795, 2.23606797749979,
                        1.4142135623730951, 1, 1.4142135623730951,
                    ],
                    [
                        3.605551275463989, 2.8284271247461903, 2.23606797749979,
                        2, 2.23606797749979,
                    ],
                    [
                        4.242640687119285, 3.605551275463989,
                        3.1622776601683795, 3, 3.1622776601683795,
                    ],
                    [
                        5, 4.47213595499958, 4.123105625617661, 4,
                        4.123105625617661,
                    ],
                ],
                [
                    [4, 3, 2, 1, 0],
                    [
                        4.123105625617661, 3.1622776601683795, 2.23606797749979,
                        1.4142135623730951, 1,
                    ],
                    [
                        4.47213595499958, 3.605551275463989, 2.8284271247461903,
                        2.23606797749979, 2,
                    ],
                    [
                        5, 4.242640687119285, 3.605551275463989,
                        3.1622776601683795, 3,
                    ],
                    [
                        5.656854249492381, 5, 4.47213595499958,
                        4.123105625617661, 4,
                    ],
                ],
            ],
            [
                [
                    [
                        1, 1.4142135623730951, 2.23606797749979,
                        3.1622776601683795, 4.123105625617661,
                    ],
                    [0, 1, 2, 3, 4],
                    [
                        1, 1.4142135623730951, 2.23606797749979,
                        3.1622776601683795, 4.123105625617661,
                    ],
                    [
                        2, 2.23606797749979, 2.8284271247461903,
                        3.605551275463989, 4.47213595499958,
                    ],
                    [
                        3, 3.1622776601683795, 3.605551275463989,
                        4.242640687119285, 5,
                    ],
                ],
                [
                    [
                        1.4142135623730951, 1, 1.4142135623730951,
                        2.23606797749979, 3.1622776601683795,
                    ],
                    [1, 0, 1, 2, 3],
                    [
                        1.4142135623730951, 1, 1.4142135623730951,
                        2.23606797749979, 3.1622776601683795,
                    ],
                    [
                        2.23606797749979, 2, 2.23606797749979,
                        2.8284271247461903, 3.605551275463989,
                    ],
                    [
                        3.1622776601683795, 3, 3.1622776601683795,
                        3.605551275463989, 4.242640687119285,
                    ],
                ],
                [
                    [
                        2.23606797749979, 1.4142135623730951, 1,
                        1.4142135623730951, 2.23606797749979,
                    ],
                    [2, 1, 0, 1, 2],
                    [
                        2.23606797749979, 1.4142135623730951, 1,
                        1.4142135623730951, 2.23606797749979,
                    ],
                    [
                        2.8284271247461903, 2.23606797749979, 2,
                        2.23606797749979, 2.8284271247461903,
                    ],
                    [
                        3.605551275463989, 3.1622776601683795, 3,
                        3.1622776601683795, 3.605551275463989,
                    ],
                ],
                [
                    [
                        3.1622776601683795, 2.23606797749979,
                        1.4142135623730951, 1, 1.4142135623730951,
                    ],
                    [3, 2, 1, 0, 1],
                    [
                        3.1622776601683795, 2.23606797749979,
                        1.4142135623730951, 1, 1.4142135623730951,
                    ],
                    [
                        3.605551275463989, 2.8284271247461903, 2.23606797749979,
                        2, 2.23606797749979,
                    ],
                    [
                        4.242640687119285, 3.605551275463989,
                        3.1622776601683795, 3, 3.1622776601683795,
                    ],
                ],
                [
                    [
                        4.123105625617661, 3.1622776601683795, 2.23606797749979,
                        1.4142135623730951, 1,
                    ],
                    [4, 3, 2, 1, 0],
                    [
                        4.123105625617661, 3.1622776601683795, 2.23606797749979,
                        1.4142135623730951, 1,
                    ],
                    [
                        4.47213595499958, 3.605551275463989, 2.8284271247461903,
                        2.23606797749979, 2,
                    ],
                    [
                        5, 4.242640687119285, 3.605551275463989,
                        3.1622776601683795, 3,
                    ],
                ],
            ],
            [
                [
                    [
                        2, 2.23606797749979, 2.8284271247461903,
                        3.605551275463989, 4.47213595499958,
                    ],
                    [
                        1, 1.4142135623730951, 2.23606797749979,
                        3.1622776601683795, 4.123105625617661,
                    ],
                    [0, 1, 2, 3, 4],
                    [
                        1, 1.4142135623730951, 2.23606797749979,
                        3.1622776601683795, 4.123105625617661,
                    ],
                    [
                        2, 2.23606797749979, 2.8284271247461903,
                        3.605551275463989, 4.47213595499958,
                    ],
                ],
                [
                    [
                        2.23606797749979, 2, 2.23606797749979,
                        2.8284271247461903, 3.605551275463989,
                    ],
                    [
                        1.4142135623730951, 1, 1.4142135623730951,
                        2.23606797749979, 3.1622776601683795,
                    ],
                    [1, 0, 1, 2, 3],
                    [
                        1.4142135623730951, 1, 1.4142135623730951,
                        2.23606797749979, 3.1622776601683795,
                    ],
                    [
                        2.23606797749979, 2, 2.23606797749979,
                        2.8284271247461903, 3.605551275463989,
                    ],
                ],
                [
                    [
                        2.8284271247461903, 2.23606797749979, 2,
                        2.23606797749979, 2.8284271247461903,
                    ],
                    [
                        2.23606797749979, 1.4142135623730951, 1,
                        1.4142135623730951, 2.23606797749979,
                    ],
                    [2, 1, 0, 1, 2],
                    [
                        2.23606797749979, 1.4142135623730951, 1,
                        1.4142135623730951, 2.23606797749979,
                    ],
                    [
                        2.8284271247461903, 2.23606797749979, 2,
                        2.23606797749979, 2.8284271247461903,
                    ],
                ],
                [
                    [
                        3.605551275463989, 2.8284271247461903, 2.23606797749979,
                        2, 2.23606797749979,
                    ],
                    [
                        3.1622776601683795, 2.23606797749979,
                        1.4142135623730951, 1, 1.4142135623730951,
                    ],
                    [3, 2, 1, 0, 1],
                    [
                        3.1622776601683795, 2.23606797749979,
                        1.4142135623730951, 1, 1.4142135623730951,
                    ],
                    [
                        3.605551275463989, 2.8284271247461903, 2.23606797749979,
                        2, 2.23606797749979,
                    ],
                ],
                [
                    [
                        4.47213595499958, 3.605551275463989, 2.8284271247461903,
                        2.23606797749979, 2,
                    ],
                    [
                        4.123105625617661, 3.1622776601683795, 2.23606797749979,
                        1.4142135623730951, 1,
                    ],
                    [4, 3, 2, 1, 0],
                    [
                        4.123105625617661, 3.1622776601683795, 2.23606797749979,
                        1.4142135623730951, 1,
                    ],
                    [
                        4.47213595499958, 3.605551275463989, 2.8284271247461903,
                        2.23606797749979, 2,
                    ],
                ],
            ],
            [
                [
                    [
                        3, 3.1622776601683795, 3.605551275463989,
                        4.242640687119285, 5,
                    ],
                    [
                        2, 2.23606797749979, 2.8284271247461903,
                        3.605551275463989, 4.47213595499958,
                    ],
                    [
                        1, 1.4142135623730951, 2.23606797749979,
                        3.1622776601683795, 4.123105625617661,
                    ],
                    [0, 1, 2, 3, 4],
                    [
                        1, 1.4142135623730951, 2.23606797749979,
                        3.1622776601683795, 4.123105625617661,
                    ],
                ],
                [
                    [
                        3.1622776601683795, 3, 3.1622776601683795,
                        3.605551275463989, 4.242640687119285,
                    ],
                    [
                        2.23606797749979, 2, 2.23606797749979,
                        2.8284271247461903, 3.605551275463989,
                    ],
                    [
                        1.4142135623730951, 1, 1.4142135623730951,
                        2.23606797749979, 3.1622776601683795,
                    ],
                    [1, 0, 1, 2, 3],
                    [
                        1.4142135623730951, 1, 1.4142135623730951,
                        2.23606797749979, 3.1622776601683795,
                    ],
                ],
                [
                    [
                        3.605551275463989, 3.1622776601683795, 3,
                        3.1622776601683795, 3.605551275463989,
                    ],
                    [
                        2.8284271247461903, 2.23606797749979, 2,
                        2.23606797749979, 2.8284271247461903,
                    ],
                    [
                        2.23606797749979, 1.4142135623730951, 1,
                        1.4142135623730951, 2.23606797749979,
                    ],
                    [2, 1, 0, 1, 2],
                    [
                        2.23606797749979, 1.4142135623730951, 1,
                        1.4142135623730951, 2.23606797749979,
                    ],
                ],
                [
                    [
                        4.242640687119285, 3.605551275463989,
                        3.1622776601683795, 3, 3.1622776601683795,
                    ],
                    [
                        3.605551275463989, 2.8284271247461903, 2.23606797749979,
                        2, 2.23606797749979,
                    ],
                    [
                        3.1622776601683795, 2.23606797749979,
                        1.4142135623730951, 1, 1.4142135623730951,
                    ],
                    [3, 2, 1, 0, 1],
                    [
                        3.1622776601683795, 2.23606797749979,
                        1.4142135623730951, 1, 1.4142135623730951,
                    ],
                ],
                [
                    [
                        5, 4.242640687119285, 3.605551275463989,
                        3.1622776601683795, 3,
                    ],
                    [
                        4.47213595499958, 3.605551275463989, 2.8284271247461903,
                        2.23606797749979, 2,
                    ],
                    [
                        4.123105625617661, 3.1622776601683795, 2.23606797749979,
                        1.4142135623730951, 1,
                    ],
                    [4, 3, 2, 1, 0],
                    [
                        4.123105625617661, 3.1622776601683795, 2.23606797749979,
                        1.4142135623730951, 1,
                    ],
                ],
            ],
            [
                [
                    [
                        4, 4.123105625617661, 4.47213595499958, 5,
                        5.656854249492381,
                    ],
                    [
                        3, 3.1622776601683795, 3.605551275463989,
                        4.242640687119285, 5,
                    ],
                    [
                        2, 2.23606797749979, 2.8284271247461903,
                        3.605551275463989, 4.47213595499958,
                    ],
                    [
                        1, 1.4142135623730951, 2.23606797749979,
                        3.1622776601683795, 4.123105625617661,
                    ],
                    [0, 1, 2, 3, 4],
                ],
                [
                    [
                        4.123105625617661, 4, 4.123105625617661,
                        4.47213595499958, 5,
                    ],
                    [
                        3.1622776601683795, 3, 3.1622776601683795,
                        3.605551275463989, 4.242640687119285,
                    ],
                    [
                        2.23606797749979, 2, 2.23606797749979,
                        2.8284271247461903, 3.605551275463989,
                    ],
                    [
                        1.4142135623730951, 1, 1.4142135623730951,
                        2.23606797749979, 3.1622776601683795,
                    ],
                    [1, 0, 1, 2, 3],
                ],
                [
                    [
                        4.47213595499958, 4.123105625617661, 4,
                        4.123105625617661, 4.47213595499958,
                    ],
                    [
                        3.605551275463989, 3.1622776601683795, 3,
                        3.1622776601683795, 3.605551275463989,
                    ],
                    [
                        2.8284271247461903, 2.23606797749979, 2,
                        2.23606797749979, 2.8284271247461903,
                    ],
                    [
                        2.23606797749979, 1.4142135623730951, 1,
                        1.4142135623730951, 2.23606797749979,
                    ],
                    [2, 1, 0, 1, 2],
                ],
                [
                    [
                        5, 4.47213595499958, 4.123105625617661, 4,
                        4.123105625617661,
                    ],
                    [
                        4.242640687119285, 3.605551275463989,
                        3.1622776601683795, 3, 3.1622776601683795,
                    ],
                    [
                        3.605551275463989, 2.8284271247461903, 2.23606797749979,
                        2, 2.23606797749979,
                    ],
                    [
                        3.1622776601683795, 2.23606797749979,
                        1.4142135623730951, 1, 1.4142135623730951,
                    ],
                    [3, 2, 1, 0, 1],
                ],
                [
                    [
                        5.656854249492381, 5, 4.47213595499958,
                        4.123105625617661, 4,
                    ],
                    [
                        5, 4.242640687119285, 3.605551275463989,
                        3.1622776601683795, 3,
                    ],
                    [
                        4.47213595499958, 3.605551275463989, 2.8284271247461903,
                        2.23606797749979, 2,
                    ],
                    [
                        4.123105625617661, 3.1622776601683795, 2.23606797749979,
                        1.4142135623730951, 1,
                    ],
                    [4, 3, 2, 1, 0],
                ],
            ],
        ]);
    });

    it("test get minimum distance", () => {
        const column = 1,
            row = 3;
        const result = GridDistanceMatrix(column, row);

        expect(result).toEqual([[[[0, 1, 2]], [[1, 0, 1]], [[2, 1, 0]]]]);
    });
});
