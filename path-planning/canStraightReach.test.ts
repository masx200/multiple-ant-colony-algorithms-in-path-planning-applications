import { describe, expect, it } from "vitest";

import { CachedCanStraightReach } from "./canStraightReach";
import { GridMap } from "./grid-map";

describe("canStraightReach", () => {
    it("should return false when start is on edge of map", () => {
        const start: [number, number] = [0, 3];
        const end: [number, number] = [9, 2];
        const grid = new GridMap(10, 10);

        expect(CachedCanStraightReach(start, end, grid)).toBe(true);
    });

    it("should return false when end is on edge of map", () => {
        const start: [number, number] = [0, 3];
        const end: [number, number] = [9, 2];
        const grid = new GridMap(10, 10);
        expect(CachedCanStraightReach(start, end, grid)).toBe(true);
    });

    it("should return true when start is on edge of map and end is on edge of map", () => {
        const start: [number, number] = [0, 3];
        const end: [number, number] = [9, 2];
        const grid = new GridMap(10, 10);
        expect(CachedCanStraightReach(start, end, grid)).toBe(true);
    });

    it("should return false when start is on edge of map and end is on corner", () => {
        const start: [number, number] = [0, 3];
        const end: [number, number] = [9, 2];
        const grid = new GridMap(10, 10);
        expect(CachedCanStraightReach(start, end, grid)).toBe(true);
    });

    it("should return false when start is on corner and end is on edge of map", () => {
        const start: [number, number] = [0, 2];
        const end: [number, number] = [9, 3];
        const grid = new GridMap(10, 10);
        expect(CachedCanStraightReach(start, end, grid)).toBe(true);
    });

    it("should return false when start is on corner and end is on corner", () => {
        const start: [number, number] = [0, 2];
        const end: [number, number] = [9, 2];
        const grid = new GridMap(10, 10);
        expect(CachedCanStraightReach(start, end, grid)).toBe(true);
    });

    it("should return true when start is on corner and end is on map boundary", () => {
        const start: [number, number] = [0, 2];
        const end: [number, number] = [9, 3];
        const grid = new GridMap(5, 5);
        expect(CachedCanStraightReach(start, end, grid)).toBe(false);
    });

    it("should return false when start is on map boundary and end is on edge of map", () => {
        const start: [number, number] = [0, 2];
        const end: [number, number] = [9, 2];
        const grid = new GridMap(10, 10);
        expect(CachedCanStraightReach(start, end, grid)).toBe(true);
    });

    it("should return false when start is on map boundary and end is on edge of map", () => {
        const column = 10,
            row = 10;
        const start: [number, number] = [0, 2];
        const end: [number, number] = [9, 2];
        const grid = new GridMap(
            column,
            row,
            Array(column)
                .fill(1)
                .map(() => Array(row).fill(1)),
        );
        expect(CachedCanStraightReach(start, end, grid)).toBe(false);
    });
    it("should return false when start is on map boundary and end is on edge of map", () => {
        const column = 10,
            row = 10;
        const start: [number, number] = [0, 0];
        const end: [number, number] = [9, 9];
        const data = Array(column)
            .fill(1)
            .map(() => Array(row).fill(1));
        for (let index = 0; index < column; index++) {
            data[index][5] = 1;
        }
        const grid = new GridMap(column, row, data);
        expect(CachedCanStraightReach(start, end, grid)).toBe(false);
    });
    it("should return false when start is on map boundary and end is on edge of map", () => {
        const column = 10,
            row = 10;
        const start: [number, number] = [0, 0];
        const end: [number, number] = [9, 9];
        const data = Array(column)
            .fill(1)
            .map(() => Array(row).fill(1));
        for (let index = 0; index < row; index++) {
            data[5][index] = 1;
        }
        const grid = new GridMap(column, row, data);
        expect(CachedCanStraightReach(start, end, grid)).toBe(false);
    });
});
