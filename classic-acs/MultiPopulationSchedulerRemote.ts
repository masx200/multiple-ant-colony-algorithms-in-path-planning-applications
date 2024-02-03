import { Remote } from "comlink";

import { MultiPopulationSchedulerAPI } from "./MultiPopulationSchedulerAPI";
/**
 * 多种人口调度器的远程接口
 */
export interface MultiPopulationSchedulerRemote {
    remote: Remote<MultiPopulationSchedulerAPI>; // 远程连接对象
    worker: Worker; // 工作线程对象
    terminate: () => void; // 终止函数
}
