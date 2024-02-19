import { MatrixFill, MatrixSymmetryCreate } from "@masx200/sparse-2d-matrix";
import { create_collection_of_optimal_routes } from "../collections/collection-of-optimal-routes";
import { DataOfFinishGreedyIteration } from "../functions/DataOfFinishGreedyIteration";
import { create_run_iterations } from "../functions/create_run_iterations";

import {
    not_cycle_route_to_segments,
    // not_cycle_route_to_segments,
} from "../functions/not_cycle_route_to_segments";
import { run_greedy_once_thread_with_time } from "../functions/run_greedy_once_thread_with_time";
// import { select_available_cities_from_optimal_and_latest } from "../functions/select_available_cities_from_optimal_and_latest";
// import { Greedy_algorithm_to_solve_tsp_with_selected_start_pool } from "../src/Greedy_algorithm_to_solve_tsp_with_selected_start_pool";
import { DefaultOptions } from "../src/default_Options";
import { createLatestIterateBestRoutesInPeriod } from "./createLatestIterateBestRoutesInPeriod";
import { createRewardCommonRoutes } from "./createRewardCommonRoutes";
import { createSmoothPheromones } from "./createSmoothPheromones";
import {
    COMMON_DataOfOneIteration,
    COMMON_TSP_EXECUTION,
    COMMON_TSP_Options,
    COMMON_TSP_Output,
} from "./tsp-interface";
// import { GridDistanceMatrix } from "../path-planning/Grid-distance-matrix";
import { GridMapFromArray } from "../path-planning/GridMapFromArray";
// import { VisibleGridsMatrix } from "../path-planning/VisibleGridsMatrix";
// import { getVisibleGridsList } from "../path-planning/getVisibleGridsList";
import { generate_paths_using_state_transition_probabilities_of_grid_map } from "./generate_paths_using_state_transition_probabilities_of_grid_map";
// import { create_get_neighbors_from_optimal_routes_and_latest_routes } from "../functions/create_get_neighbors_from_optimal_routes_and_latest_routes";
import { assignOwnKeys } from "../collections/assignOwnKeys";
import { getGridDistance } from "../path-planning/getGridDistance";
import { CachedGridVisibilityCheckerFactory } from "../path-planning/CachedGridVisibilityCheckerFactory";
import { GridVisibilityChecker } from "../path-planning/GridVisibilityChecker";
import { Process_iteration_data } from "./Process_iteration_data";

/* eslint-disable indent */

export function tsp_similarity_execution_and_local_optimization_with_Optional_city_rewards_and_punishments(
    input: COMMON_TSP_Options,
): COMMON_TSP_EXECUTION {
    const time_of_initialization_start = Date.now();
    function update_latest_and_optimal_routes() {
        assignOwnKeys(
            global_optimal_routes,
            Array.from(collection_of_optimal_routes),
        );
    }
    const options = Object.assign(structuredClone(DefaultOptions), input);
    const { Coefficient_of_the_minimum_after_pheromone_weakening } = options;
    const {
        // max_cities_of_state_transition = DefaultOptions.max_cities_of_state_transition,
        max_size_of_collection_of_optimal_routes =
            DefaultOptions.max_size_of_collection_of_optimal_routes,
        max_results_of_2_opt = DefaultOptions.max_results_of_2_opt,
        max_segments_of_cross_point =
            DefaultOptions.max_segments_of_cross_point,
        max_results_of_k_opt = DefaultOptions.max_results_of_k_opt,
        max_results_of_k_exchange = DefaultOptions.max_results_of_k_exchange,
        count_of_ants = DefaultOptions.count_of_ants,
        node_coordinates,
        distance_round = true,
        local_pheromone_volatilization_coefficient =
            DefaultOptions.local_pheromone_volatilization_coefficient,
        global_pheromone_volatilization_coefficient =
            DefaultOptions.global_pheromone_volatilization_coefficient,
        beta_zero = DefaultOptions.beta_for_the_second_type_of_population,
        alpha_zero = DefaultOptions.alpha_for_the_second_type_of_population,
        path_selection_parameter_q0_max =
            DefaultOptions.path_selection_parameter_q0_max,
        path_selection_parameter_q0_min =
            DefaultOptions.path_selection_parameter_q0_min,
        start,
        end,
        // 显示每次迭代的统计,
    } = options;

    let Intra_population_similarity = 0;
    const data_of_greedy: DataOfFinishGreedyIteration[] = [];
    let route_selection_parameters_Q0 = path_selection_parameter_q0_min;
    const collection_of_optimal_routes = create_collection_of_optimal_routes(
        max_size_of_collection_of_optimal_routes,
    );
    const global_optimal_routes = Array.from(collection_of_optimal_routes);
    // const global_optimal_routes = collection_of_optimal_routes;
    // const neighbors_from_optimal_routes_and_latest_routes = new Map<
    //     number,
    //     number[]
    // >();
    // const neighbors_from_optimal_routes_and_latest_routes =
    //     create_get_neighbors_from_optimal_routes_and_latest_routes(
    //         global_optimal_routes,
    //     );
    // const latest_and_optimal_routes = collection_of_optimal_routes;
    // function update_neighbors_from_optimal_routes() {
    //     const cache = neighbors_from_optimal_routes_and_latest_routes;
    //     cache.clear();
    //     for (const city of node_coordinates.keys()) {
    //         const result = uniq(
    //             latest_and_optimal_routes
    //                 .map(({ route }) => {
    //                     const index = route.findIndex((v) => v === city);

    //                     if (index < 0) {
    //                         throw Error("Incorrect_route_found of city");
    //                     }

    //                     return [
    //                         route.at((index - 1 + route.length) % route.length),
    //                         route.at((index + 1 + route.length) % route.length),
    //                     ].filter((n) => typeof n === "number") as number[];
    //                 })
    //                 .flat(),
    //         );
    //         cache.set(city, result);
    //     }
    // }
    const count_of_nodes = node_coordinates.length * node_coordinates[0].length;
    const pheromoneStore = MatrixSymmetryCreate({ row: count_of_nodes });
    let pheromoneZero = Number.EPSILON;
    let greedy_length = Infinity;
    let total_time_ms = 0;
    function getCountOfIterations() {
        return current_search_count / count_of_ants;
    }

    let current_search_count = 0;
    let time_of_best_ms = 0;
    function set_global_best(route: number[], length: number) {
        if (length < global_best.length) {
            const formatted_route = Array.from(route);

            global_best.length = length;
            global_best.route = formatted_route;
            time_of_best_ms = total_time_ms;
            search_count_of_best = current_search_count + 1;
        }
    }
    let search_count_of_best = 0;
    const global_best: {
        length: number;
        route: number[];
    } = { length: Infinity, route: [] };
    function get_best_route() {
        return global_best.route;
    }

    function get_best_length() {
        return global_best.length;
    }
    function onRouteCreated(route: number[], length: number) {
        if (length < get_best_length()) {
            set_global_best(route, length);
        }

        collection_of_optimal_routes.add(route, length);
    }
    // const data_of_routes: COMMON_dataOfAllIterations[] = [];
    const delta_data_of_iterations: COMMON_DataOfOneIteration[] = [];
    // const get_neighbors_from_optimal_routes_and_latest_routes = function (
    //     current_city: number,
    // ): number[] {
    //     return (
    //         neighbors_from_optimal_routes_and_latest_routes.get(current_city) ||
    //         []
    //     );
    // };
    // const is_count_not_large = count_of_nodes <= max_cities_of_state_transition;
    // const get_filtered_nodes = function (
    //     current_city: number,
    //     available_nodes: Set<number>,
    // ): number[] | Set<number> {
    //     return is_count_not_large
    //         ? available_nodes
    //         : select_available_cities_from_optimal_and_latest({
    //               // eslint-disable-next-line indent
    //               available_nodes,
    //               get_neighbors_from_optimal_routes_and_latest_routes:
    //                   get_neighbors_from_optimal_routes_and_latest_routes,
    //               current_city,
    //               max_cities_of_state_transition:
    //                   max_cities_of_state_transition,
    //           });
    // };
    // const get_neighbors_from_optimal_routes_and_latest_routes =
    //     neighbors_from_optimal_routes_and_latest_routes.get;
    function generate_paths_using_state_transition_probabilities(
        cachedGridVisibilityChecker: GridVisibilityChecker,
    ): {
        route: number[];
        length: number;
        time_ms: number;
    } {
        const { visibleGridsList, visibleGridsMatrix } =
            cachedGridVisibilityChecker;
        return generate_paths_using_state_transition_probabilities_of_grid_map({
            ...options,
            visibleGridsList: visibleGridsList,
            route_selection_parameters_Q0,
            visibleGridsMatrix,
            node_coordinates,
            set_global_best,
            getBestLength: get_best_length,
            getCurrentSearchCount() {
                return current_search_count;
            },
            pheromoneStore,
            getBestRoute: get_best_route,
            // get_neighbors_from_optimal_routes_and_latest_routes(
            //     current_city: number,
            // ): number[] {
            //     return get_neighbors_from_optimal_routes_and_latest_routes(
            //         current_city,
            //     );
            // },
            getSearchCountOfBest() {
                return search_count_of_best;
            },
            count_of_nodes,
            // picknextnode,
            alpha_zero,
            beta_zero,
            // get_filtered_nodes,
            local_pheromone_update,
            getGridDistance,
        });
    }
    function local_pheromone_update(route: number[]) {
        for (const [city1, city2] of not_cycle_route_to_segments(route)) {
            const changed_pheromone =
                (1 - local_pheromone_volatilization_coefficient) *
                    pheromoneStore.get(city1, city2) +
                local_pheromone_volatilization_coefficient * pheromoneZero;
            pheromoneStore.set(city1, city2, changed_pheromone);
        }
    }
    function global_pheromone_update(iterate_best_length: number) {
        const best_route = get_best_route();
        const best_length = get_best_length();

        const delta_pheromone = 1 / best_length;
        for (const [city1, city2] of not_cycle_route_to_segments(best_route)) {
            const changed_pheromone =
                (1 - global_pheromone_volatilization_coefficient) *
                    pheromoneStore.get(city1, city2) +
                global_pheromone_volatilization_coefficient * delta_pheromone +
                Intra_population_similarity * (1 / iterate_best_length);
            pheromoneStore.set(city1, city2, changed_pheromone);
        }
    }
    const { Period_of_judgment_similarity, High_similarity_threshold } =
        options;
    // 定义地图的坐标
    const map = node_coordinates;

    // 根据地图坐标生成网格地图
    const gridmap = GridMapFromArray(map);
    const cachedGridVisibilityChecker = CachedGridVisibilityCheckerFactory(
        gridmap,
        options.grid_map_visibility_distance_limit,
        getGridDistance,
    );
    // 根据网格地图的大小生成网格距离矩阵
    // const gridDistanceMatrix = GridDistanceMatrix(
    //     gridmap.data.length,
    //     gridmap.data[0].length,
    // );

    // 获取可见网格列表
    // const visibleGridsList = getVisibleGridsList(gridmap);

    // 根据可见网格列表生成可见网格矩阵
    // const visibleGridsMatrix = VisibleGridsMatrix(visibleGridsList);
    /* 由于计算量太大，需要换其他方案。 */
    // // 查找所有凸多边形内部的点，并将其存储到集合中
    // const pointsInsideAllConvexPolygons = new Set(
    //     [...FindPointsInsideAllConvexPolygons(gridmap, visibleGridsMatrix)].map(
    //         (a) => a[0] * gridmap.row + a[1],
    //     ),
    // );

    // 过滤掉不在凸多边形内部的可见网格列表
    // const visibleGridsList =
    //     // FiltervisibleGridsList(
    //     //     visibleGridsList,
    //     //     pointsInsideAllConvexPolygons,
    //     // );
    //     visibleGridsList;
    async function runOneIteration() {
        const { visibleGridsList, visibleGridsMatrix } =
            cachedGridVisibilityChecker;
        let time_ms_of_one_iteration = 0;
        if (current_search_count === 0) {
            const {
                length: best_length,
                route: best_route,
                time_ms,
            } = await run_greedy_once_thread_with_time({
                node_coordinates,
                start,
                end,
                getGridDistance,
                visibleGridsMatrix,
                visibleGridsList: visibleGridsList,
                // round: distance_round,
            });
            // Greedy_algorithm_to_solve_tsp_with_selected_start_pool.destroy();
            set_global_best(best_route, best_length);
            // console.log({ best_route, best_length });
            time_ms_of_one_iteration += time_ms;
            greedy_length = best_length;
            pheromoneZero = 1 / count_of_nodes / greedy_length;
            MatrixFill(pheromoneStore, pheromoneZero);
            data_of_greedy.push({
                current_iterations: 1,
                time_ms_of_one_iteration: time_ms,
                worst_length_of_iteration: best_length,
                global_best_length: best_length,
                optimal_length_of_iteration: best_length,
                optimal_route_of_iteration: best_route,
                average_length_of_iteration: best_length,
            });
        }
        // if (!is_count_not_large) {
        //     neighbors_from_optimal_routes_and_latest_routes.clear();
        //     // update_neighbors_from_optimal_routes();
        // }
        const routes_and_lengths_of_one_iteration: {
            route: number[];
            length: number;
            time_ms: number;
        }[] = Array.from({ length: count_of_ants }).map(() => {
            return generate_paths_using_state_transition_probabilities(
                cachedGridVisibilityChecker,
            );
        });
        onUpdateIterateBestRoutesInPeriod(routes_and_lengths_of_one_iteration);
        for (
            const {
                route,
                length: route_length,
                time_ms: time_ms_of_one_route,
            } of routes_and_lengths_of_one_iteration
        ) {
            onRouteCreated(route, route_length);

            time_ms_of_one_iteration += time_ms_of_one_route;
            current_search_count++;
            // data_of_routes.push({
            //     global_best_length: get_best_length(),
            //     current_route_length: length,
            //     current_search_count,
            //     time_ms_of_one_route,
            // });
        }
        if (routes_and_lengths_of_one_iteration.length === count_of_ants) {
            /*  ({
                 Intra_population_similarity,
                 route_selection_parameters_Q0,
                 time_ms_of_one_iteration,
                 total_time_ms,
             } = */
            await Process_iteration_data({
                getGridDistance,
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
                set_Intra_population_similarity: (
                    v: number,
                ) => (Intra_population_similarity = v),
                set_route_selection_parameters_Q0: (
                    v: number,
                ) => (route_selection_parameters_Q0 = v),
                set_time_ms_of_one_iteration: (
                    v: number,
                ) => (time_ms_of_one_iteration = v),
                set_total_time_ms: (v: number) => (total_time_ms = v),
            });
        }

        update_latest_and_optimal_routes();
    }

    // function picknextnode({
    //     beta_zero,
    //     alpha_zero,
    //     currentnode,
    //     getpheromone,
    //     getdistancebyserialnumber,
    //     availablenextnodes,
    // }: {
    //     alpha_zero: number;
    //     beta_zero: number;
    //     currentnode: number;
    //     availablenextnodes: number[];
    //     getpheromone: (left: number, right: number) => number;
    //     getdistancebyserialnumber: (left: number, right: number) => number;
    // }): number {
    //     const beta = beta_zero;
    //     const alpha = alpha_zero;
    //     const random = Math.random();
    //     if (random < route_selection_parameters_Q0) {
    //         const nextnode_and_weights = availablenextnodes.map((nextnode) => {
    //             const weight = calc_state_transition_probabilities({
    //                 getpheromone,

    //                 nextnode,
    //                 currentnode,
    //                 alpha,
    //                 getdistancebyserialnumber,
    //                 beta,
    //                 ...options,
    //             });
    //             return { nextnode, weight };
    //         });

    //         return nextnode_and_weights.reduce((c, v) => {
    //             return c.weight > v.weight ? c : v;
    //         }, nextnode_and_weights[0]).nextnode;
    //     }

    //     const result = pickRandomOne(
    //         availablenextnodes,
    //         availablenextnodes.map((nextnode) => {
    //             const weight = calc_state_transition_probabilities({
    //                 getpheromone,

    //                 nextnode,
    //                 currentnode,
    //                 alpha,
    //                 getdistancebyserialnumber,
    //                 beta,
    //                 ...options,
    //             });

    //             return Math.max(0, weight);
    //         }),
    //     );
    //     return result;
    // }

    async function getOutputDataAndConsumeIterationAndRouteData(): Promise<
        COMMON_TSP_Output
    > {
        const output: COMMON_TSP_Output = {
            // data_of_routes: Array.from(data_of_routes),
            delta_data_of_iterations: Array.from(delta_data_of_iterations),
            time_of_best_ms,
            total_time_ms,
            search_count_of_best,
            data_of_greedy,
            global_best_length: get_best_length(),
            current_search_count,
            current_iterations: getCountOfIterations(),
            global_best_route: get_best_route(),
            time_of_initialization,
        };
        delta_data_of_iterations.length = 0;
        // data_of_routes.length = 0;
        return output;
    }
    const runIterations = create_run_iterations(runOneIteration);

    const { pheromone_volatilization_coefficient_of_communication } = options;

    const {
        getLatestIterateBestRoutesInPeriod,
        onUpdateIterateBestRoutesInPeriod,
    } = createLatestIterateBestRoutesInPeriod();
    const smoothPheromones = createSmoothPheromones(
        pheromoneStore,
        global_optimal_routes,
        Coefficient_of_the_minimum_after_pheromone_weakening,
    );
    const rewardCommonRoutes = createRewardCommonRoutes(
        pheromone_volatilization_coefficient_of_communication,
        pheromoneStore,
        count_of_nodes,
    );
    const time_of_initialization = Date.now() - time_of_initialization_start;
    const result: COMMON_TSP_EXECUTION = {
        getLatestIterateBestRoutesInPeriod,
        getCountOfIterations,
        getCurrentSearchCount() {
            return current_search_count;
        },
        getTotalTimeMs() {
            return total_time_ms;
        },
        updateBestRoute(route, route_length) {
            onRouteCreated(route, route_length);
        },
        smoothPheromones,
        rewardCommonRoutes,
        getBestRoute() {
            return get_best_route();
        },
        getBestLength() {
            return get_best_length();
        },
        runIterations,
        runOneIteration: runOneIteration,
        getOutputDataAndConsumeIterationAndRouteData:
            getOutputDataAndConsumeIterationAndRouteData,
        getTimeOfBest() {
            return time_of_best_ms;
        },
        getSearchCountOfBest() {
            return search_count_of_best;
        },
        getCollectionOfBetterRoutes() {
            return Array.from(global_optimal_routes).map((a) => a.route);
        },
        get_time_of_initialization() {
            return time_of_initialization;
        },
    };
    return result;
}
