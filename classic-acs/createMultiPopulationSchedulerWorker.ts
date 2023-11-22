import { TSPRunnerOptions } from "../src/TSPRunnerOptions";

import { worker_error_listener } from "../functions/worker_error_listener";
import { create_Worker_comlink } from "../src/create_Worker_comlink";
import { MultiPopulationSchedulerAPI } from "./MultiPopulationSchedulerAPI";
import { MultiPopulationSchedulerRemote } from "./MultiPopulationSchedulerRemote";
export async function createMultiPopulationSchedulerWorker(
    options: TSPRunnerOptions
): Promise<MultiPopulationSchedulerRemote> {
    const {
        worker,
        terminate,
        remote: runner,
    } = create_Worker_comlink<MultiPopulationSchedulerAPI>(() => {
        const w = new Worker(
            new URL("./MultiPopulationScheduler.worker.ts", import.meta.url),
            {
                type: "module",
            }
        );

        return w;
    }, worker_error_listener);
    await runner.init_runner(options);

    const remote = Object.create(runner, {}) as typeof runner;
    return { remote, worker, terminate };
}
