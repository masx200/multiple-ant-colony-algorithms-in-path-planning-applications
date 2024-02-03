import { CommonTspRunner } from "../classic-acs/CommonTspRunner";
import { COMMON_TSP_Output } from "../classic-acs/tsp-interface";
/**
 * 多次运行的可交流的求解器接口
 */
export interface RunnerMultipleCommunicative extends CommonTspRunner {
    /**
     * 获取总运行时间（毫秒）
     */
    getTotalTimeMs: () => number;
    /**
     * 运行一次迭代
     */
    runOneIteration: () => Promise<void>;
    /**
     * 运行多次迭代
     * @param iterations 迭代次数
     */
    runIterations: (iterations: number) => Promise<void>;
    /**
     * 获取输出数据并消耗迭代和路线数据
     */
    getOutputDataAndConsumeIterationAndRouteData: () => Promise<COMMON_TSP_Output>;
    /**
     * 获取当前搜索次数
     */
    getCurrentSearchCount(): number;
    /**
     * 更新最佳路线
     * @param route 路线数组
     * @param length 路线长度
     */
    updateBestRoute(route: number[], length: number): void;
    /**
     * 平滑信息素
     * @param similarity 相似度
     */
    smoothPheromones(similarity: number): void;
    /**
     * 获取最佳路线长度
     */
    getBestLength: () => number;
    /**
     * 获取最佳路线
     */
    getBestRoute: () => number[];
    /**
     * 奖励公共路线
     * @param common 公共路线数组
     */
    rewardCommonRoutes(common: number[][]): void;
    /**
     * 获取最近迭代周期内的最佳路线
     * @param period 周期
     */
    getLatestIterateBestRoutesInPeriod(period: number): number[][];
    /**
     * 获取更好的路线集合
     */
    getCollectionOfBetterRoutes(): number[][];
}
