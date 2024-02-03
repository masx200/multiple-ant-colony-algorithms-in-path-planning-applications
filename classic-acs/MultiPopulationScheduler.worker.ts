import { expose } from "comlink";

import { TSPRunnerOptions } from "../src/TSPRunnerOptions";
import { MultiPopulationScheduler } from "./MultiPopulationScheduler";
import { MultiPopulationSchedulerAPI } from "./MultiPopulationSchedulerAPI";
import { MultiPopulationSchedulerCreate } from "./MultiPopulationSchedulerCreate";

let runner: MultiPopulationScheduler | undefined = undefined;
/**
 * 初始化运行器
 * @param options 运行器选项
 */
async function init_runner(options: TSPRunnerOptions) {
    if (runner) {
        throw new Error("无法初始化运行器两次");
    }

    runner = await MultiPopulationSchedulerCreate(options);
    Object.assign(API, runner);
    // console.log(API);
}

const API: MultiPopulationSchedulerAPI = {
    init_runner,
} as MultiPopulationSchedulerAPI;
expose(API);
self.addEventListener("unhandledrejection", (e) => {
    // console.log(self);
    // console.error(e);
    throw e.reason;
});
