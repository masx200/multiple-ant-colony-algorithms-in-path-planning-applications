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

    // it('should throw error with invalid x', () => {
    //     const num1 = 'invalid';
    //     const num2 = 12;
    //     expect(() => new Point(num1, num2)).toThrowError(TypeError);
    // });

    // it('should throw error with invalid y', () => {
    //     const num1 = 53;
    //     const num2 = 'invalid';
    //     expect(() => new Point(num1, num2)).toThrowError(TypeError);
    // });
});
