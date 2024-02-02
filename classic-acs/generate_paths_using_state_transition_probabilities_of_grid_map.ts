import { MatrixSymmetry } from "@masx200/sparse-2d-matrix";
import { total_path_length_of_not_closed_route } from "../functions/closed-total-path-length";
import { creategetdistancebyIndex } from "../functions/creategetdistancebyIndex";
import { geteuclideandistancebyindex } from "../functions/geteuclideandistancebyindex";
import { pickRandomOne } from "../functions/pickRandomOne";
import { get_distance_round } from "../src/set_distance_round";
import { assert_true } from "../test/assert_true";

export function generate_paths_using_state_transition_probabilities_of_grid_map(
    node_coordinates: number[][],
    pheromoneStore: MatrixSymmetry<number>,
    count_of_nodes: number,
    picknextnode: ({
        beta_zero,
        alpha_zero,
        currentnode,
        getpheromone,
        getdistancebyserialnumber,
        availablenextnodes,
    }: {
        alpha_zero: number;
        beta_zero: number;
        currentnode: number;
        availablenextnodes: number[];
        getpheromone: (left: number, right: number) => number;
        getdistancebyserialnumber: (left: number, right: number) => number;
    }) => number,
    alpha_zero: number,
    beta_zero: number,
    get_filtered_nodes: (
        current_city: number,
        available_nodes: Set<number>,
    ) => number[] | Set<number>,
    local_pheromone_update: (route: number[]) => void,
) {
    const starttime_of_one_route = Number(new Date());

    const inputindexs = Array(node_coordinates.length)
        .fill(0)
        .map((_v, i) => i);
    const startnode = pickRandomOne(inputindexs);
    const route: number[] = [startnode];
    const available_nodes = new Set<number>(
        inputindexs.filter((v) => !route.includes(v)),
    );
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

    while (route.length !== count_of_nodes) {
        const current_city = Array.from(route).slice(-1)[0];

        const nextnode = picknextnode({
            alpha_zero,
            beta_zero,

            currentnode: current_city,
            availablenextnodes: Array.from(
                get_filtered_nodes(current_city, available_nodes),
            ),
            getpheromone,
            getdistancebyserialnumber,
        });
        route.push(nextnode);
        available_nodes.delete(nextnode);
    }

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
    assert_true(route.length == count_of_nodes);
    const endtime_of_one_route = Number(new Date());
    const time_ms = endtime_of_one_route - starttime_of_one_route;
    return { time_ms, route, length };
}
