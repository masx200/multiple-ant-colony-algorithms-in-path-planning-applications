import { GreedyWithStartOptions } from "../functions/GreedyWithStartOptions";
import { Greedy_algorithm_to_solve_tsp_with_selected_start } from "../functions/Greedy_algorithm_to_solve_tsp_with_selected_start";
// import { Greedy_algorithm_to_solve_tsp_with_selected_start_pool } from "./Greedy_algorithm_to_solve_tsp_with_selected_start_pool";

/**
 * 使用贪婪算法解决旅行商问题，并选择指定的起始点。
 * @param {GreedyWithStartOptions} options - 贪婪算法的选项
 * @returns {Promise<{ route: number[], length: number }>} - 返回旅行商问题的路径和长度
 */
export async function thread_Greedy_algorithm_to_solve_tsp_with_selected_start({
    node_coordinates,
    // start = get_random_start(node_coordinates),
    start,
    end,
    gridDistanceMatrix,
    ...opts
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
        gridDistanceMatrix,
        ...opts,
        // round,
        // max_cities_of_greedy,
        // });
    });
}
