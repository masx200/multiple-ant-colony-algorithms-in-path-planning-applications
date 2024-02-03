import { TSPDefaultOptions } from "../src/TSPRunnerOptions";
import { WorkerRemoteAndInfo } from "./MultiPopulationSchedulerCreate";
import { create_TSP_Worker_comlink } from "../src/create_TSP_Worker_comlink";

/**
 * 创建指定数量的远程工作器和信息
 * @param number_of_populations_of_the_first_category 第一类人口数量
 * @param options TSP默认选项和部分TSP默认选项的联合类型
 * @param remoteworkers 远程工作器数组
 * @param ClassOfPopulation 人口类别
 * @returns Promise
 */
export async function createWorkerRemoteAndInfo(
    number_of_populations_of_the_first_category: number,
    options: Required<TSPDefaultOptions> & {
        node_coordinates: number[][];
    } & Partial<TSPDefaultOptions> & { start: number; end: number },
    remoteworkers: WorkerRemoteAndInfo[],
    ClassOfPopulation: string,
) {
    for (
        let index = 0;
        index < number_of_populations_of_the_first_category;
        index++
    ) {
        const remote: WorkerRemoteAndInfo = Object.create(
            (
                await create_TSP_Worker_comlink(
                    structuredClone({
                        ...options,
                        ClassOfPopulation: ClassOfPopulation,
                    }),
                )
            ).remote,
        );
        Object.defineProperty(remote, "ClassOfPopulation", {
            value: ClassOfPopulation,
        });
        Object.defineProperty(remote, "id_Of_Population", {
            value: remoteworkers.length,
        });

        remoteworkers.push(remote);
    }
}
