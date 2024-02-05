import { MultiPopulationOutput } from "../classic-acs/MultiPopulationOutput";
/**
 * 远程运行器类型
 */
export type RunnerRemote = {
    /**
     * 运行迭代次数
     * @param iterations 迭代次数
     * @returns 运行迭代的Promise
     */
    runIterations: (iterations: number) => Promise<void>;

    /**
     * 获取输出数据并消费迭代数据并路由数据
     * @returns 获取输出数据的Promise
     */
    getOutputDataAndConsumeIterationAndRouteData: () => Promise<MultiPopulationOutput>;
};
