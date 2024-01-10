import { NodeCoordinates } from "./NodeCoordinates";
import { ReadOnlyPheromone } from "./ReadOnlyPheromone";
import { TSPRunnerOptions } from "../src/TSPRunnerOptions";

export type SharedOptions = Required<TSPRunnerOptions> & {
    get_convergence_coefficient: () => number;
    get_neighbors_from_optimal_routes_and_latest_routes: (
        current_city: number,
    ) => number[];
    get_random_selection_probability: () => number;
    getSearchCountOfBest: () => number;

    getBestRoute: () => number[];
    getBestLength: () => number;

    set_global_best: (route: number[], length: number) => void;
    getCurrentSearchCount: () => number;
    count_of_nodes: number;
    max_results_of_2_opt: number;

    max_results_of_k_opt: number;

    alpha_zero: number;
    beta_zero: number;
    count_of_ants: number;
    node_coordinates: NodeCoordinates;
    pheromoneStore: ReadOnlyPheromone;
} & { start: number; end: number };
