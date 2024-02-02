/**
 * 完成一次迭代的数据接口
 */
export interface DataOfFinishOneIteration {
    /**
     * 平均迭代长度
     */
    average_length_of_iteration: number;
    /**
     * 当前迭代次数
     */
    current_iterations: number;
    /**
     * 种群相对信息熵
     */
    population_relative_information_entropy: number;

    /**
     * 随机选择概率
     */
    random_selection_probability: number;

    /**
     * 最差迭代长度
     */
    worst_length_of_iteration: number;
    /**
     * 最佳迭代长度
     */
    optimal_length_of_iteration: number;

    /**
     * 每次迭代的时间（ms）
     */
    time_ms_of_one_iteration: number;
    /**
     * 全局最佳长度
     */
    global_best_length: number;
    /**
     * 收敛系数
     */
    convergence_coefficient: number;

    /**
     * 迭代最佳长度
     */
    iterate_best_length: number;
    /**
     * 种群ID（可选）
     */
    id_Of_Population?: number;
    /**
     * 种群内相似度
     */
    Intra_population_similarity: number;
    /**
     * 种群类别（可选）
     */
    ClassOfPopulation?: string;
}
