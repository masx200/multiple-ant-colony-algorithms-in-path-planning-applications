import { expose } from "comlink";

import { assert_true } from "../test/assert_true";
import { ClassOfPopulationToConstructor } from "./ClassOfPopulationToConstructor";
import { RunnerMultipleCommunicative } from "./RunnerMultipleCommunicative";
import { TSP_Worker_API } from "./TSP_Worker_API";
import { TSPRunnerOptions } from "./TSPRunnerOptions";

let runner: RunnerMultipleCommunicative | undefined = undefined;
function init_runner(options: TSPRunnerOptions) {
    if (runner) {
        throw new Error("cannot init runner twice");
    }
    assert_true(typeof options.ClassOfPopulation === "string");
    const createTSPrunner =
        ClassOfPopulationToConstructor[options.ClassOfPopulation]?.();
    assert_true(typeof createTSPrunner === "function");
    runner = createTSPrunner(options);
    Object.assign(API, runner);
    // console.log(API);
}

const API: TSP_Worker_API = { init_runner } as TSP_Worker_API;
expose(API);
self.addEventListener("unhandledrejection", (e) => {
    // console.log(self);
    // console.error(e);
    throw e.reason;
});
