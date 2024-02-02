import { assert_true } from "../test/assert_true";
import { construct_one_route_all } from "./construct_one_route_all";
import { EachRouteGeneratorOptions } from "./Fun_EachRouteGenerator";
import { SharedOptions } from "./SharedOptions";

/**
 * 生成一个路由生成器
 * @param options - 路由生成器选项和共享选项
 * @returns - 包含路由、长度和时间的元组
 */
export function EachRouteGenerator(
    options: EachRouteGeneratorOptions & SharedOptions,
): {
    route: number[];
    length: number;
    time_ms: number;
} {
    const starttime_of_one_route = Number(new Date());
    const {
        pheromone_exceeds_maximum_range,

        set_global_best,

        current_search_count,

        count_of_nodes,
        node_coordinates,
        pheromoneStore,
        alpha_zero,
        beta_zero,
        last_random_selection_probability,
        visibleGridsMatrix,

        getBestLength,
        getBestRoute,
        visibleGridsListWithOutPointsInsideAllConvexPolygons,
    } = options;
    if (pheromone_exceeds_maximum_range()) {
        return {
            time_ms: 0,
            length: getBestLength(),
            route: getBestRoute(),
        };
    }
    const {
        route: oldRoute,
        length: oldLength,
    }: {
        route: number[];
        length: number;
    } = construct_one_route_all({
        ...options,

        current_search_count,
        node_coordinates,
        count_of_nodes,
        pheromoneStore,

        alpha_zero,
        beta_zero,
        last_random_selection_probability,
        visibleGridsListWithOutPointsInsideAllConvexPolygons,
        visibleGridsMatrix,
    });

    if (oldLength < getBestLength()) {
        set_global_best(oldRoute, oldLength);
    }

    const endtime_of_one_route = Number(new Date());

    const route = oldRoute;
    const length = oldLength;
    if (length < getBestLength()) {
        set_global_best(route, length);
    }
    assert_true(getBestLength() < Infinity);
    assert_true(getBestRoute().length >= 2);
    const time_ms = endtime_of_one_route - starttime_of_one_route;

    return { time_ms: time_ms, route, length };
}
