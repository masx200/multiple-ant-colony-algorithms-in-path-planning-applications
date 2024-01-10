import { beforeEach, describe, expect, it, test } from "vitest";

import { GridMap } from "./grid-map";

describe("GridMap", () => {
    it("should correctly identify if a cell is an obstacle", () => {
        const grid = new GridMap(5, 5);
        grid.setObstacle(1, 1);

        expect(grid.isObstacle(1, 1)).toBe(true);
        expect(grid.isObstacle(0, 0)).toBe(false);
    });

    it("should correctly identify if a cell is free", () => {
        const grid = new GridMap(5, 5);
        grid.setFree(1, 1);

        expect(grid.isFree(1, 1)).toBe(true);
        expect(grid.isFree(0, 0)).toBe(true);
    });

    it("should correctly set a cell as free", () => {
        const grid = new GridMap(5, 5);
        grid.setFree(1, 1);

        expect(grid.isFree(1, 1)).toBe(true);
    });

    it("should correctly set a cell as an obstacle", () => {
        const grid = new GridMap(5, 5);
        grid.setObstacle(1, 1);

        expect(grid.isObstacle(1, 1)).toBe(true);
    });
});
describe("GridMap", () => {
    test("test isObstacle method", () => {
        const grid = new GridMap(5, 4);

        // Set cell at (1, 1) as obstacle
        grid.setObstacle(1, 1);

        // Check whether the cell at (1, 1) is an obstacle
        expect(grid.isObstacle(1, 1)).toBeTruthy();

        // Check whether other cells are not obstacles
        expect(grid.isObstacle(0, 1)).toBeFalsy();
        expect(grid.isObstacle(2, 3)).toBeFalsy();
        expect(grid.isObstacle(4, 0)).toBeFalsy();
    });

    test("test isFree method", () => {
        const grid = new GridMap(5, 4);

        // Set cell at (1, 1) as obstacle
        grid.setObstacle(1, 1);

        // Check whether the cell at (1, 1) is not free
        expect(grid.isFree(1, 1)).toBeFalsy();

        // Check whether other cells are free
        expect(grid.isFree(0, 1)).toBeTruthy();
        expect(grid.isFree(2, 3)).toBeTruthy();
    });
});

describe("GridMap class", () => {
    it("should correctly set and get free cells", () => {
        const grid = new GridMap(10, 10);
        grid.setFree(1, 1);
        expect(grid.isFree(1, 1)).toBeTruthy();
    });

    it("should correctly set and get obstacles", () => {
        const grid = new GridMap(10, 10);
        grid.setObstacle(1, 1);
        expect(grid.isObstacle(1, 1)).toBeTruthy();
    });

    it("should correctly handle cell out of bounds", () => {
        const grid = new GridMap(10, 10);
        expect(() => grid.setFree(100, 100)).toThrow();
        expect(() => grid.setObstacle(100, 100)).toThrow();
        expect(() => grid.isObstacle(100, 100)).toThrow();
        expect(() => grid.isFree(100, 100)).toThrow();
    });
});

describe("GridMap", () => {
    let gridMap: GridMap;

    beforeEach(() => {
        gridMap = new GridMap(5, 5);
    });

    it("should be able to check if a cell is an obstacle", () => {
        gridMap.setObstacle(2, 2);
        expect(gridMap.isObstacle(2, 2)).toBe(true);
        expect(gridMap.isObstacle(1, 1)).toBe(false);
    });

    it("should be able to check if a cell is free", () => {
        gridMap.setFree(3, 3);
        expect(gridMap.isFree(3, 3)).toBe(true);
        expect(gridMap.isFree(1, 1)).toBe(true);
    });

    it("should be able to set a cell as free", () => {
        gridMap.setFree(4, 4);
        expect(gridMap.isFree(4, 4)).toBe(true);
        gridMap.setFree(4, 4);
        expect(gridMap.isFree(4, 4)).toBe(true);
    });

    it("should be able to set a cell as an obstacle", () => {
        gridMap.setObstacle(0, 0);
        expect(gridMap.isObstacle(0, 0)).toBe(true);
        gridMap.setObstacle(0, 0);
        expect(gridMap.isObstacle(0, 0)).toBe(true);
    });
});

describe("GridMap", () => {
    let gridMap: GridMap;

    beforeEach(() => {
        gridMap = new GridMap(5, 5);
    });

    it("should initialize with default values", () => {
        expect(gridMap.column).toBe(5);
        expect(gridMap.row).toBe(5);
        for (let i = 0; i < gridMap.column; i++) {
            for (let j = 0; j < gridMap.row; j++) {
                expect(gridMap.isFree(i, j)).toBeTruthy();
            }
        }
    });

    it("should return true when cell is obstacle", () => {
        gridMap.setObstacle(2, 3);
        expect(gridMap.isObstacle(2, 3)).toBeTruthy();
        expect(gridMap.isFree(2, 3)).toBeFalsy();
    });

    it("should return false when cell is not obstacle", () => {
        gridMap.setObstacle(2, 3);
        expect(gridMap.isObstacle(3, 4)).toBeFalsy();
        expect(gridMap.isFree(3, 4)).toBeTruthy();
    });

    it("should set cell as free", () => {
        gridMap.setObstacle(2, 3);
        gridMap.setFree(2, 3);
        expect(gridMap.isObstacle(2, 3)).toBeFalsy();
        expect(gridMap.isFree(2, 3)).toBeTruthy();
    });
});

describe("GridMap", () => {
    let gridMap: GridMap;

    beforeEach(() => {
        gridMap = new GridMap(5, 5);
    });

    test("isObstacle should return true when the cell is obstacle", () => {
        gridMap.setObstacle(1, 1);
        expect(gridMap.isObstacle(1, 1)).toBe(true);
    });

    test("isFree should return true when the cell is free", () => {
        expect(gridMap.isFree(0, 0)).toBe(true);
    });

    test("setFree should set the cell to free", () => {
        gridMap.setFree(0, 0);
        expect(gridMap.isFree(0, 0)).toBe(true);
    });

    test("setObstacle should set the cell to obstacle", () => {
        gridMap.setObstacle(0, 0);
        expect(gridMap.isObstacle(0, 0)).toBe(true);
    });
});
