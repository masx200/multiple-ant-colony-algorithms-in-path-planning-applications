import { assert, describe, expect, test } from "vitest";
import { RangeModule } from "./RangeModule";

describe("RangeModule", () => {
    test("addRange", () => {
        //     rangeModule.addRange(10, 20);
        //     expect(rangeModule.root.start).toBe(0);
        //     expect(rangeModule.root.end).toBe(100);
        //     expect(rangeModule.root.leftChild?.start).toBe(0);
        //     expect(rangeModule.root.leftChild?.end).toBe(10);
        //     expect(rangeModule.root.rightChild?.start).toBe(20);
        //     expect(rangeModule.root.rightChild?.end).toBe(100);
        const rangeModule = new RangeModule(10, 20);
        rangeModule.addRange(10, 20);
        rangeModule.removeRange(14, 16);
        assert(rangeModule.queryRange(10, 14)); // 返回 true （区间 [10, 14) 中的每个数都正在被跟踪）
        assert.isFalse(rangeModule.queryRange(13, 15)); //返回 false（未跟踪区间 [13, 15) 中像 14, 14.03, 14.17 这样的数字）
        assert(rangeModule.queryRange(16, 17)); //返回 true （尽管执行了删除操作，区间 [16, 17) 中的数字 16 仍然会被跟踪）
    });
    test("queryRange", () => {
        const rangeModule = new RangeModule(5, 20);
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
