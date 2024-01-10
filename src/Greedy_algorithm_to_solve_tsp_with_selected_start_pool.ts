import { worker_error_listener } from "../functions/worker_error_listener";
import { create_Worker_comlink } from "./create_Worker_comlink";
import { createThreadPool } from "./createThreadPool";
import { GreedyWorkerAPI } from "./GreedyWorkerAPI";

export const Greedy_algorithm_to_solve_tsp_with_selected_start_pool =
    createThreadPool({
        terminate(w) {
            w.terminate();
        },
        maxThreads: navigator.hardwareConcurrency,
        minThreads: 1,
        create: () => {
            return create_Worker_comlink<GreedyWorkerAPI>(() => {
                const w = new Worker(
                    new URL(
                        "./Greedy_algorithm_to_solve_tsp_with_selected_start.worker.ts",
                        import.meta.url,
                    ),
                    {
                        type: "module",
                    },
                );

                return w;
            }, worker_error_listener);
        },
    });
