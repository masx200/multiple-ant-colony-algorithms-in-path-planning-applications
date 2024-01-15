import { max, min, uniqBy } from "lodash-es";

import { MatrixSymmetry } from "@masx200/sparse-2d-matrix";

import { not_cycle_route_to_segments } from "../functions/not_cycle_route_to_segments";

export function createSmoothPheromones(
    pheromoneStore: MatrixSymmetry<number>,
    global_optimal_routes: { route: number[] }[],
    Coefficient_of_the_minimum_after_pheromone_weakening: number,
) {
    return function smoothPheromones(similarity: number) {
        const maxValue = max(pheromoneStore.values()) as number;
        const minValue = min(pheromoneStore.values()) as number;
        const averageValue = (maxValue + minValue) / 2;
        const segments = uniqBy(
            global_optimal_routes
                .map(({ route }) => not_cycle_route_to_segments(route))
                .flat(),
            function (a) {
                if (a[0] > a[1]) return JSON.stringify([a[1], a[0]]);
                return JSON.stringify(a);
            },
        );
        const pheromoneMinimum =
            averageValue * Coefficient_of_the_minimum_after_pheromone_weakening;
        for (const [i, j] of segments) {
            const oldValue = pheromoneStore.get(i, j);
            const newValue =
                oldValue + (3 * similarity - 2) * (pheromoneMinimum - oldValue);

            pheromoneStore.set(i, j, newValue);
        }
    };
}
