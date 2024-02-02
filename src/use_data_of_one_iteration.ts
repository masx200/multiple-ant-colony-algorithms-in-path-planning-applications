import { reactive } from "vue";

import { DataOfFinishOneIteration } from "../functions/DataOfFinishOneIteration";

/**
 * 使用数据进行一次迭代
 * @returns 一次迭代的数据对象
 */
export function use_data_of_one_iteration(): {
    oneiterationtableheads: string[];
    onReceiveDeltaDataOfOneIteration: (
        delta_data: DataOfFinishOneIteration[],
    ) => void;
    clearDataOfOneIteration: () => void;
    dataofoneiteration: DataOfFinishOneIteration[];
    oneiterationtablebody: string[][];
} {
    // 定义一次迭代的表头
    const oneiterationtableheads = [
        "序号",
        "信息熵",
        "随机选择概率",
        "耗时秒",
        "迭代最优长度",
        "迭代平均长度",
        "迭代最差长度",
        "全局最优长度",
        "局部优化长度",
        "收敛性系数",
        "内部相似度",
        "种群的类别",
        "种群的序号",
    ];
    /**
     * 接收一次迭代的增量数据
     * @param delta_data 增量数据数组
     */
    function onReceiveDeltaDataOfOneIteration(
        delta_data: DataOfFinishOneIteration[],
    ) {
        for (let i = 0; i < delta_data.length; i++) {
            const data = delta_data[i];
            dataofoneiteration.push(data);
            oneiterationtablebody.push(
                [
                    oneiterationtablebody.length + 1,
                    data.population_relative_information_entropy,
                    data.random_selection_probability,
                    data.time_ms_of_one_iteration / 1000,
                    data.iterate_best_length,
                    data.average_length_of_iteration,
                    data.worst_length_of_iteration,
                    data.global_best_length,
                    data.optimal_length_of_iteration,
                    data.convergence_coefficient,
                    data.Intra_population_similarity,
                    data.ClassOfPopulation,
                    data.id_Of_Population,
                ].map(String),
            );
        }
    }

    /**
     * 清除一次迭代的数据
     */
    function clearDataOfOneIteration(): void {
        dataofoneiteration.length = 0;
    }
    // 一次迭代的数据数组
    const dataofoneiteration = reactive<DataOfFinishOneIteration[]>([]);
    // 一次迭代的表格主体
    const oneiterationtablebody: string[][] = reactive([]);

    return {
        oneiterationtableheads,
        onReceiveDeltaDataOfOneIteration,
        clearDataOfOneIteration,
        dataofoneiteration,
        oneiterationtablebody,
    };
}
