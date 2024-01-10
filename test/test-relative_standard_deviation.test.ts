import { expect, it } from "vitest";

import { calc_relative_deviation_from_optimal } from "../functions/calc_relative_deviation_from_optimal";

it("relative_deviation_from_optimal", () => {
    expect(0).toEqual(calc_relative_deviation_from_optimal([1, 1, 1], 1));

    const result1 = calc_relative_deviation_from_optimal([1, 3, 4], 8 / 3);
    expect(result1).toEqual(5 / 12);
});
