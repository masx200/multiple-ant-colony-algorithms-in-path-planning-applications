import { IntegerRange } from "../cross-points/IntegerRange";
import { total_path_length_of_not_closed_route } from "../functions/closed-total-path-length";
import { creategetdistancebyIndex } from "../functions/creategetdistancebyIndex";
import { getBestRoute_Of_Series_routes_and_lengths } from "../functions/getBestRoute_Of_Series_routes_and_lengths";
import { pickRandomOne } from "../functions/pickRandomOne";
import { get_distance_round } from "../src/set_distance_round";
import { generate_k_opt_not_cycle_routes_limited } from "./generate_k_opt_cycle_routes_limited";

export function Random_K_OPT_full_limited_find_best({
    count_of_nodes,
    route: oldRoute,
    max_results_of_k_opt,
    node_coordinates,
    length: oldLength,
}: {
    count_of_nodes: number;
    route: number[];
    max_results_of_k_opt: number;
    node_coordinates: number[][];
    length: number;
}): { route: number[]; length: number } {
    const routes_of_k_opt: number[][] = Array.from({
        length: max_results_of_k_opt,
    })
        .map(function () {
            const k_range = IntegerRange(2, Math.floor(count_of_nodes / 2));
            return pickRandomOne(
                k_range,
                k_range.map((a) => 1 / a),
            );
        })
        .map((k) =>
            generate_k_opt_not_cycle_routes_limited({
                k: k,
                oldRoute,
                max_results: 1,
            }),
        )
        .flat();
    const routes_and_lengths = routes_of_k_opt
        .map((route) => {
            const length = total_path_length_of_not_closed_route({
                round: get_distance_round(),
                path: route,
                getdistancebyIndex: creategetdistancebyIndex(
                    node_coordinates,
                    get_distance_round(),
                ),
            });
            return { length, route };
        })
        .filter((a) => a.length !== oldLength);
    const { route: best_route_of_k_opt, length: best_length_of_k_opt } =
        routes_and_lengths.length
            ? getBestRoute_Of_Series_routes_and_lengths(routes_and_lengths)
            : { route: oldRoute, length: oldLength };
    const route = best_route_of_k_opt;
    const length = best_length_of_k_opt;
    return { route, length };
}
