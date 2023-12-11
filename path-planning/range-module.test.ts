import { assert, describe, expect, test } from "vitest";
import { RangeModule } from "./RangeModule";

describe("RangeModule", () => {
    // test("addRange", () => {
    //     rangeModule.addRange(10, 20);
    //     expect(rangeModule.root.start).toBe(0);
    //     expect(rangeModule.root.end).toBe(100);
    //     expect(rangeModule.root.leftChild?.start).toBe(0);
    //     expect(rangeModule.root.leftChild?.end).toBe(10);
    //     expect(rangeModule.root.rightChild?.start).toBe(20);
    //     expect(rangeModule.root.rightChild?.end).toBe(100);
    // });
    test("queryRange", () => {
        const rangeModule = new RangeModule(0, 100);
        rangeModule.addRange(5, 15);
        const availableRanges = rangeModule.getAvailableRanges();
        // console.log(availableRanges);

        assert.deepEqual([[5, 15]], availableRanges);
        expect(rangeModule.queryRange(5, 15)).toBeTruthy();

        //
        expect(rangeModule.queryRange(6, 8)).toBeTruthy();
        expect(rangeModule.queryRange(17, 20)).toBeFalsy();
    });

    // test("removeRange", () => {
    //     rangeModule.removeRange(20, 25);
    //     expect(rangeModule.root.leftChild?.leftChild?.covered).toBe(1);
    //     expect(rangeModule.root.leftChild?.rightChild?.covered).toBe(0);
    // });
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
