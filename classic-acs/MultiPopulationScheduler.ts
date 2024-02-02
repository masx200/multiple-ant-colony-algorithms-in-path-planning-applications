import { CommonTspRunner } from "./CommonTspRunner";
import { MultiPopulationOutput } from "./MultiPopulationOutput";
/**
 * 多人口调度器接口，继承自通用TSP运行器接口
 */
export interface MultiPopulationScheduler extends CommonTspRunner {
    /**
     * 获取输出数据并消费迭代和路由数据
     * @returns 返回一个Promise，解析为MultiPopulationOutput对象
     */
    getOutputDataAndConsumeIterationAndRouteData: () => Promise<MultiPopulationOutput>;
}
