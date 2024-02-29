// import { DataOfFinishOneRoute } from "../functions/DataOfFinishOneRoute";
import type { ECBasicOption } from "echarts/types/dist/shared.d.ts";
import { computed, Ref } from "vue";

import { get_options_route_number_and_current_length_chart } from "./get_options_route_number_and_current_length_chart";
import { getoptionsOfIterationAndIterationWorstLength } from "./getOptionsOfRouteNumberAndBestLengthChartOfIndividualPopulations";
import { DataOfFinishOneIteration } from "../functions/DataOfFinishOneIteration";
/**
 * 使用选项和路线长度图表的选项
 * @param IterationDataOfIndividualPopulationsRef 一个迭代数据的引用
 * @returns 包含选项的对象
 */
export function useOptionsOfRoutesAndRouteLengthChart(
    IterationDataOfIndividualPopulationsRef: Ref<DataOfFinishOneIteration[][]>,
): {
    optionsOfIterationAndIterationWorstLength: Ref<ECBasicOption>;
    optionsOfIterationAndIterationAverageLength: Ref<ECBasicOption>;
} {
    // const RouteDataOfIndividualPopulationsRef = ref(
    //     [] as DataOfFinishOneRoute[][]
    // );
    const optionsOfIterationAndIterationAverageLength: Ref<ECBasicOption> =
        computed(() =>
            get_options_route_number_and_current_length_chart(
                IterationDataOfIndividualPopulationsRef.value,
            ),
        );
    const optionsOfIterationAndIterationWorstLength: Ref<ECBasicOption> =
        computed(() =>
            getoptionsOfIterationAndIterationWorstLength(
                IterationDataOfIndividualPopulationsRef.value,
            ),
        );

    // function onUpdateRouteDataOfIndividualPopulations(
    //     RouteDataOfIndividualPopulations: DataOfFinishOneRoute[][]
    // ) {
    //     if (RouteDataOfIndividualPopulationsRef.value.length == 0) {
    //         RouteDataOfIndividualPopulationsRef.value =
    //             RouteDataOfIndividualPopulations;
    //     } else {
    //         RouteDataOfIndividualPopulations.forEach((a, i) =>
    //             RouteDataOfIndividualPopulationsRef.value[i].push(...a)
    //         );
    //     }
    // }
    return {
        optionsOfIterationAndIterationWorstLength,
        optionsOfIterationAndIterationAverageLength:
            optionsOfIterationAndIterationAverageLength,
        // onUpdateRouteDataOfIndividualPopulations,
    };
}
