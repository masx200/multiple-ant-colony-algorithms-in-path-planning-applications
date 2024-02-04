import { GridVisibilityChecker } from "../path-planning/GridVisibilityChecker";

/**
 * 每个路由生成器的选项接口
 */
export interface EachRouteGeneratorOptions extends GridVisibilityChecker {
    /**
     * 2-opt算法的最大结果数
     */
    max_results_of_2_opt?: number;

    /**
     * 当前搜索计数
     */
    current_search_count: number;

    /**
     * 节点数量
     */
    count_of_nodes: number;

    /**
     * 节点坐标
     */
    node_coordinates: number[][];

    /**
     * alpha-zero
     */
    alpha_zero: number;

    /**
     * beta-zero
     */
    beta_zero: number;

    /**
     * 最后一次随机选择的概率
     */
    last_random_selection_probability: number;

    /**
     * k-opt算法的最大结果数
     */
    max_results_of_k_opt: number;

    /**
     * 获取最佳长度的函数
     */
    getBestLength: () => number;

    /**
     * 获取最佳路径的函数
     */
    getBestRoute: () => number[];

    /**
     * 勾选长度
     */
    greedy_length: number;

    /**
     * 超出最大范围的pheromone
     */
    pheromone_exceeds_maximum_range: () => boolean;

    /**
     * 可见网格列表，不包含所有凸多边形内的点
     */
    // visibleGridsList: (a: number, b: number) => Iterable<[number, number]>;
    // visibleGridsMatrix: (a: number, b: number, c: number, d: number) => boolean;
}
