//@ts-ignore
import { runScript } from "https://esm.sh/@masx200/leetcode-class@1.2.7/";
import { assert, describe, expect, test } from "vitest";
import { RangeModule } from "./RangeModule";

describe("RangeModule", () => {
    test("queryRange", () => {
        const rangeModule = new RangeModule(5, 20);
        rangeModule.addRange(5, 15);
        const availableRanges = rangeModule.getAvailableRanges();

        assert.deepEqual([[5, 15]], availableRanges);
        expect(rangeModule.queryRange(6, 8)).toBeTruthy();

        expect(rangeModule.queryRange(5, 15)).toBeTruthy();

        expect(rangeModule.queryRange(17, 20)).toBeFalsy();
    });
});
