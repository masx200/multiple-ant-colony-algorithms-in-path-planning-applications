import type { ECBasicOption } from "echarts/types/dist/shared.d.ts";
import { computed, Ref, ref } from "vue";

import { COMMON_DataOfOneIteration } from "../classic-acs/tsp-interface";
import {
    get_options_iterations_and_information_entropy_chart,
    迭代次数和相对信息熵,
} from "./get_options_iterations_and_information_entropy_chart";
import { getOptionsOfIterationsAndPopulationSimilarityChart } from "./getOptionsOfIterationsAndPopulationSimilarityChart";

/**
 * 使用迭代次数和相对信息熵图表的选项
 * @returns 包含选项、更新迭代数据的函数和迭代数据引用的对象
 */
export function useOptionsOfIterationsAndInformationEntropyChart(): {
    optionsOfIterationsAndPopulationSimilarityChart: Ref<ECBasicOption>;
    options_of_iterations_and_information_entropy_chart: Ref<ECBasicOption>;
    options_of_iterations_and_local_optimization_rate: Ref<ECBasicOption>;
    onUpdateIterationDataOfIndividualPopulations: (
        IterationDataOfIndividualPopulations: COMMON_DataOfOneIteration[][],
    ) => void;
    IterationDataOfIndividualPopulationsRef: Ref<
        {
            current_iterations: number;
            global_best_length: number;
            iterate_best_length: number;
            population_relative_information_entropy: number;
            average_length_of_iteration: number;
            worst_length_of_iteration: number;
            time_ms_of_one_iteration: number;
            random_selection_probability: number;
            optimal_length_of_iteration: number;
            convergence_coefficient: number;
            id_Of_Population?: number | undefined;
            Intra_population_similarity: number;
            ClassOfPopulation?: string | undefined;
            local_optimization_route_rate: number;
        }[][]
    >;
} {
    // 引用迭代数据的数组
    const IterationDataOfIndividualPopulationsRef = ref(
        [] as COMMON_DataOfOneIteration[][],
    );
    // 计算迭代次数和相对信息熵图表的选项
    const options_of_iterations_and_information_entropy_chart: Ref<ECBasicOption> =
        computed(() =>
            get_options_iterations_and_information_entropy_chart(
                IterationDataOfIndividualPopulationsRef.value,
                (d) => d.population_relative_information_entropy,
                迭代次数和相对信息熵,
            ),
        );
    // 计算迭代次数和种群相似度图表的选项
    const optionsOfIterationsAndPopulationSimilarityChart: Ref<ECBasicOption> =
        computed(() =>
            getOptionsOfIterationsAndPopulationSimilarityChart(
                IterationDataOfIndividualPopulationsRef.value,
            ),
        );
    // 更新迭代数据的函数
    function onUpdateIterationDataOfIndividualPopulations(
        IterationDataOfIndividualPopulations: COMMON_DataOfOneIteration[][],
    ) {
        // 如果迭代数据数组为空，则直接赋值
        if (IterationDataOfIndividualPopulationsRef.value.length == 0) {
            IterationDataOfIndividualPopulationsRef.value =
                IterationDataOfIndividualPopulations;
        } else {
            // 否则，将新数据追加到数组中
            IterationDataOfIndividualPopulations.forEach((a, i) =>
                IterationDataOfIndividualPopulationsRef.value[i].push(...a),
            );
        }
    }
    // 返回包含选项、更新迭代数据的函数和迭代数据引用的对象
    return {
        optionsOfIterationsAndPopulationSimilarityChart,
        options_of_iterations_and_information_entropy_chart,
        onUpdateIterationDataOfIndividualPopulations,
        IterationDataOfIndividualPopulationsRef,
        options_of_iterations_and_local_optimization_rate: computed(() =>
            get_options_iterations_and_information_entropy_chart(
                IterationDataOfIndividualPopulationsRef.value,
                (d) => d.local_optimization_route_rate,
                "迭代次数和局部优化的比率",
            ),
        ),
    };
}
