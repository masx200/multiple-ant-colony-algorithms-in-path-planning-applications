import { uniqBy } from "lodash-es";

import { assert_true } from "../test/assert_true";
import { calc_population_relative_information_entropy } from "./calc_population-relative-information-entropy";
import { getBestRoute_Of_Series_routes_and_lengths } from "./getBestRoute_Of_Series_routes_and_lengths";
import { local_optimization_route_thread } from "./local_optimization_route_thread";
import { NodeCoordinates } from "./NodeCoordinates";
import { SharedOptions } from "./SharedOptions";

export async function EachIterationHandler(
    options: SharedOptions & {
        routes_and_lengths: {
            route: number[];
            length: number;
        }[];

        getBestRoute: () => number[];
        getBestLength: () => number;
        node_coordinates: NodeCoordinates;
    }
): Promise<{
    iterate_best_length: number;
    coefficient_of_diversity_increase: number;

    optimal_length_of_iteration: number;
    optimal_route_of_iteration: number[];

    population_relative_information_entropy: number;
    time_ms: number;
    iterate_best_route: number[];
}> {
    const starttime_of_process_iteration = Number(new Date());
    const {
        set_global_best,
        distance_round,
        routes_and_lengths,
        getBestLength,
        getBestRoute,
        count_of_nodes,
        max_segments_of_cross_point,
        max_results_of_k_opt,
        node_coordinates,
        max_results_of_k_exchange,
        max_results_of_2_opt,
    } = options;
    const routes = routes_and_lengths.map(({ route }) => route);

    const current_population_relative_information_entropy =
        calc_population_relative_information_entropy(routes);

    const coefficient_of_diversity_increase = Math.sqrt(
        1 - Math.pow(current_population_relative_information_entropy, 2)
    );

    assert_true(!Number.isNaN(current_population_relative_information_entropy));

    const iterate_best_lengthandroute =
        getBestRoute_Of_Series_routes_and_lengths(routes_and_lengths);

    const iterate_best_length = iterate_best_lengthandroute.length;
    const iterate_best_route = iterate_best_lengthandroute.route;
    const endtime_of_process_iteration = Number(new Date());

    const best_half_routes = Array.from(routes_and_lengths)
        .sort((a, b) => a.length - b.length)
        .slice(0, routes_and_lengths.length / 2);
    const need_to_optimization_routes_and_lengths = uniqBy(
        [
            { route: getBestRoute(), length: getBestLength() },
            ...best_half_routes,
        ],
        (a) => a.length
    );

    const optimization_results = await local_optimization_route_thread({
        count_of_nodes,
        max_segments_of_cross_point,
        distance_round,
        max_results_of_k_opt,
        node_coordinates,
        max_results_of_k_exchange,
        max_results_of_2_opt,
        routes_and_lengths: need_to_optimization_routes_and_lengths,
    });

    const optimal_route_of_iteration = optimization_results.route;
    const optimal_length_of_iteration = optimization_results.length;
    const optimal_time_ms = optimization_results.time_ms;
    if (optimal_length_of_iteration < getBestLength()) {
        set_global_best(
            optimal_route_of_iteration,
            optimal_length_of_iteration
        );
    }

    const timems_of_process_iteration =
        endtime_of_process_iteration -
        starttime_of_process_iteration +
        optimal_time_ms;
    return {
        time_ms: timems_of_process_iteration,
        coefficient_of_diversity_increase,
        optimal_length_of_iteration,
        optimal_route_of_iteration,
        iterate_best_length,
        iterate_best_route,

        population_relative_information_entropy:
            current_population_relative_information_entropy,
    };
}
