import { DataOfFinishOneIteration } from "../functions/DataOfFinishOneIteration";
import { TSP_Output_Data } from "../functions/TSP_Output_Data";
import { RunnerMultipleCommunicative } from "../src/RunnerMultipleCommunicative";
import { TSPRunnerOptions } from "../src/TSPRunnerOptions";

// 公共的TSP执行类型
export type COMMON_TSP_EXECUTION = {
    // 运行一次迭代
    runOneIteration: () => Promise<void>;
    // 获取输出数据并消耗迭代和路线数据
    getOutputDataAndConsumeIterationAndRouteData: () => Promise<COMMON_TSP_Output>;
} & RunnerMultipleCommunicative;

// 公共的TSP输出类型
export type COMMON_TSP_Output = {
    // 总共运行的毫秒数
    total_time_ms: number;
    // 当前迭代次数
    current_iterations: number;
    // 当前搜索次数
    current_search_count: number;
    // 迭代数据的变化
    delta_data_of_iterations: COMMON_DataOfOneIteration[];
    // 最佳路线的毫秒数
    time_of_best_ms: number;
    // 最佳路线
    global_best_route: number[];
    // 最佳路线长度
    global_best_length: number;
    // 最佳路线的搜索次数
    search_count_of_best: number;
} & TSP_Output_Data;

// 公共的迭代数据类型
export type COMMON_DataOfOneIteration = {
    // 当前迭代次数
    current_iterations: number;
    // 最佳路线长度
    global_best_length: number;
    // 迭代最佳长度
    iterate_best_length: number;
    // 迭代的相对信息熵
    population_relative_information_entropy: number;
    // 平均迭代长度
    average_length_of_iteration: number;
    // 最差迭代长度
    worst_length_of_iteration: number;
    // 迭代的毫秒数
    time_ms_of_one_iteration: number;
} & DataOfFinishOneIteration;

// 公共的TSP选项类型
export type COMMON_TSP_Options = {
    // 距离是否四舍五入
    distance_round?: boolean;
    // alpha-zero参数
    alpha_zero?: number | undefined;
    // beta-zero参数
    beta_zero?: number | undefined;
    // 蚁群数量
    count_of_ants?: number | undefined;
    // 节点的坐标
    node_coordinates: number[][];

    // 当地信息素挥发系数
    local_pheromone_volatilization_coefficient?: number;
    // 全局信息素挥发系数
    global_pheromone_volatilization_coefficient?: number;
} & TSPRunnerOptions & { start: number; end: number };
