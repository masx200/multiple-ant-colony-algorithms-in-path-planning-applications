import { Greedy_algorithm_to_solve_tsp_with_selected_start_pool } from "../src/Greedy_algorithm_to_solve_tsp_with_selected_start_pool";
import { NodeCoordinates } from "./NodeCoordinates";

export async function run_greedy_once_thread_with_time({
    node_coordinates,
    start,
    end,
    // inputindexs = Array.from(node_coordinates.keys()),

    // round = false,
    // max_cities_of_greedy = Infinity,
}: {
    // inputindexs?: number[];
    node_coordinates: NodeCoordinates;
    start: number;
    end: number;
    // round?: boolean;
    // max_cities_of_greedy?: number;
}): Promise<{ length: number; route: number[]; time_ms: number }> {
    // const start = pickRandomOne(inputindexs);
    return Greedy_algorithm_to_solve_tsp_with_selected_start_pool.run((w) => {
        const remote = w.remote;
        return remote.Greedy_solve_tsp_with_selected_start_length_time_ms({
            node_coordinates,
            start,
            end,
            // round,
            // max_cities_of_greedy,
        });
    });
}
