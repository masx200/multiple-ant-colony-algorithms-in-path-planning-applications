import { CommunicationStrategy } from "./CommunicationStrategy";
import { TSPDefaultOptions } from "./TSPRunnerOptions";
import { max_number_of_stagnation } from "../functions/max_number_of_stagnation";
import { relative_Information_Entropy_Factor } from "../functions/relative_Information_Entropy_Factor";

export const default_count_of_ants = 20;
export const default_search_rounds = 1000;
export const default_search_time_seconds = 600;

export const default_alpha = 1;
export const default_beta = 4;

export const default_max_results_of_k_opt = 10;
export const default_max_results_of_2_opt = 10;
export const default_max_results_of_k_exchange = 10;

export { DefaultOptions };
/**
 * 默认选项
 * @type {Required<TSPDefaultOptions>}
 */
const DefaultOptions: Required<TSPDefaultOptions> = {
    grid_map_visibility_distance_limit: 5,
    /**
     * 是否显示每次迭代的统计信息
     * @type {boolean}
     */
    显示每次迭代的统计: false,
    /**
     * 通信策略
     * @type {CommunicationStrategy}
     */
    CommunicationStrategy: CommunicationStrategy.All,
    /**
     * 种群ID
     * @type {number}
     */
    id_Of_Population: 0,
    /**
     * k交换的最大结果数
     * @type {number}
     */
    max_results_of_k_exchange: default_max_results_of_k_exchange,
    /**
     * 状态转换的最大城市数
     * @type {number}
     */
    max_cities_of_state_transition: 40,
    /**
     * 2-opt的最大结果数
     * @type {number}
     */
    max_results_of_2_opt: default_max_results_of_2_opt,
    /**
     * k-opt的最大结果数
     * @type {number}
     */
    max_results_of_k_opt: default_max_results_of_k_opt,
    /**
     * alpha的初始值
     * @type {number}
     */
    alpha_zero: default_alpha,
    /**
     * beta的初始值
     * @type {number}
     */
    beta_zero: default_beta,
    /**
     * 蚂蚁数量
     * @type {number}
     */
    count_of_ants: default_count_of_ants,
    /**
     * 最优路径集合的最大结果数
     * @type {number}
     */
    max_size_of_collection_of_optimal_routes: 10,
    /**
     * 贪心算法的最大结果数
     * @type {number}
     */
    max_routes_of_greedy: 2,
    /**
     * 交叉点的最大段数
     * @type {number}
     */
    max_segments_of_cross_point: 40,
    /**
     * 贪心算法的最大城市数
     * @type {number}
     */
    max_cities_of_greedy: 300,
    /**
     * 是否进行距离四舍五入
     * @type {boolean}
     */
    distance_round: false,
    /**
     * 相对信息熵因子
     * @type {number}
     */
    relative_Information_Entropy_Factor: relative_Information_Entropy_Factor,
    /**
     * 沉淀期的最大数量
     * @type {number}
     */
    max_number_of_stagnation: max_number_of_stagnation,
    /**
     * 第一类种群的数量
     * @type {number}
     */
    number_of_populations_of_the_first_category: 2,
    /**
     * 第二类种群的数量
     * @type {number}
     */
    number_of_the_second_type_of_population: 2,
    /**
     * 种群间通信迭代周期
     * @type {number}
     */
    population_communication_iterate_cycle: 15,
    /**
     * 全局信息素挥发系数
     * @type {number}
     */
    global_pheromone_volatilization_coefficient: 0.1,
    /**
     * 局部信息素挥发系数
     * @type {number}
     */
    local_pheromone_volatilization_coefficient: 0.1,
    /**
     * 选择参数 q0 的最大值
     * @type {number}
     */
    path_selection_parameter_q0_max: 0.9,
    /**
     * 选择参数 q0 的最小值
     * @type {number}
     */
    path_selection_parameter_q0_min: 0.4,
    /**
     * 第二类种群的alpha值
     * @type {number}
     */
    alpha_for_the_second_type_of_population: 1,
    /**
     * 第二类种群的beta值
     * @type {number}
     */
    beta_for_the_second_type_of_population: 2,
    /**
     * 种群类型
     * @type {string}
     */
    ClassOfPopulation: "",
    /**
     * 通信信息素挥发系数
     * @type {number}
     */
    pheromone_volatilization_coefficient_of_communication: 0.3,
    /**
     * 多种群相似性评估系数
     * @type {number}
     */
    Multi_Population_Similarity_evaluation_coefficient: 0.85,
    /**
     * 判断相似性的周期
     * @type {number}
     */
    Period_of_judgment_similarity: 10,
    /**
     * 高相似性阈值
     * @type {number}
     */
    High_similarity_threshold: 0.9,
    /**
     * 衰弱后的信息素最小系数
     * @type {number}
     */
    Coefficient_of_the_minimum_after_pheromone_weakening: 0.3,
};
