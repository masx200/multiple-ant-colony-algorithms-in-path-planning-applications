import assert from "assert";
import { describe, expect, it } from "vitest";
import { Float64areEqual } from "./Float64areEqual";

describe("Float64areEqual", () => {
    it("should return true when two numbers are equal", () => {
        expect(Float64areEqual(1, 1)).toBe(true);
        expect(Float64areEqual(-1.2345, -1.2345)).toBe(true);
        expect(Float64areEqual(0, 0)).toBe(true);
        expect(Float64areEqual(Number.MAX_VALUE, Number.MAX_VALUE)).toBe(true);
    });

    it("should return false when two numbers are not equal", () => {
        expect(Float64areEqual(1, 2)).toBe(false);
        expect(Float64areEqual(1.2345, 1.2346)).toBe(false);
        expect(Float64areEqual(1, -1)).toBe(false);
        expect(Float64areEqual(0, -0)).toBe(true);
    });

    it("should handle NaN values correctly", () => {
        expect(Float64areEqual(NaN, NaN)).toBe(false);
        expect(Float64areEqual(NaN, 1)).toBe(false);
        expect(Float64areEqual(1, NaN)).toBe(false);
    });

    it("should handle very small differences correctly", () => {
        const threshold = Number.EPSILON;
        const a = 1 + threshold / 2;
        const b = 1 + threshold / 3;
        const c = 1 + threshold;
        expect(a).toBe(b);
        expect(Float64areEqual(a, b)).toBe(true);

        assert.notEqual(a, c);

        assert(Float64areEqual(a, c));
    });
});
