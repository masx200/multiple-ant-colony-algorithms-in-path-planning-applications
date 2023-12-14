import { describe, expect, test } from "vitest";
import { getAngleRangeOfPointAndSquare1 } from "./getAngleRangeOfPointAndSquare1";
import { formatSmallArcsAngleRange } from "./formatSmallArcsAngleRange";

describe("getAngleRangeOfPointAndSquare1", () => {
    test("case1", () => {
        expect(getAngleRangeOfPointAndSquare1(0, 0, 0, 0)).toEqual([
            [
                2.3818298987140225,

                3.141592653589793,
            ],
            [-3.141592653589793, -2.3818298987140225],
        ]);
        expect(getAngleRangeOfPointAndSquare1(-170, -170, 0, -20)).toEqual(
            formatSmallArcsAngleRange([0.719939819520282, +0.7260195674059486]),
        );
        expect(getAngleRangeOfPointAndSquare1(170, -170, 0, -20)).toEqual(
            formatSmallArcsAngleRange([2.4155730861838447, +2.421652834069511]),
        );
        expect(getAngleRangeOfPointAndSquare1(170, -170, 20, -20)).toEqual(
            formatSmallArcsAngleRange([
                2.3529442307819375, +2.3594447496027526,
            ]),
        );
        expect(getAngleRangeOfPointAndSquare1(170, -170, 20, 20)).toEqual(
            formatSmallArcsAngleRange([2.236249460627981, +2.241923507222746]),
        );
    });

    test("case2", () => {
        expect(getAngleRangeOfPointAndSquare1(0, 0, 20, 20)).toEqual([
            [0.7610127542247297, +0.8097835725701669],
        ]);
        expect(getAngleRangeOfPointAndSquare1(-170, 0, 20, -20)).toEqual(
            formatSmallArcsAngleRange([
                -0.10774625313294735,
                +-0.10202021370158414,
            ]),
        );
        expect(getAngleRangeOfPointAndSquare1(170, 0, 20, -20)).toEqual(
            formatSmallArcsAngleRange([
                -3.0127212179139633,
                +-3.0053412859504536,
            ]),
        );
        expect(getAngleRangeOfPointAndSquare1(170, 0, 20, 20)).toEqual(
            formatSmallArcsAngleRange([
                3.0053412859504536, +3.0127212179139633,
            ]),
        );
        expect(getAngleRangeOfPointAndSquare1(0, 0, 20, 0)).toEqual(
            formatSmallArcsAngleRange([
                -0.025602599046312766, +0.025602599046312766,
            ]),
        );
        expect(getAngleRangeOfPointAndSquare1(0, 0, 0, 20)).toEqual(
            formatSmallArcsAngleRange([
                1.5451937277485839, +1.5963989258412095,
            ]),
        );
        expect(getAngleRangeOfPointAndSquare1(0, 0, -20, 0)).toEqual([
            [+3.1184260672030604, 3.141592653589793],
            [-3.141592653589793, -3.1184260672030604],
        ]);
        expect(getAngleRangeOfPointAndSquare1(0, 0, 0, -20)).toEqual(
            formatSmallArcsAngleRange([
                -1.5963989258412095,
                +-1.5451937277485839,
            ]),
        );
    });
});
