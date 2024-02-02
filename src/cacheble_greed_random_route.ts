import { GreedyWithStartOptions } from "../functions/GreedyWithStartOptions";
import { node_coordinates_to_greed_random_route } from "./node_coordinates_to_greed_random_route";
import { thread_Greedy_algorithm_to_solve_tsp_with_selected_start } from "./thread_Greedy_algorithm_to_solve_tsp_with_selected_start";

export async function cacheble_greed_random_route({
    node_coordinates,
    start,
    end,
    gridDistanceMatrix,
    // round = false,
    // max_cities_of_greedy = Infinity,
}: {
    node_coordinates: number[][];
    start: number;

    end: number;
    // round?: boolean;
    // max_cities_of_greedy?: number;
} & GreedyWithStartOptions): Promise<{
    route: number[];
    length: number;
}> {
    const cache = node_coordinates_to_greed_random_route.get(node_coordinates);
    if (cache) {
        return cache;
    } else {
        // const inputindexs = Array(node_coordinates.length)
        //     .fill(0)
        //     .map((_v, i) => i);
        // const start = pickRandomOne(inputindexs);
        const route_promise =
            thread_Greedy_algorithm_to_solve_tsp_with_selected_start({
                node_coordinates,
                start,
                gridDistanceMatrix,
                end,
                // round,
                // max_cities_of_greedy,
            });
        node_coordinates_to_greed_random_route.set(
            node_coordinates,
            route_promise,
        );
        const route = await route_promise;
        return route;
    }
}
