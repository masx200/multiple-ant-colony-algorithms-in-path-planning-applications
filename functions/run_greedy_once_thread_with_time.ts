// import { Greedy_algorithm_to_solve_tsp_with_selected_start_pool } from "../src/Greedy_algorithm_to_solve_tsp_with_selected_start_pool";
import { Greedy_solve_tsp_with_selected_start_length_time_ms } from "../functions/Greedy-solve-tsp-with-selected-start-length-time-ms";
import { GreedyWithStartOptions } from "./GreedyWithStartOptions";
/**
 * 使用贪婪算法计算一次带有时间限制的旅行商问题的最优解。
 * @param node_coordinates 节点的坐标
 * @param start 起始节点的索引
 * @param end 终止节点的索引
 * @returns 返回一个Promise对象，包含最优解的长度、路径和耗时（以毫秒为单位）
 */
export async function run_greedy_once_thread_with_time({
    node_coordinates,
    start,
    end,
    gridDistanceMatrix,
    // inputindexs = Array.from(node_coordinates.keys()),

    // round = false,
    // max_cities_of_greedy = Infinity,
}: {
    // inputindexs?: number[];
    node_coordinates: number[][];
    start: number;
    end: number;
    // round?: boolean;
    // max_cities_of_greedy?: number;
} & GreedyWithStartOptions): Promise<{
    length: number;
    route: number[];
    time_ms: number;
}> {
    // const start = pickRandomOne(inputindexs);
    /*   return Greedy_algorithm_to_solve_tsp_with_selected_start_pool.run((w) => {
        const remote = w.remote;
        return remote. */
    return Greedy_solve_tsp_with_selected_start_length_time_ms({
        node_coordinates,
        start,
        end,
        gridDistanceMatrix,
        // round,
        // max_cities_of_greedy,
        // });
    });
}
