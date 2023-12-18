import { assert } from "chai";
import { describe, expect, test } from "vitest";
import { generate_initial_pheromone_matrix } from "./generate_initial_pheromone_matrix";
import { GridMap } from "./grid-map";
import { Point } from "./Point";

describe("generate_initial_pheromone_matrix", () => {
    // ...之前的测试用例...
    test("起点或终点在地图范围外时抛出错误", () => {
        const grid = new GridMap(3, 3, [
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0],
        ]);
        const start: Point = { x: -1, y: 0 };
        const end: Point = { x: 2, y: 2 };

        expect(() =>
            generate_initial_pheromone_matrix(grid, start, end),
        ).toThrow();

        const start2: Point = { x: 0, y: 0 };
        const end2: Point = { x: 4, y: 2 };

        expect(() =>
            generate_initial_pheromone_matrix(grid, start2, end2),
        ).toThrow();
    });

    test("起始点和结束点相同时，信息素矩阵为零", () => {
        const grid = new GridMap(3, 3, [
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0],
        ]);
        const start: Point = { x: 0, y: 0 };
        const end: Point = { x: 0, y: 0 };
        expect(() => {
            const result = generate_initial_pheromone_matrix(grid, start, end);
            console.log(result);
            expect(result[0][0]).toBe(0);
        }).toThrow();
    });

    test("起始点和结束点在同一条直线上时，信息素矩阵为一维数组", () => {
        const grid = new GridMap(3, 3, [
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0],
        ]);
        const start: Point = { x: 0, y: 0 };
        const end: Point = { x: 2, y: 0 };

        const result = generate_initial_pheromone_matrix(grid, start, end);
        assert.deepEqual(
            [
                [0.05555555555555555, 0.03433522159721638, 0.02301186457628306],
                [
                    0.05555555555555555, 0.039283710065919304,
                    0.02484519974999766,
                ],
                [0.05555555555555555, 0.03433522159721638, 0.02301186457628306],
            ],
            result,
        );
        // console.log(result);
        // expect(result).toHaveLength(3);
        // expect(result[0]).toBeInstanceOf(Array);
        // expect(result[1]).toBeUndefined();
        // expect(result[2]).toBeUndefined();
    });

    test("地图中只有障碍物时，信息素矩阵为空数组", () => {
        const grid = new GridMap(3, 3, [
            [1, 1, 1],
            [1, 1, 1],
            [1, 1, 1],
        ]);
        const start: Point = { x: 0, y: 0 };
        const end: Point = { x: 2, y: 2 };
        expect(() => {
            const result = generate_initial_pheromone_matrix(grid, start, end);
            console.log(result);
            expect(result).toEqual([]);
        }).toThrow();
    });

    test("地图中没有障碍物时，信息素矩阵为全一数组", () => {
        const grid = new GridMap(3, 3, [
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0],
        ]);
        const start: Point = { x: 0, y: 0 };
        const end: Point = { x: 2, y: 2 };

        const result = generate_initial_pheromone_matrix(grid, start, end);
        // console.log(result);
        expect(result).toEqual([
            [0.039283710065919304, +0.03433522159721638, +0.027777777777777776],
            [+0.03433522159721638, +0.039283710065919304, +0.03433522159721638],
            [
                +0.027777777777777776, +0.03433522159721638,
                +0.039283710065919304,
            ],
        ]);
    });
});
