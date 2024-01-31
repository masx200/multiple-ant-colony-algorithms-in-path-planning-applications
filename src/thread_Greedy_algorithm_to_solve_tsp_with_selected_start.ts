import { GreedyWithStartOptions } from "../functions/GreedyWithStartOptions";
import { Greedy_algorithm_to_solve_tsp_with_selected_start } from "../functions/Greedy_algorithm_to_solve_tsp_with_selected_start";
// import { Greedy_algorithm_to_solve_tsp_with_selected_start_pool } from "./Greedy_algorithm_to_solve_tsp_with_selected_start_pool";

export async function thread_Greedy_algorithm_to_solve_tsp_with_selected_start({
    node_coordinates,
    // start = get_random_start(node_coordinates),
    start,
    end,
    // round = false,
    // max_cities_of_greedy = Infinity,
}: GreedyWithStartOptions): Promise<{
    route: number[];
    length: number;
}> {
    /*   return Greedy_algorithm_to_solve_tsp_with_selected_start_pool.run((w) => {
        const remote = w.remote;

        return remote. */
    return Greedy_algorithm_to_solve_tsp_with_selected_start({
        node_coordinates,
        start,
        end,
        // round,
        // max_cities_of_greedy,
        // });
    });
}
