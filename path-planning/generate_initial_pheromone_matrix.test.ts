import { describe, expect, test } from "vitest";

import { generate_initial_pheromone_matrix } from "./generate_initial_pheromone_matrix";
import { GridMap } from "./grid-map";
import { Point } from "./Point";

describe("generate_initial_pheromone_matrix", () => {
    test("正常情况下的地图生成信息素矩阵", () => {
        const grid = new GridMap(5, 5, [
            [0, 0, 0, 0, 0],
            [0, 1, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
        ]);
        const start: Point = { x: 0, y: 0 };
        const end: Point = { x: 4, y: 4 };

        const result = generate_initial_pheromone_matrix(grid, start, end);
        expect(result).toHaveLength(5);
        expect(result[0]).toHaveLength(5);
        // 根据实际实现，验证结果是否符合预期

        // console.log(result);
        expect([
            [
                0.00565685424949238, 0.006666666666666667,
                0.0061803398874989484, 0.005615528128088303, 0.005,
            ],
            [
                0.006666666666666667, 0, 0.005706180408184164,
                0.006324555320336759, 0.005615528128088303,
            ],
            [
                0.0061803398874989484, 0.005706180408184164,
                0.00565685424949238, 0.005706180408184164, 0.005297434189284813,
            ],
            [
                0.005615528128088303, 0.006324555320336759,
                0.005706180408184164, 0.005656854249492381,
                0.005555555555555556,
            ],
            [
                0.005, 0.005615528128088303, 0.005297434189284813,
                0.005555555555555556, 0.00565685424949238,
            ],
        ]).toEqual(result);
    });

    test("起点在障碍物上时抛出错误", () => {
        const grid = new GridMap(3, 3, [
            [1, 0, 0],
            [0, 0, 0],
            [0, 0, 0],
        ]);
        const start: Point = { x: 0, y: 0 };
        const end: Point = { x: 2, y: 2 };

        expect(() =>
            generate_initial_pheromone_matrix(grid, start, end),
        ).toThrow();
    });

    test("终点在障碍物上时抛出错误", () => {
        const grid = new GridMap(3, 3, [
            [0, 0, 0],
            [0, 0, 0],
            [1, 0, 1],
        ]);
        const start: Point = { x: 0, y: 0 };
        const end: Point = { x: 2, y: 2 };

        expect(() =>
            generate_initial_pheromone_matrix(grid, start, end),
        ).toThrow();
    });

    // 更多测试用例...
});
