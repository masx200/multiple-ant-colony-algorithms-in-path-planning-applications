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
});
