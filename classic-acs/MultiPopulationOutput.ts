import { COMMON_DataOfOneIteration, COMMON_TSP_Output } from "./tsp-interface";

// import { DataOfFinishOneRoute } from "../functions/DataOfFinishOneRoute";
/**
 * 多种人口输出类型
 */
export type MultiPopulationOutput = COMMON_TSP_Output & {
    /**
     * 所有种群相似度的历史记录
     */
    similarityOfAllPopulationsHistory: number[];
    /**
     * 各个种群在各代中的迭代数据
     */
    IterationDataOfIndividualPopulations: COMMON_DataOfOneIteration[][];
    // RouteDataOfIndividualPopulations: DataOfFinishOneRoute[][];
    /**
     * 各个种群在各代中的最佳路径更新历史记录
     */
    // HistoryOfPopulationsAllUpdateBestRoute: boolean[];
    HistoryOfTheWayPopulationsCommunicate: string[];
    HistoryOfPopulationsAllUpdateBestRoute: boolean[];
};
