import { COMMON_TSP_Output } from "../classic-acs/tsp-interface";
import { RunnerMultipleCommunicative } from "../src/RunnerMultipleCommunicative";
import { TSPRunnerOptions } from "../src/TSPRunnerOptions";
import { ReadOnlyPheromone } from "./ReadOnlyPheromone";
import { SharedOptions } from "./SharedOptions";
/**
 * TSP运行器的类型定义
 */
export type TSP_Runner = Required<TSPRunnerOptions> & // TSP运行器所需的必要选项
    SharedOptions & {
        // 公共选项
        count_of_nodes: number; // 节点数量
        get_random_selection_probability(): number; // 获取随机选择概率
        getTimeOfBest(): number; // 获取最佳时间
        getSearchCountOfBest(): number; // 获取最佳搜索次数

        runOneIteration: () => Promise<void>; // 运行一次迭代

        getTotalTimeMs: () => number; // 获取总时间（毫秒）

        runIterations: (iterations: number) => Promise<void>; // 运行迭代次数

        getCountOfIterations: () => number; // 获取迭代次数

        getBestLength: () => number; // 获取最佳长度
        getBestRoute: () => number[]; // 获取最佳路径
        getCurrentSearchCount: () => number; // 获取当前搜索次数
        pheromoneStore: ReadOnlyPheromone; // 只读pheromone存储

        [Symbol.toStringTag]: string; // 标记符

        node_coordinates: number[][]; // 节点坐标
        alpha_zero: number; // alpha零值
        beta_zero: number; // beta零值
        count_of_ants: number; // 蚂蚁数量

        getOutputDataAndConsumeIterationAndRouteData: () => Promise<COMMON_TSP_Output>; // 获取输出数据并消费迭代和路径数据
    } & RunnerMultipleCommunicative; // 多个通信的运行器
