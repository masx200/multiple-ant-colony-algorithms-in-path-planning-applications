import { describe, expect, it } from "vitest";

import { Point } from "./Point";

describe("Test constructor", () => {
    it("should create an instance with x and y", () => {
        const num1 = 53;
        const num2 = 12;
        const point = new Point(num1, num2);
        expect(point.x).toEqual(num1);
        expect(point.y).toEqual(num2);
    });

    it("should create an instance with default constructor", () => {
        const point = new Point(0, 0);
        expect(point.x).toEqual(0);
        expect(point.y).toEqual(0);
    });
});
