import { describe, expect, it } from "vitest";
import { getAngle } from "./getAngle";

describe("getAngle", () => {
    it("should return the correct angle in radians", () => {
        const vec1 = { x: 1, y: 0 };
        expect(getAngle(vec1)).toBe(0);

        const vec2 = { x: 0, y: 1 };
        expect(getAngle(vec2)).toBe(Math.PI / 2);

        const vec3 = { x: -1, y: 0 };
        expect(getAngle(vec3)).toBe(Math.PI);

        const vec4 = { x: 0, y: -1 };
        expect(getAngle(vec4)).toBe(-Math.PI / 2);

        const vec5 = { x: 7, y: 24 };
        expect(getAngle(vec5)).toBe(Math.atan2(24, 7));
    });
});
