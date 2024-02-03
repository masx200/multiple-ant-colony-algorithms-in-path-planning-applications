import { TSPDefaultOptions } from "../src/TSPRunnerOptions";
import { WorkerRemoteAndInfo } from "./MultiPopulationSchedulerCreate";
import { createWorkerRemoteAndInfo } from "./createWorkerRemoteAndInfo";

/**
 * 初始化远程工作者
 * @param number_of_populations_of_the_first_category 第一类人口数量
 * @param options TSP默认选项与部分选项的合并
 * @param number_of_the_second_type_of_population 第二类人口数量
 * @returns 远程工作者数组
 */
export async function initializeRemoteWorkers(
    number_of_populations_of_the_first_category: number,
    options: Required<TSPDefaultOptions> & {
        node_coordinates: number[][];
    } & Partial<TSPDefaultOptions> & { start: number; end: number },
    number_of_the_second_type_of_population: number,
) {
    const remoteWorkers: WorkerRemoteAndInfo[] = [];
    await createWorkerRemoteAndInfo(
        number_of_populations_of_the_first_category,
        options,
        remoteWorkers,
        "动态信息素更新",
    );
    await createWorkerRemoteAndInfo(
        number_of_the_second_type_of_population,
        options,
        remoteWorkers,
        "相似度的自适应",
    );
    return remoteWorkers;
}
