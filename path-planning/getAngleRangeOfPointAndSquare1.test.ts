import { describe, expect, test } from "vitest";
import { getAngleRangeOfPointAndSquare1 } from "./getAngleRangeOfPointAndSquare1";

describe("getAngleRangeOfPointAndSquare1", () => {
    test("case1", () => {
        expect(getAngleRangeOfPointAndSquare1(0, 0, 0, 0)).toEqual([
            2.356194490192345, -2.356194490192345,
        ]);
        expect(getAngleRangeOfPointAndSquare1(-170, -170, 0, -20)).toEqual([
            0.7198671284760682, +0.7260927895371948,
        ]);
        expect(getAngleRangeOfPointAndSquare1(170, -170, 0, -20)).toEqual([
            +2.4154998640525984, +2.4217255251137253,
        ]);
        expect(getAngleRangeOfPointAndSquare1(170, -170, 20, -20)).toEqual([
            2.3528611692046084, +2.3595278111800817,
        ]);
        expect(getAngleRangeOfPointAndSquare1(170, -170, 20, 20)).toEqual([
            +2.2361857196373447, +2.241987751818268,
        ]);
    });

    test("case2", () => {
        expect(getAngleRangeOfPointAndSquare1(0, 0, 20, 20)).toEqual([
            0.7604033697785282, 0.8103929570163685,
        ]);
        expect(getAngleRangeOfPointAndSquare1(-170, 0, 20, -20)).toEqual([
            -0.1077603578983274, -0.10200691791011202,
        ]);
        expect(getAngleRangeOfPointAndSquare1(170, 0, 20, -20)).toEqual([
            -3.0127423889547993, -3.00531878245281,
        ]);
        expect(getAngleRangeOfPointAndSquare1(170, 0, 20, 20)).toEqual([
            3.00531878245281, +3.0127423889547993,
        ]);
        expect(getAngleRangeOfPointAndSquare1(0, 0, 20, 0)).toEqual([
            -0.02563540852167748, +0.02563540852167748,
        ]);
        expect(getAngleRangeOfPointAndSquare1(0, 0, 0, 20)).toEqual([
            1.545160918273219, +1.5964317353165742,
        ]);
        expect(getAngleRangeOfPointAndSquare1(0, 0, -20, 0)).toEqual([
            3.1172072444170746,
            +-3.1172072444170746,
        ]);
        expect(getAngleRangeOfPointAndSquare1(0, 0, 0, -20)).toEqual([
            -1.5964317353165742,
            +-1.545160918273219,
        ]);
    });
});
