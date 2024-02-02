import { Greedy_algorithm_to_solve_tsp_with_selected_start } from "./Greedy_algorithm_to_solve_tsp_with_selected_start";
import { GreedyWithStartOptions } from "./GreedyWithStartOptions";

/**
 * 使用选定的起始节点解决旅行商问题的贪婪算法
 * @param options - 选项参数
 * @returns - 返回旅行商问题的解
 */
export function Greedy_solve_tsp_with_selected_start_length_time_ms({
    node_coordinates,
    start,
    // round = false,
    // max_cities_of_greedy = Infinity,
    end,
    gridDistanceMatrix,
    ...opts
}: GreedyWithStartOptions): {
    length: number;
    route: number[];
    time_ms: number;
} {
    // set_distance_round(round);
    const start_time = Number(new Date());
    const { route, length } = Greedy_algorithm_to_solve_tsp_with_selected_start(
        {
            node_coordinates,
            start,
            // round,
            // max_cities_of_greedy,
            end,
            gridDistanceMatrix,
            ...opts,
        },
    );
    const end_time = Number(new Date());
    const time_ms = -start_time + end_time;
    return { length, route: route, time_ms };
}
