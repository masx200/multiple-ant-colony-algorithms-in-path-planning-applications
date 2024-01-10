import { describe, expect, it } from "vitest";

import { formatSmallArcsAngleRange } from "./formatSmallArcsAngleRange";

describe("formatSmallArcsAngleRange", () => {
    it("should return the correct format for angles range", () => {
        const angles = [0, Math.PI / 2, Math.PI, (3 * Math.PI) / 2];
        const result = formatSmallArcsAngleRange(angles);
        expect(result).toEqual([
            [+1.5707963267948966, 3.141592653589793],
            [+-3.141592653589793, +-3.141592653589793],
        ]);
    });

    it("should return the correct format for angles range when range is smaller than PI", () => {
        const angles = [0, Math.PI / 4, Math.PI / 2];
        const result = formatSmallArcsAngleRange(angles);
        expect(result).toEqual([[0, +1.5707963267948966]]);
    });
});
