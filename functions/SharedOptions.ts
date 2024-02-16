import { GridVisibilityChecker } from "../path-planning/GridVisibilityChecker";
import { TSPRunnerOptions } from "../src/TSPRunnerOptions";
import { ReadOnlyPheromone } from "./ReadOnlyPheromone";
/**
 * 公用选项类型
 */
export type SharedOptions = Required<TSPRunnerOptions> & {
    /**
     * 获取收敛系数
     */
    get_convergence_coefficient: () => number;

    /**
     * 根据当前城市获取最优路径和最新路径的邻居城市
     * @param current_city 当前城市
     * @returns 邻居城市数组
     */
    // get_neighbors_from_optimal_routes_and_latest_routes: (
    //     current_city: number,
    // ) => number[];

    /**
     * 获取随机选择概率
     */
    get_random_selection_probability: () => number;

    /**
     * 获取最佳路径数量
     */
    getSearchCountOfBest: () => number;

    /**
     * 获取最佳路径
     * @returns 最佳路径数组
     */
    getBestRoute: () => number[];

    /**
     * 获取最佳路径长度
     */
    getBestLength: () => number;

    /**
     * 设置全局最佳路径
     * @param route 最佳路径数组
     * @param length 最佳路径长度
     */
    set_global_best: (route: number[], length: number) => void;

    /**
     * 获取当前搜索次数
     */
    getCurrentSearchCount: () => number;

    /**
     * 节点数量
     */
    count_of_nodes: number;

    /**
     * 2-opt算法的最大结果数量
     */
    max_results_of_2_opt: number;

    /**
     * k-opt算法的最大结果数量
     */
    max_results_of_k_opt: number;

    /**
     * Alpha零值
     */
    alpha_zero: number;

    /**
     * Beta零值
     */
    beta_zero: number;

    /**
     * 蚂蚁数量
     */
    count_of_ants: number;

    /**
     * 节点坐标
     */
    node_coordinates: number[][];

    /**
     * 蚁群素存储
     */
    pheromoneStore: ReadOnlyPheromone;
} & { start: number; end: number } & GridVisibilityChecker & {
        getGridDistance: (a: [number, number], b: [number, number]) => number;
    };
