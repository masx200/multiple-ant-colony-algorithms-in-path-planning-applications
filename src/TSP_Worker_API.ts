import { RunnerMultipleCommunicative } from "./RunnerMultipleCommunicative";
import { TSPRunnerOptions } from "./TSPRunnerOptions";
/**
 * TSP_Worker_API类型定义
 */
export type TSP_Worker_API = RunnerMultipleCommunicative & {
    /**
     * 初始化运行器
     * @param options 运行器选项
     * @returns 返回一个Promise对象，表示初始化操作的异步结果
     */
    init_runner: (options: TSPRunnerOptions) => Promise<void>;
};
