import { sum } from "lodash-es";

import { assert_true } from "../test/assert_true";
import {
    Cached_hash_table_of_path_lengths_and_path_segments,
    has_Cached_hash_table_of_path_lengths_and_path_segments,
} from "./Cached_hash_table_of_path_lengths_and_path_segments";
import { Infinity_to_max_or_min } from "./Infinity_to_max_or_min";
import { nan_to_zero } from "./nan_to_zero";

export function calc_pheromone_dynamic({
    latest_and_optimal_routes,

    row,
    column,
    greedy_length,
    convergence_coefficient,
    routes_segments_cache,
}: {
    latest_and_optimal_routes: { route: number[]; length: number }[];

    row: number;
    column: number;
    greedy_length: number;
    convergence_coefficient: number;
    routes_segments_cache: Cached_hash_table_of_path_lengths_and_path_segments;
}): number {
    assert_true(latest_and_optimal_routes.length > 0);
    const length_of_routes = latest_and_optimal_routes.length;
    if (row === column) return 0;
    const result =
        sum(
            latest_and_optimal_routes.map(({ length: route_length }) => {
                const a = Math.pow(
                    (3 +
                        Number(
                            has_Cached_hash_table_of_path_lengths_and_path_segments(
                                routes_segments_cache,
                                route_length,
                                row,
                                column,
                            ),
                        )) /
                        4,
                    convergence_coefficient,
                );
                if (a === 0) {
                    return 0;
                }
                const c = 1 - Math.exp(-convergence_coefficient);
                if (c == 0) {
                    return 0;
                }
                const b = Infinity_to_max_or_min(
                    Math.pow(
                        greedy_length / route_length,
                        convergence_coefficient * convergence_coefficient,
                    ),
                );

                const r = c * a * b;
                return nan_to_zero(r);
            }),
        ) / length_of_routes;
    assert_true(!Number.isNaN(result), "pheromone should  be not NaN");
    return result;
}
