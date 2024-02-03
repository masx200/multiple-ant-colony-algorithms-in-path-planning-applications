// import { tsp_similarity_execution_and_local_optimization_with_Optional_city_rewards_and_punishments } from "../classic-acs/tsp_similarity_execution_and_local_optimization_with_Optional-city-rewards-and-punishments";
// import { createTSPrunner } from "../functions/createTSPrunner";
import { RunnerMultipleCommunicative } from "./RunnerMultipleCommunicative";
import { TSPRunnerOptions } from "./TSPRunnerOptions";
/**
 * 将类名映射到对应的构造函数
 */
export const ClassOfPopulationToConstructor: Record<
    string,
    () => Promise<(input: TSPRunnerOptions) => RunnerMultipleCommunicative>
> = {
    动态信息素更新: async () =>
        (await import("../functions/createTSPrunner")).createTSPrunner,
    相似度的自适应: async () =>
        (
            await import(
                "../classic-acs/tsp_similarity_execution_and_local_optimization_with_Optional-city-rewards-and-punishments"
            )
        )
            .tsp_similarity_execution_and_local_optimization_with_Optional_city_rewards_and_punishments,
};
