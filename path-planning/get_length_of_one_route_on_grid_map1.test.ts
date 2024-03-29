import { describe, expect, it } from "vitest";

import { get_length_of_one_route_on_grid_map } from "./get_length_of_one_route_on_grid_map";
import { getGridDistance } from "./getGridDistance";
// import { GridDistanceMatrix } from "./Grid-distance-matrix";

describe("get_length_of_one_route_on_grid_map", () => {
    it("should return Infinity if the route is empty", () => {
        const route: [number, number][] = [];
        // const getGridDistance: (
        //     a: [number, number],
        //     b: [number, number],
        // ) => number = [];
        const result = get_length_of_one_route_on_grid_map(
            route,
            getGridDistance,
        );
        expect(result).toBe(Infinity);
    });

    it("should return Infinity if the route has only one point", () => {
        const route: [number, number][] = [[0, 0]];
        // const getGridDistance: (
        //     a: [number, number],
        //     b: [number, number],
        // ) => number = [];
        const result = get_length_of_one_route_on_grid_map(
            route,
            getGridDistance,
        );
        expect(result).toBe(Infinity);
    });

    it("should calculate the length of the route correctly", () => {
        const route: [number, number][] = [
            [0, 0],
            [1, 1],
            [2, 2],
            [4, 2],
            [5, 1],
            [3, 3],
        ];
        // const getGridDistance: (
        //     a: [number, number],
        //     b: [number, number],
        // ) => number = GridDistanceMatrix(6, 4);
        const result = get_length_of_one_route_on_grid_map(
            route,
            getGridDistance,
        );
        expect(result).toBe(9.071067811865476);
    });

    it("should calculate the length of the route correctly", () => {
        const route: [number, number][] = [
            [0, 0],

            [5, 3],
        ];
        // const getGridDistance: (
        //     a: [number, number],
        //     b: [number, number],
        // ) => number = GridDistanceMatrix(6, 4);
        const result = get_length_of_one_route_on_grid_map(
            route,
            getGridDistance,
        );
        expect(result).toBe(5.830951894845301);
    });
});
