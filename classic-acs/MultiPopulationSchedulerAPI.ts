import { TSPRunnerOptions } from "../src/TSPRunnerOptions";
import { MultiPopulationScheduler } from "./MultiPopulationScheduler";
/**
 * 多种人口调度器的API类型
 */
export type MultiPopulationSchedulerAPI = MultiPopulationScheduler & {
    /**
     * 初始化运行器
     * @param options 运行器选项
     * @returns 返回一个Promise对象，表示初始化操作的异步结果
     */
    init_runner: (options: TSPRunnerOptions) => Promise<void>;
};
