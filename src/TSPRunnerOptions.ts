import { CommunicationStrategy } from "./CommunicationStrategy";
/**
 * TSP默认选项接口
 */
export interface TSPDefaultOptions {
    显示每次迭代的统计: boolean;
    CommunicationStrategy: CommunicationStrategy;
    max_results_of_k_exchange?: number;
    distance_round?: boolean;
    max_cities_of_greedy?: number;
    max_segments_of_cross_point?: number;
    max_cities_of_state_transition?: number;
    max_routes_of_greedy?: number;
    max_size_of_collection_of_optimal_routes?: number;
    max_results_of_2_opt?: number;
    max_results_of_k_opt?: number | undefined;
    alpha_zero?: number | undefined;
    beta_zero?: number | undefined;
    count_of_ants?: number | undefined;
    relative_Information_Entropy_Factor?: number;
    max_number_of_stagnation?: number;
    number_of_populations_of_the_first_category: number;

    number_of_the_second_type_of_population: number;
    population_communication_iterate_cycle: number;
    global_pheromone_volatilization_coefficient: number;
    local_pheromone_volatilization_coefficient: number;
    path_selection_parameter_q0_min: number;
    path_selection_parameter_q0_max: number;
    alpha_for_the_second_type_of_population: number;
    id_Of_Population: number;
    beta_for_the_second_type_of_population: number;
    ClassOfPopulation?: string;
    pheromone_volatilization_coefficient_of_communication: number;
    Multi_Population_Similarity_evaluation_coefficient: number;
    Period_of_judgment_similarity: number;
    High_similarity_threshold: number;
    Coefficient_of_the_minimum_after_pheromone_weakening: number;
    grid_map_visibility_distance_limit: number;
}

/**
 * TSP运行器选项类型
 */
export type TSPRunnerOptions = {
    node_coordinates: number[][];
} & Partial<TSPDefaultOptions> & { start: number; end: number };
