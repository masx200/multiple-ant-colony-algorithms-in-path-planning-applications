export interface EachRouteGeneratorOptions {
    max_results_of_2_opt?: number;
    current_search_count: number;
    count_of_nodes: number;
    node_coordinates: number[][];
    alpha_zero: number;
    beta_zero: number;
    last_random_selection_probability: number;
    max_results_of_k_opt: number;
    getBestLength: () => number;
    getBestRoute: () => number[];
    greedy_length: number;
    pheromone_exceeds_maximum_range: () => boolean;
}
