import { describe, expect, test } from "vitest";
import { isInsideSector } from "./isInsideSector";
import { Point } from "./Point";

describe("isInsideSector", () => {
    test("isInsideSector - case 1", () => {
        const point: Point = { x: 0, y: 0 };
        const center: Point = { x: 1, y: 1 };
        const sectorStart: Point = { x: 0, y: 1 };
        const sectorEnd: Point = { x: 2, y: 0 };
        const min_radius: number = 1;

        expect(
            isInsideSector(point, center, sectorStart, sectorEnd, min_radius)
        ).toBe(true);
    });

    test("isInsideSector - case 2", () => {
        const point: Point = { x: 0, y: 0 };
        const center: Point = { x: 1, y: 1 };
        const sectorStart: Point = { x: 0, y: 1 };
        const sectorEnd: Point = { x: 2, y: 0 };
        const min_radius: number = 2;

        expect(
            isInsideSector(point, center, sectorStart, sectorEnd, min_radius)
        ).toBe(false);
    });
    test("isInsideSector - case 2", () => {
        const point: Point = { x: 1, y: 1 };
        const center: Point = { x: 0, y: 0 };
        const sectorStart: Point = { x: 0, y: 1 };
        const sectorEnd: Point = { x: 2, y: 0 };
        const min_radius: number = 2;

        expect(
            isInsideSector(point, center, sectorStart, sectorEnd, min_radius)
        ).toBe(false);
    });
    test("isInsideSector - case 2", () => {
        const point: Point = { x: 1, y: 1 };
        const center: Point = { x: 0, y: 0 };
        const sectorStart: Point = { x: 0, y: 1 };
        const sectorEnd: Point = { x: 2, y: 0 };
        const min_radius: number = 1;

        expect(
            isInsideSector(point, center, sectorStart, sectorEnd, min_radius)
        ).toBe(false);
    });
    test("isInsideSector - case 3", () => {
        const point: Point = { x: 0, y: 0 };
        const center: Point = { x: 1, y: 1 };
        const sectorStart: Point = { x: 2, y: 0 };
        const sectorEnd: Point = { x: 0, y: 1 };
        const min_radius: number = 1;

        expect(
            isInsideSector(point, center, sectorStart, sectorEnd, min_radius)
        ).toBe(false);
    });
    test("isInsideSector - case 3", () => {
        const point: Point = { x: 1, y: 1 };
        const center: Point = { x: 0, y: 0 };
        const sectorStart: Point = { x: 2, y: 0 };
        const sectorEnd: Point = { x: 0, y: 1 };
        const min_radius: number = 1;

        expect(
            isInsideSector(point, center, sectorStart, sectorEnd, min_radius)
        ).toBe(true);
    });
    test("isInsideSector - case 3", () => {
        const point: Point = { x: 1, y: 1 };
        const center: Point = { x: 0, y: 0 };
        const sectorStart: Point = { x: 2, y: 0 };
        const sectorEnd: Point = { x: 0, y: 1 };
        const min_radius: number = 10;

        expect(
            isInsideSector(point, center, sectorStart, sectorEnd, min_radius)
        ).toBe(false);
    });
    test("isInsideSector - case 4", () => {
        const point: Point = { x: 0, y: 0 };
        const center: Point = { x: 1, y: 1 };
        const sectorStart: Point = { x: 0, y: 1 };
        const sectorEnd: Point = { x: 2, y: 0 };
        const min_radius: number = 0;

        expect(
            isInsideSector(point, center, sectorStart, sectorEnd, min_radius)
        ).toBe(true);
    });
});
