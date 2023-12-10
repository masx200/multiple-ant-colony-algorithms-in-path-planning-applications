import { test } from "vitest";
import { RangeModule } from "./RangeModule";
import { assert } from "vitest";

test("RangeModule", () => {
    const rangeModule = new RangeModule(10, 40);
    rangeModule.addRange(10, 20);
    console.log(JSON.stringify(rangeModule));
    let availableRanges = rangeModule.getAvailableRanges();
    console.log(availableRanges); // 输出 [[10, 20]]
    assert.deepEqual(availableRanges, [[10, 20]]);
    // debugger;
    rangeModule.addRange(30, 40);
    console.log(JSON.stringify(rangeModule));
    availableRanges = rangeModule.getAvailableRanges();
    console.log(availableRanges); // 输出 [[10, 20], [30, 40]]
    assert.deepEqual(availableRanges, [
        [10, 20],
        [30, 40],
    ]);
    // debugger;
    rangeModule.removeRange(25, 35);
    console.log(JSON.stringify(rangeModule));
    availableRanges = rangeModule.getAvailableRanges();
    console.log(availableRanges); // 输出 [[10, 20], [35, 40]]
    assert.deepEqual(availableRanges, [
        [10, 20],
        [35, 40],
    ]);
});
