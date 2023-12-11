//@ts-ignore
import { runScript } from "https://esm.sh/@masx200/leetcode-class@1.2.7/";
import { assert, test } from "vitest";
import { RangeModule } from "./RangeModule";


test("RangeModule", () => {
    assert.deepEqual(
        [
            null,
            null,
            [[5, 8]],
            false,
            null,
            null,
            null,
            true,
            null,
            true,
            [
                [1, 3],
                [4, 8],
            ],

            null,
            [[1, 3]],
        ],
        runScript(
            [
                "RangeModule",
                "addRange",
                "getAvailableRanges",
                "queryRange",
                "removeRange",
                "removeRange",
                "addRange",
                "queryRange",
                "addRange",
                "queryRange",
                "getAvailableRanges",
                "removeRange",
                "getAvailableRanges",
            ],
            [
                [1, 9,1],
                [5, 8],
                [],
                [3, 4],
                [5, 6],
                [3, 6],
                [1, 3],
                [2, 3],
                [4, 8],
                [2, 3],
                [],
                [4, 9],
                [],
            ],
            RangeModule,
        ),
    );
});
