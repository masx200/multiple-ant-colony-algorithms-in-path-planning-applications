// import { Greedy_algorithm_to_solve_tsp_with_selected_start_pool } from "../src/Greedy_algorithm_to_solve_tsp_with_selected_start_pool";
import { run_greedy_once_thread_with_time } from "./run_greedy_once_thread_with_time";
import { SharedOptions } from "./SharedOptions";
/**
 * 并行贪心搜索生成最短路径的生成器函数
 * @param options - 函数参数对象
 * @param options.node_coordinates - 节点坐标数组
 * @param options.count_of_nodes - 节点数量
 * @param options.start - 起始节点
 * @param options.end - 终止节点
 * @param options.max_routes_of_greedy - 最大贪心搜索路径数量
 * @returns 生成器函数，生成最短路径信息
 */
export async function* greedy_first_search_routes_parallel({
    max_routes_of_greedy,
    node_coordinates,
    start,
    end,
}: {
    node_coordinates: number[][];
    count_of_nodes: number;
} & SharedOptions): AsyncGenerator<
    { length: number; route: number[]; time_ms: number },
    void,
    unknown
> {
    for (let i = 0; i < max_routes_of_greedy; i++) {
        yield await run_greedy_once_thread_with_time({
            node_coordinates,
            start,
            end,
        });
    }
    // const routes_of_greedy = Math.min(max_routes_of_greedy, count_of_nodes);

    // // const inputindexs = Array(node_coordinates.length)
    // //     .fill(0)
    // //     .map((_v, i) => i);
    // // const max_current =
    //     // Greedy_algorithm_to_solve_tsp_with_selected_start_pool.maxThreads;
    // let rest_count = routes_of_greedy;
    // while (rest_count > 0) {
    //     // const current_threads = Math.min(max_current, rest_count);
    //     const parallel_results = await Promise.all(
    //         Array.from({ length: current_threads }).map(() =>
    //             run_greedy_once_thread_with_time({
    //                 // inputindexs,
    //                 node_coordinates,
    //                 start,
    //                 end,
    //                 // round,
    //                 // max_cities_of_greedy,
    //             }),
    //         ),
    //     );
    //     rest_count -= current_threads;
    //     for (const result of parallel_results) {
    //         yield result;
    //     }
    // }
}
