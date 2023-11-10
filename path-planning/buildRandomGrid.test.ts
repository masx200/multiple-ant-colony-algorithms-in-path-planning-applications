import { describe, expect, it, test } from "vitest";
import { buildRandomGrid } from "./buildRandomGrid";

describe("buildRandomGrid function", () => {
    it("should create a grid with all free cells", () => {
        const column = 50;
        const row = 5;
        const grid = buildRandomGrid(column, row, 0);
        for (let i = 0; i < column; i++) {
            for (let j = 0; j < row; j++) {
                expect(grid.isObstacle(i, j)).toBeFalsy();
                expect(grid.isFree(i, j)).toBeTruthy();
            }
        }
    });

    it("should create a grid with obstacles", () => {
        const column = 500;
        const row = 100;
        const ObstacleProbability = 0.5;
        const grid = buildRandomGrid(column, row, ObstacleProbability);
        let obstaclesCount = 0;
        for (let i = 0; i < column; i++) {
            for (let j = 0; j < row; j++) {
                if (grid.isObstacle(i, j)) {
                    obstaclesCount++;
                }
            }
        }
        expect(obstaclesCount / (column * row)).toBeCloseTo(
            Math.round(column * row * ObstacleProbability) / (column * row),
            1
        );
    });
});

describe("buildRandomGrid", () => {
    it("should create a grid with the correct dimensions", () => {
        const grid = buildRandomGrid(5, 40, 0.3);

        expect(grid.column).toBe(5);
        expect(grid.row).toBe(40);
    });

    it("should place obstacles on the grid based on the probability given", () => {
        const grid = buildRandomGrid(500, 40, 0.7);

        let obstacleCount = 0;

        for (let i = 0; i < grid.column; i++) {
            for (let j = 0; j < grid.row; j++) {
                if (grid.isObstacle(i, j)) {
                    obstacleCount++;
                }
            }
        }

        expect(obstacleCount / (grid.column * grid.row)).toBeCloseTo(0.7, 1);
    });

    it("should place free cells on the grid when there are no obstacles", () => {
        const grid = buildRandomGrid(50, 400, 0.1);

        let freeCellCount = 0;

        for (let i = 0; i < grid.column; i++) {
            for (let j = 0; j < grid.row; j++) {
                if (grid.isFree(i, j)) {
                    freeCellCount++;
                }
            }
        }

        expect(freeCellCount / (grid.column * grid.row)).toBeCloseTo(0.9, 1);
    });
});
describe("buildRandomGrid", () => {
    test("create a grid with specified column and row", () => {
        const grid = buildRandomGrid(50, 4, 0.5);

        expect(grid.column).toBe(50);
        expect(grid.row).toBe(4);
    });

    test("set some cells as obstacle according to the probability", () => {
        const grid = buildRandomGrid(50, 400, 0.2);

        let obstacleCount = 0;

        for (let i = 0; i < grid.column; i++) {
            for (let j = 0; j < grid.row; j++) {
                if (grid.isObstacle(i, j)) {
                    obstacleCount++;
                }
            }
        }

        //    expect(obstacleCount).toBeGreaterThanOrEqual(1); // 至少有一个障碍物
        expect(obstacleCount / (grid.column * grid.row)).toBeCloseTo(0.2, 1); // 没有过多的障碍物
    });

    test("set other cells as free", () => {
        const grid = buildRandomGrid(90, 400, 0.2);

        let freeCellCount = 0;

        for (let i = 0; i < grid.column; i++) {
            for (let j = 0; j < grid.row; j++) {
                if (grid.isFree(i, j)) {
                    freeCellCount++;
                }
            }
        }

        //expect(freeCellCount).toBeGreaterThan(1); // 至少有一个自由细胞
        expect(freeCellCount / (grid.column * grid.row)).toBeCloseTo(0.8, 1); // 没有过少的自由细胞
    });
});
