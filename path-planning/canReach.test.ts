import { describe, expect, it } from "vitest";
import { canReach } from "./canReach";
import { GridMap } from "./grid-map";


describe("canReach", () => {
    it("should return false when start is on edge of map", () => {
        const start: [number, number] = [0, 3];
        const end: [number, number] = [9, 2];
        const grid = new GridMap(10, 10);

        expect(canReach(start, end, grid)).toBe(true);
    });

    it("should return false when end is on edge of map", () => {
        const start: [number, number] = [0, 3];
        const end: [number, number] = [9, 2];
        const grid = new GridMap(10, 10);
        expect(canReach(start, end, grid)).toBe(true);
    });

    it("should return true when start is on edge of map and end is on edge of map", () => {
        const start: [number, number] = [0, 3];
        const end: [number, number] = [9, 2];
        const grid = new GridMap(10, 10);
        expect(canReach(start, end, grid)).toBe(true);
    });

    it("should return false when start is on edge of map and end is on corner", () => {
        const start: [number, number] = [0, 3];
        const end: [number, number] = [9, 2];
        const grid = new GridMap(10, 10);
        expect(canReach(start, end, grid)).toBe(true);
    });

    it("should return false when start is on corner and end is on edge of map", () => {
        const start: [number, number] = [0, 2];
        const end: [number, number] = [9, 3];
        const grid = new GridMap(10, 10);
        expect(canReach(start, end, grid)).toBe(true);
    });

    it("should return false when start is on corner and end is on corner", () => {
        const start: [number, number] = [0, 2];
        const end: [number, number] = [9, 2];
        const grid = new GridMap(10, 10);
        expect(canReach(start, end, grid)).toBe(true);
    });

    it("should return true when start is on corner and end is on map boundary", () => {
        const start: [number, number] = [0, 2];
        const end: [number, number] = [9, 3];
        const grid = new GridMap(10, 10);
        expect(canReach(start, end, grid)).toBe(true);
    });

    it("should return false when start is on map boundary and end is on edge of map", () => {
        const start: [number, number] = [0, 2];
        const end: [number, number] = [9, 2];
        const grid = new GridMap(10, 10);
        expect(canReach(start, end, grid)).toBe(true);
    });
});
