export interface DataOfFinishOneIteration {
    average_length_of_iteration: number;
    current_iterations: number;
    population_relative_information_entropy: number;

    random_selection_probability: number;

    worst_length_of_iteration: number;
    optimal_length_of_iteration: number;

    time_ms_of_one_iteration: number;
    global_best_length: number;
    convergence_coefficient: number;

    iterate_best_length: number;
    id_Of_Population?: number;
    Intra_population_similarity: number;
    ClassOfPopulation?: string;
}
