import { GridMapFromArray } from "../path-planning/GridMapFromArray";
import { Point } from "../path-planning/Point";
import { oneDimensionToTwoDimensions } from "../path-planning/oneDimensionToTwoDimensions";
import { search_one_route_on_grid_map } from "../path-planning/search_one_route_on_grid_map";
import { twoDimensionsToOneDimension } from "../path-planning/twoDimensionsToOneDimension";
import { get_distance_round } from "../src/set_distance_round";
// import { assert_true } from "../test/assert_true";
import { total_path_length_of_not_closed_route } from "./closed-total-path-length";
import { creategetdistancebyIndex } from "./creategetdistancebyIndex";
import { geteuclideandistancebyindex } from "./geteuclideandistancebyindex";
import { picknextnodeRoulette } from "./pick-next-node-Roulette";
// import { pickRandomOne } from "./pickRandomOne";
import { ReadOnlyPheromone } from "./ReadOnlyPheromone";
// import { select_available_cities_from_optimal_and_latest } from "./select_available_cities_from_optimal_and_latest";
import { SharedOptions } from "./SharedOptions";
import { random_next_point_selector } from "../path-planning/random_next_point_selector";
import { PointFromArray } from "../path-planning/PointFromArray";
import { GridVisibilityChecker } from "../path-planning/GridVisibilityChecker";

/**
 * 使用状态转换概率生成路径
 * @param options - 选项参数
 * @returns - 路径和长度
 */
export function generate_paths_using_state_transition_probabilities(
    options: {
        alpha_zero: number;
        beta_zero: number;
        random_selection_probability: number;
        node_coordinates: number[][];

        pheromoneStore: ReadOnlyPheromone;
    } & SharedOptions &
        GridVisibilityChecker,
): {
    route: number[];
    length: number;
} {
    function next_point_selector(
        neighbors: Point[],
        current: Point,
        end: Point,
    ): Point {
        // while (route.length !== count_of_nodes) {
        //     const current_city = Array.from(route).slice(-1)[0];
        //     assert_true(typeof current_city === "number");

        const randomselection = Math.random() < random_selection_probability;

        if (randomselection) {
            return random_next_point_selector(neighbors /* current, end */);
        }
        const current_city = twoDimensionsToOneDimension(
            current.x,
            current.y,
            n,
        );
        const available_nodes = neighbors.map((point) => {
            const point1 = twoDimensionsToOneDimension(point.x, point.y, n);
            return point1;
        });
        // const is_count_not_large =
        // neighbors.length <= max_cities_of_state_transition;
        const get_filtered_nodes = function (): number[] | Set<number> {
            return available_nodes;
            // return is_count_not_large
            //     ? available_nodes
            //     : select_available_cities_from_optimal_and_latest({
            //           available_nodes,
            //           get_neighbors_from_optimal_routes_and_latest_routes,
            //           current_city,
            //           max_cities_of_state_transition:
            //               max_cities_of_state_transition,
            //       });
        };

        const end_city = twoDimensionsToOneDimension(end.x, end.y, n);
        const nextnode = /* randomselection
            ? pickRandomOne(Array.from(get_filtered_nodes()))
            : */ picknextnodeRoulette({
            ...options,
            alpha_zero,
            beta_zero,
            // get_convergence_coefficient,
            currentnode: current_city,
            availablenextnodes: Array.from(get_filtered_nodes()),
            getpheromone,
            getdistancebyserialnumber,
            end: end_city,
        });
        return PointFromArray(oneDimensionToTwoDimensions(nextnode, n));
    }

    // const picknextnodeRoulette = picknextnodeRoulette;
    const {
        // get_convergence_coefficient,
        // get_neighbors_from_optimal_routes_and_latest_routes,
        // max_cities_of_state_transition,
        random_selection_probability,
        node_coordinates,
        pheromoneStore,
        start,
        end,
        alpha_zero,
        beta_zero,
        visibleGridsList,
        visibleGridsMatrix,
    } = options;

    // const count_of_nodes = node_coordinates.length;
    function getpheromone(left: number, right: number): number {
        return pheromoneStore.get(left, right);
    }
    function getdistancebyserialnumber(left: number, right: number): number {
        return geteuclideandistancebyindex(
            left,
            right,
            node_coordinates,
            get_distance_round(),
        );
    }

    // const inputindexs = Array(node_coordinates.length)
    //     .fill(0)
    //     .map((_v, i) => i);
    // const startnode = pickRandomOne(inputindexs);

    const map = node_coordinates;
    const gridmap = GridMapFromArray(map);
    const n = gridmap.data[0].length;
    const startPoint = new Point(...oneDimensionToTwoDimensions(start, n));
    const endPoint = new Point(...oneDimensionToTwoDimensions(end, n));
    const one_route_on_grid_map = search_one_route_on_grid_map({
        grid: gridmap,
        start: startPoint,
        end: endPoint,
        visibleGridsList,
        visibleGridsMatrix,
        next_point_selector,
    });
    const route: number[] = one_route_on_grid_map.map((a) =>
        twoDimensionsToOneDimension(a[0], a[1], n),
    ); //[startnode];
    // const available_nodes = new Set<number>(
    //     inputindexs.filter((v) => !route.includes(v)),
    // );

    //     assert_true(typeof nextnode === "number");
    //     route.push(nextnode);
    //     available_nodes.delete(nextnode);
    // }

    // assert_true(route.length == count_of_nodes);
    const routelength = total_path_length_of_not_closed_route({
        round: get_distance_round(),
        path: route,
        getdistancebyIndex: creategetdistancebyIndex(
            node_coordinates,
            get_distance_round(),
        ),
    });
    const length = routelength;
    return { route, length };
}
