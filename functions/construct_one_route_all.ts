import { EachRouteGeneratorOptions } from "./Fun_EachRouteGenerator";
import { generate_paths_using_state_transition_probabilities } from "./generate-paths-using-state-transition-probabilities";
import { SharedOptions } from "./SharedOptions";

/**
 * 构建一条路径
 * @param options - 选项参数
 * @returns - 包含路径和长度的对象
 */
export function construct_one_route_all(
    options: {
        current_search_count: number;

        node_coordinates: number[][];
        count_of_nodes: number;

        alpha_zero: number;
        beta_zero: number;
        last_random_selection_probability: number;
    } & SharedOptions &
        EachRouteGeneratorOptions,
): {
    route: number[];
    length: number;
} {
    const {
        visibleGridsMatrix,
        node_coordinates,

        pheromoneStore,

        alpha_zero,
        beta_zero,
        last_random_selection_probability,
        visibleGridsListWithOutPointsInsideAllConvexPolygons,
    } = options;

    const result = generate_paths_using_state_transition_probabilities({
        ...options,
        pheromoneStore,
        alpha_zero,
        beta_zero,
        visibleGridsMatrix,
        random_selection_probability: last_random_selection_probability,
        node_coordinates,
        visibleGridsListWithOutPointsInsideAllConvexPolygons,
    });
    return result;
}
