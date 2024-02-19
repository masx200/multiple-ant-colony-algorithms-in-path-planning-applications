import { MatrixSymmetry } from "@masx200/sparse-2d-matrix";
import { sum } from "lodash-es";
import { calc_population_relative_information_entropy } from "../functions/calc_population-relative-information-entropy";
import { similarityOfMultipleRoutes } from "../similarity/similarityOfMultipleRoutes";
import { createSmoothPheromones } from "./createSmoothPheromones";
import { run_local_optimization } from "./run_local_optimization";
import { COMMON_DataOfOneIteration } from "./tsp-interface";
import { visibleGridsMatrixCallBack } from "../path-planning/visibleGridsMatrixCallBack";
// import { getGridDistance } from "../path-planning/getGridDistance";

/**
 * Process iteration data
 * @param {Object} options - options for processing iteration data
 */
export async function Process_iteration_data({
    routes_and_lengths_of_one_iteration,
    get_best_route,
    get_best_length,
    count_of_nodes,
    max_segments_of_cross_point,
    distance_round,
    max_results_of_k_opt,
    node_coordinates,
    max_results_of_k_exchange,
    max_results_of_2_opt,
    visibleGridsMatrix,
    set_global_best,
    onRouteCreated,
    global_pheromone_update,
    Intra_population_similarity,
    route_selection_parameters_Q0,
    path_selection_parameter_q0_min,
    path_selection_parameter_q0_max,
    High_similarity_threshold,
    getCountOfIterations,
    Period_of_judgment_similarity,
    pheromoneStore,
    global_optimal_routes,
    Coefficient_of_the_minimum_after_pheromone_weakening,
    time_ms_of_one_iteration,
    total_time_ms,
    delta_data_of_iterations,
    set_Intra_population_similarity,
    set_route_selection_parameters_Q0,
    set_time_ms_of_one_iteration,
    set_total_time_ms,
    getGridDistance,
}: {
    getGridDistance: (a: [number, number], b: [number, number]) => number;
    routes_and_lengths_of_one_iteration: {
        route: number[];
        length: number;
        time_ms: number;
    }[];
    get_best_route: () => number[];
    get_best_length: () => number;
    count_of_nodes: number;
    max_segments_of_cross_point: number;
    distance_round: boolean;
    max_results_of_k_opt: number;
    node_coordinates: number[][];
    max_results_of_k_exchange: number;
    max_results_of_2_opt: number;
    visibleGridsMatrix: visibleGridsMatrixCallBack;
    set_global_best: (route: number[], length: number) => void;
    onRouteCreated: (route: number[], length: number) => void;
    global_pheromone_update: (iterate_best_length: number) => void;
    Intra_population_similarity: number;
    route_selection_parameters_Q0: number;
    path_selection_parameter_q0_min: number;
    path_selection_parameter_q0_max: number;
    High_similarity_threshold: number;
    getCountOfIterations: () => number;
    Period_of_judgment_similarity: number;
    pheromoneStore: MatrixSymmetry<number>;
    global_optimal_routes: { route: number[]; length: number }[];
    Coefficient_of_the_minimum_after_pheromone_weakening: number;
    time_ms_of_one_iteration: number;
    total_time_ms: number;
    delta_data_of_iterations: COMMON_DataOfOneIteration[];
    set_Intra_population_similarity: { (arg0: number): void };
    set_route_selection_parameters_Q0: { (arg0: number): void };
    set_time_ms_of_one_iteration: { (arg0: number): void };
    set_total_time_ms: { (arg0: number): void };
}) {
    // Get the optimal route and length of the current iteration
    const {
        time_ms: optimal_time_ms,
        length: optimal_length_of_iteration,
        route: optimal_route_of_iteration,
    } = await run_local_optimization({
        routes_and_lengths_of_one_iteration,
        get_best_route,
        get_best_length,
        count_of_nodes,
        max_segments_of_cross_point,
        distance_round,
        max_results_of_k_opt,
        node_coordinates,
        max_results_of_k_exchange,
        max_results_of_2_opt,
        canStraightReach: visibleGridsMatrix,
        getGridDistance,
    });

    // Calculate the rate of the local optimization route
    let local_optimization_route_rate = 1;
    if (optimal_length_of_iteration < get_best_length()) {
        // console.log(
        //     "local  optimization route success",
        //     optimal_length_of_iteration,
        //     get_best_length(),
        // );
        local_optimization_route_rate =
            get_best_length() / optimal_length_of_iteration;
        set_global_best(
            optimal_route_of_iteration,
            optimal_length_of_iteration,
        );
    } else {
        local_optimization_route_rate = 1;
        // console.log("local  optimization route failure");
    }
    onRouteCreated(optimal_route_of_iteration, optimal_length_of_iteration);

    // Calculate the start time of the current iteration
    const starttime_of_process_iteration = Number(new Date());

    // Get the current routes and iterate best length
    const current_routes = routes_and_lengths_of_one_iteration.map(
        (a) => a.route,
    );
    const iterate_best_length = Math.min(
        ...routes_and_lengths_of_one_iteration.map((a) => a.length),
    );
    global_pheromone_update(iterate_best_length);

    // Calculate the population relative information entropy and average length of the current iteration
    const population_relative_information_entropy =
        calc_population_relative_information_entropy(current_routes);
    const average_length_of_iteration =
        sum(routes_and_lengths_of_one_iteration.map((a) => a.length)) /
        routes_and_lengths_of_one_iteration.length;
    const worst_length_of_iteration = Math.max(
        ...routes_and_lengths_of_one_iteration.map((a) => a.length),
    );

    // Update the Intra_population_similarity and route_selection_parameters_Q0
    Intra_population_similarity = similarityOfMultipleRoutes(
        current_routes,
        get_best_route(),
    );
    route_selection_parameters_Q0 =
        path_selection_parameter_q0_min +
        (path_selection_parameter_q0_max - path_selection_parameter_q0_min) *
            Math.pow(1 - Intra_population_similarity, 3);

    // Check if the Intra_population_similarity is high enough to create smooth pheromones
    const InnerPopulationSimilarityThreshold = High_similarity_threshold;
    if (
        getCountOfIterations() % Period_of_judgment_similarity === 0 &&
        Intra_population_similarity > InnerPopulationSimilarityThreshold
    ) {
        createSmoothPheromones(
            pheromoneStore,
            global_optimal_routes,
            Coefficient_of_the_minimum_after_pheromone_weakening,
        )(Intra_population_similarity);
    }

    // Calculate the end time of the current iteration
    const endtime_of_process_iteration = Number(new Date());

    // Update the time_ms_of_one_iteration and total_time_ms
    time_ms_of_one_iteration +=
        optimal_time_ms +
        endtime_of_process_iteration -
        starttime_of_process_iteration;
    total_time_ms += time_ms_of_one_iteration;

    // Add the current iteration data to the delta_data_of_iterations array
    delta_data_of_iterations.push({
        global_best_length: get_best_length(),
        current_iterations: getCountOfIterations(),
        time_ms_of_one_iteration,
        population_relative_information_entropy,
        average_length_of_iteration,
        worst_length_of_iteration,
        iterate_best_length,
        Intra_population_similarity,
        optimal_length_of_iteration,
        convergence_coefficient: -Infinity,
        random_selection_probability: -Infinity,
        local_optimization_route_rate,
    });

    // Update the Intra_population_similarity, route_selection_parameters_Q0, time_ms_of_one_iteration, and total_time_ms
    set_Intra_population_similarity(Intra_population_similarity);
    set_route_selection_parameters_Q0(route_selection_parameters_Q0);
    set_time_ms_of_one_iteration(time_ms_of_one_iteration);
    set_total_time_ms(total_time_ms);
}
