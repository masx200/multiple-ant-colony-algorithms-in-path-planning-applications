import { worker_error_listener } from "../functions/worker_error_listener";
import { create_Worker_comlink } from "./create_Worker_comlink";
import { TSP_Worker_API } from "./TSP_Worker_API";
import { TSP_Worker_Remote } from "./TSP_Worker_Remote";
import { TSPRunnerOptions } from "./TSPRunnerOptions";

/**
 * 创建一个TSP_Worker_comlink实例
 * @param options TSPRunnerOptions对象
 * @returns TSP_Worker_Remote对象
 */
export async function create_TSP_Worker_comlink(
    options: TSPRunnerOptions,
): Promise<TSP_Worker_Remote> {
    // 创建Worker实例
    const {
        worker,
        terminate,
        remote: runner,
    } = create_Worker_comlink<TSP_Worker_API>(() => {
        // 创建一个新的Worker实例
        const w = new Worker(
            new URL("./TSP_Runner.Worker.ts", import.meta.url),
            {
                type: "module",
            },
        );

        return w;
    }, worker_error_listener);
    // 初始化runner
    await runner.init_runner(options);

    // 创建remote实例
    const remote = Object.create(runner, {}) as typeof runner;
    return { remote, worker, terminate };
}
