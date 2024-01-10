import { expect, it } from "vitest";

import { generateUniqueStringOfArray } from "../functions/generateUniqueStringOfArray";

it("generateUniqueStringOfArray", () => {
    expect(generateUniqueStringOfArray([{ a: 1, b: 2, c: 3 }, 999])).toBe(
        `[{"a":1,"b":2,"c":3},999]`,
    );
    expect(generateUniqueStringOfArray([{ d: 4, a: 1, b: 2, c: 3 }])).toBe(
        generateUniqueStringOfArray([{ a: 1, b: 2, c: 3, d: 4 }]),
    );
});
