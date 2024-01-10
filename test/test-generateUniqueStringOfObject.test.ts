import { expect, it } from "vitest";

import { generateUniqueStringOfObject } from "../functions/generateUniqueStringOfObject";

it("generateUniqueStringOfObject", () => {
    expect(generateUniqueStringOfObject({ a: 1, b: 2, c: 3 })).toBe(
        `{"a":1,"b":2,"c":3}`,
    );
    expect(generateUniqueStringOfObject({ d: 4, a: 1, b: 2, c: 3 })).toBe(
        generateUniqueStringOfObject({ a: 1, b: 2, c: 3, d: 4 }),
    );
});
