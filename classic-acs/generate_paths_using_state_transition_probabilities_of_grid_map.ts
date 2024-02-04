import { MatrixSymmetry } from "@masx200/sparse-2d-matrix";
import { total_path_length_of_not_closed_route } from "../functions/closed-total-path-length";
import { creategetdistancebyIndex } from "../functions/creategetdistancebyIndex";
import { geteuclideandistancebyindex } from "../functions/geteuclideandistancebyindex";
import { get_distance_round } from "../src/set_distance_round";

import { picknextnodeRoulette } from "../functions/pick-next-node-Roulette";
import { select_available_cities_from_optimal_and_latest } from "../functions/select_available_cities_from_optimal_and_latest";
import { Point } from "../path-planning/Point";
import { PointFromArray } from "../path-planning/PointFromArray";
import { oneDimensionToTwoDimensions } from "../path-planning/oneDimensionToTwoDimensions";
import { twoDimensionsToOneDimension } from "../path-planning/twoDimensionsToOneDimension";

import { GridMapFromArray } from "../path-planning/GridMapFromArray";
import { search_one_route_on_grid_map } from "../path-planning/search_one_route_on_grid_map";
import { SharedOptions } from "../functions/SharedOptions";
import { calc_state_transition_probabilities } from "../functions/calc_state_transition_probabilities";
/**
 * 使用网格地图的状态转换概率生成路径
 * @param node_coordinates 节点坐标数组
 * @param pheromoneStore 蜂群存储矩阵
 * @param count_of_nodes 路径节点数量
 * @param picknextnode 选择下一个节点的函数
 * @param alpha_zero 路径选择系数
 * @param beta_zero 路径概率选择系数
 * @param get_filtered_nodes 获取过滤节点的函数
 * @param local_pheromone_update 本地蜂群素更新函数
 * @returns 生成的路径信息
 */
export function generate_paths_using_state_transition_probabilities_of_grid_map({
    node_coordinates,
    start,
    end,
    max_cities_of_state_transition,
    pheromoneStore,
    visibleGridsList,
    count_of_nodes,
    // picknextnode,
    alpha_zero,
    beta_zero,
    // get_filtered_nodes,
    local_pheromone_update,
    visibleGridsMatrix,
    ...options
}: Omit<
    {
        route_selection_parameters_Q0: number;
        node_coordinates: number[][];
        pheromoneStore: MatrixSymmetry<number>;
        count_of_nodes: number;
        // picknextnode: ({
        //     beta_zero,
        //     alpha_zero,
        //     currentnode,
        //     getpheromone,
        //     getdistancebyserialnumber,
        //     availablenextnodes,
        // }: {
        //     alpha_zero: number;
        //     beta_zero: number;
        //     currentnode: number;
        //     availablenextnodes: number[];
        //     getpheromone: (left: number, right: number) => number;
        //     getdistancebyserialnumber: (left: number, right: number) => number;
        // }) => number;
        alpha_zero: number;
        beta_zero: number;
        // get_filtered_nodes: (
        //     current_city: number,
        //     available_nodes: Set<number>,
        // ) => number[] | Set<number>;
        local_pheromone_update: (route: number[]) => void;
    } & SharedOptions & {
            visibleGridsList: Iterable<[number, number]>[][];
            visibleGridsMatrix: boolean[][][][];
        },
    "get_convergence_coefficient" | "get_random_selection_probability"
>) {
    const {
        get_neighbors_from_optimal_routes_and_latest_routes,
        route_selection_parameters_Q0,
    } = options;
    function next_point_selector(
        neighbors: Point[],
        current: Point,
        end: Point,
    ): Point {
        // while (route.length !== count_of_nodes) {
        //     const current_city = Array.from(route).slice(-1)[0];
        //     assert_true(typeof current_city === "number");

        // const randomselection = Math.random() < random_selection_probability;

        // if (randomselection) {
        //     return random_next_point_selector(neighbors /* current, end */);
        // }
        const current_city = twoDimensionsToOneDimension(
            current.x,
            current.y,
            n,
        );
        const available_nodes = neighbors.map((point) => {
            const point1 = twoDimensionsToOneDimension(point.x, point.y, n);
            return point1;
        });
        const is_count_not_large =
            neighbors.length <= max_cities_of_state_transition;
        function get_filtered_nodes(): number[] | Set<number> {
            return is_count_not_large
                ? available_nodes
                : select_available_cities_from_optimal_and_latest({
                      available_nodes,
                      get_neighbors_from_optimal_routes_and_latest_routes,
                      current_city,
                      max_cities_of_state_transition:
                          max_cities_of_state_transition,
                  });
        }

        const end_city = twoDimensionsToOneDimension(end.x, end.y, n);

        const beta = beta_zero;
        const alpha = alpha_zero;
        const random = Math.random();
        if (random < route_selection_parameters_Q0) {
            const nextnode_and_weights = available_nodes.map((nextnode) => {
                const weight = calc_state_transition_probabilities({
                    getpheromone,

                    nextnode,
                    currentnode: current_city,
                    alpha,
                    getdistancebyserialnumber,
                    beta,
                    ...options,
                    end: end_city,
                });
                return { nextnode, weight };
            });

            const nextnode = nextnode_and_weights.reduce((c, v) => {
                return c.weight > v.weight ? c : v;
            }, nextnode_and_weights[0]).nextnode;
            return PointFromArray(oneDimensionToTwoDimensions(nextnode, n));
        }
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
            node_coordinates,
            max_cities_of_state_transition,
            pheromoneStore,
            count_of_nodes,
            start,
        });
        return PointFromArray(oneDimensionToTwoDimensions(nextnode, n));
    }
    const starttime_of_one_route = Number(new Date());

    // const inputindexs = Array(node_coordinates.length)
    //     .fill(0)
    //     .map((_v, i) => i);
    // const startnode = pickRandomOne(inputindexs);
    const map = node_coordinates;
    const gridmap = GridMapFromArray(map);
    const n = gridmap.data[0].length;
    const startPoint = new Point(...oneDimensionToTwoDimensions(start, n));
    const endPoint = new Point(...oneDimensionToTwoDimensions(end, n));
    const one_route_on_grid_map = search_one_route_on_grid_map(
        gridmap,
        startPoint,
        endPoint,
        visibleGridsList,
        visibleGridsMatrix,
        next_point_selector,
    );
    const route: number[] = one_route_on_grid_map.map((a) =>
        twoDimensionsToOneDimension(a[0], a[1], n),
    ); // const route: number[] = [startnode];
    // const available_nodes = new Set<number>(
    //     inputindexs.filter((v) => !route.includes(v)),
    // );
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

    // while (route.length !== count_of_nodes) {
    //     const current_city = Array.from(route).slice(-1)[0];

    //     const nextnode = picknextnode({
    //         alpha_zero,
    //         beta_zero,

    //         currentnode: current_city,
    //         availablenextnodes: Array.from(
    //             get_filtered_nodes(current_city, available_nodes),
    //         ),
    //         getpheromone,
    //         getdistancebyserialnumber,
    //     });
    //     route.push(nextnode);
    //     available_nodes.delete(nextnode);
    // }

    local_pheromone_update(route);
    const routelength = total_path_length_of_not_closed_route({
        round: get_distance_round(),
        path: route,
        getdistancebyIndex: creategetdistancebyIndex(
            node_coordinates,
            get_distance_round(),
        ),
    });
    const length = routelength;
    // assert_true(route.length == count_of_nodes);
    const endtime_of_one_route = Number(new Date());
    const time_ms = endtime_of_one_route - starttime_of_one_route;
    return { time_ms, route, length };
}
