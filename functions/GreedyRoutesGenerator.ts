import { DataOfFinishGreedyIteration } from "./DataOfFinishGreedyIteration";
import { PureDataOfFinishOneRoute } from "./PureDataOfFinishOneRoute";
import { SharedOptions } from "./SharedOptions";
import { assert_true } from "../test/assert_true";
import { getBestRoute_Of_Series_routes_and_lengths } from "./getBestRoute_Of_Series_routes_and_lengths";
import { greedy_first_search_routes_parallel } from "./greedy_first_search_routes_parallel";
import { sum } from "lodash-es";
import { GreedyWithStartOptions } from "./GreedyWithStartOptions";

/**
 * 贪心路径生成器
 * @param options - 选项参数
 * @returns - 返回包含最佳长度、最佳路由和平均长度的对象
 */
export async function GreedyRoutesGenerator(
    options:
        & {
            /**
             * 发出完成贪婪迭代的事件
             * @param data - 数据参数
             */
            emit_finish_greedy_iteration: (
                data: DataOfFinishGreedyIteration,
            ) => void;
            /**
             * 获取最佳路由
             * @returns - 返回最佳路由
             */
            getBestRoute: () => number[];
            /**
             * 获取最佳长度
             * @returns - 返回最佳长度
             */
            getBestLength: () => number;

            /**
             * 创建路由事件
             * @param route - 路由数组
             * @param length - 路由长度
             */
            onRouteCreated: (route: number[], length: number) => void;
            /**
             * 发出完成一个路由的事件
             * @param data - 数据参数
             */
            emit_finish_one_route: (data: PureDataOfFinishOneRoute) => void;

            /**
             * 节点数量
             */
            count_of_nodes: number;
        }
        & SharedOptions
        & GreedyWithStartOptions,
): Promise<{
    /**
     * 最佳长度
     */
    best_length: number;
    /**
     * 最佳路由
     */
    best_route: number[];
    /**
     * 平均长度
     */
    average_length: number;
    routes_and_lengths_of_one_iteration: {
        route: number[];
        length: number;
    }[];
}> {
    const {
        set_global_best,
        emit_finish_greedy_iteration,
        getBestRoute,
        getBestLength,
        onRouteCreated,
        emit_finish_one_route,
    } = options;

    const greedy_results_iter = greedy_first_search_routes_parallel({
        ...options,
        // round: get_distance_round(),
    });
    const parallel_results: {
        length: number;
        route: number[];
        time_ms: number;
    }[] = [];

    for await (const { route, length, time_ms } of greedy_results_iter) {
        parallel_results.push({
            route,
            length,
            time_ms,
        });

        const oldLength = length;
        const oldRoute = route;

        if (oldLength < getBestLength()) {
            set_global_best(oldRoute, oldLength);
        }

        onRouteCreated(route, length);

        emit_finish_one_route({
            time_ms_of_one_route: time_ms,
            current_route_length: length,
        });
    }
    const routes_and_lengths_of_one_iteration = parallel_results;
    const { length: best_length, route: optimal_route_of_iteration } =
        getBestRoute_Of_Series_routes_and_lengths(parallel_results);
    const best_route = optimal_route_of_iteration;
    // Greedy_algorithm_to_solve_tsp_with_selected_start_pool.destroy();
    const time_ms_of_one_iteration = sum(
        parallel_results.map((r) => r.time_ms),
    );
    const average_length_of_iteration =
        sum(parallel_results.map((a) => a.length)) / parallel_results.length;
    const worst_length_of_iteration = Math.max(
        ...parallel_results.map((a) => a.length),
    );
    emit_finish_greedy_iteration({
        worst_length_of_iteration,
        average_length_of_iteration,
        current_iterations: 1,
        optimal_length_of_iteration: best_length,
        optimal_route_of_iteration,
        time_ms_of_one_iteration,
        global_best_length: getBestLength(),
    });
    assert_true(getBestLength() < Infinity);
    assert_true(getBestRoute().length >= 2);
    return {
        best_length,
        best_route,
        average_length: average_length_of_iteration,
        routes_and_lengths_of_one_iteration,
    };
}
