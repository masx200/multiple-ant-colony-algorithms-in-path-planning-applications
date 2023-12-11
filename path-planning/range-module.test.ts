import { assert, describe, expect, test } from "vitest";
import { RangeModule } from "./RangeModule";

describe("RangeModule", () => {
    test("addRange", () => {
        const rangeModule = new RangeModule(10, 20);
        rangeModule.addRange(10, 20);
        rangeModule.removeRange(14, 16);
        assert(rangeModule.queryRange(10, 14));
        assert.isFalse(rangeModule.queryRange(13, 15));
        assert(rangeModule.queryRange(16, 17));
    });
    test("queryRange", () => {
        const rangeModule = new RangeModule(5, 20);
        rangeModule.addRange(5, 15);
        const availableRanges = rangeModule.getAvailableRanges();

        assert.deepEqual([[5, 15]], availableRanges);
        expect(rangeModule.queryRange(5, 15)).toBeTruthy();

        expect(rangeModule.queryRange(6, 8)).toBeTruthy();
        expect(rangeModule.queryRange(17, 20)).toBeFalsy();
    });

    test("getAvailableRanges", () => {
        const rangeModule = new RangeModule(0, 100);
        rangeModule.addRange(10, 20);
        rangeModule.addRange(30, 40);
        const availableRanges = rangeModule.getAvailableRanges();
        expect(availableRanges).toEqual([
            [10, 20],
            [30, 40],
        ]);
    });
});
