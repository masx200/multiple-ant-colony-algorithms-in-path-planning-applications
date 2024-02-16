import { it, expect, describe } from "vitest";
import { convert_grid_route_to_every_Passed_node } from "./convert_grid_route_to_every_Passed_node";

describe("convert_grid_route_to_every_Passed_node", () => {
    it("should return an array of nodes", () => {
        const route: [number, number][] = [
            [0, 0],
            [1, 1],
            [2, 2],
        ];
        const result = convert_grid_route_to_every_Passed_node(route);
        expect(result).toEqual([
            [0, 0],
            [1, 1],
            [2, 2],
        ]);
    });

    it("should return an empty array for an empty route", () => {
        const route: [number, number][] = [];
        const result = convert_grid_route_to_every_Passed_node(route);
        expect(result).toEqual([]);
    });

    it("should return an array of nodes for a route with multiple segments", () => {
        const route: [number, number][] = [
            [0, 0],
            [1, 1],
            [2, 2],
            [3, 3],
        ];
        const result = convert_grid_route_to_every_Passed_node(route);
        expect(result).toEqual([
            [0, 0],
            [1, 1],
            [2, 2],
            [3, 3],
        ]);
    });
    it("should return an array of nodes for a route with multiple segments", () => {
        const route: [number, number][] = [
            [0, 0],

            [3, 3],
        ];
        const result = convert_grid_route_to_every_Passed_node(route);
        expect(result).toEqual([
            [0, 0],
            [1, 1],
            [2, 2],
            [3, 3],
        ]);
    });
    it("should return an array of nodes for a route with multiple segments", () => {
        const route: [number, number][] = [
            [0, 0],

            [0, 3],
        ];
        const result = convert_grid_route_to_every_Passed_node(route);
        expect(result).toEqual([
            [0, 0],
            [0, 1],
            [0, 2],
            [0, 3],
        ]);
    });
    it("should return an array of nodes for a route with multiple segments", () => {
        const route: [number, number][] = [
            [1, 21],
            [10, 5],
            [11, 2],
            [12, 1],
            [14, 1],
            [15, 1],
            [16, 1],
            [17, 1],
            [20, 1],
            [21, 1],
            [22, 1],
        ];
        const result = convert_grid_route_to_every_Passed_node(route);
        // console.log(result);
        expect(result).toEqual([
            [1, 21],
            [2, 20],
            [2, 19],
            [3, 18],
            [3, 17],
            [4, 16],
            [4, 15],
            [5, 14],
            [6, 13],
            [6, 12],
            [7, 11],
            [7, 10],
            [8, 9],
            [8, 8],
            [9, 7],
            [9, 6],
            [10, 5],
            [10, 4],
            [11, 3],
            [11, 2],
            [12, 1],
            [13, 1],
            [14, 1],
            [15, 1],
            [16, 1],
            [17, 1],
            [18, 1],
            [19, 1],
            [20, 1],
            [21, 1],
            [22, 1],
        ]);
    });
});
