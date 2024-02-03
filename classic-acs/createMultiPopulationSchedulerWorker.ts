import { worker_error_listener } from "../functions/worker_error_listener";
import { create_Worker_comlink } from "../src/create_Worker_comlink";
import { TSPRunnerOptions } from "../src/TSPRunnerOptions";
import { MultiPopulationSchedulerAPI } from "./MultiPopulationSchedulerAPI";
import { MultiPopulationSchedulerRemote } from "./MultiPopulationSchedulerRemote";

/**
 * 创建多人口调度器工作线程
 * @param options TSPRunnerOptions配置选项
 * @returns Promise<MultiPopulationSchedulerRemote> 多人口调度器工作线程的远程对象
 */
export async function createMultiPopulationSchedulerWorker(
    options: TSPRunnerOptions,
): Promise<MultiPopulationSchedulerRemote> {
    // 创建工作线程
    const {
        worker,
        terminate,
        remote: runner,
    } = create_Worker_comlink<MultiPopulationSchedulerAPI>(() => {
        // 创建新的Worker实例
        const w = new Worker(
            new URL("./MultiPopulationScheduler.worker.ts", import.meta.url),
            {
                type: "module",
            },
        );

        return w;
    }, worker_error_listener);
    // 初始化工作线程
    await runner.init_runner(options);

    // 创建远程对象
    const remote = Object.create(runner, {}) as typeof runner;
    return { remote, worker, terminate };
}
