import { COMMON_TSP_Output } from "./tsp-interface";

/**
 * 公共的TSP运行器接口
 */
export interface CommonTspRunner {
    /**
     * 获取最佳时间
     */
    getTimeOfBest(): number;

    /**
     * 获取最佳搜索次数
     */
    getSearchCountOfBest(): number;

    /**
     * 获取迭代次数
     */
    getCountOfIterations: () => number;

    /**
     * 运行一次迭代
     */
    runOneIteration: () => Promise<void>;

    /**
     * 获取输出数据并消费迭代和路线数据
     */
    getOutputDataAndConsumeIterationAndRouteData: () => Promise<COMMON_TSP_Output>;

    /**
     * 运行迭代次数
     * @param iterations 迭代次数
     */
    runIterations: (iterations: number) => Promise<void>;

    /**
     * 获取当前搜索次数
     */
    getCurrentSearchCount(): number;

    /**
     * 获取最佳长度
     */
    getBestLength: () => number;

    /**
     * 获取总耗时（以毫秒为单位）
     */
    getTotalTimeMs: () => number;

    /**
     * 获取最佳路线
     */
    getBestRoute: () => number[];
}
