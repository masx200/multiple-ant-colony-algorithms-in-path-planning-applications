// import { DataOfFinishOneRoute } from "../functions/DataOfFinishOneRoute";
import type { ECBasicOption } from "echarts/types/dist/shared.d.ts";

import { createMultipleLinesChartOptions } from "../functions/createMultipleLinesChartOptions";
import { DataOfFinishOneIteration } from "../functions/DataOfFinishOneIteration";
import { ECOption } from "../functions/echarts-line";

export const 迭代次数和迭代平均路径长度 = "迭代次数和迭代平均路径长度";
export function get_options_route_number_and_current_length_chart(
    RouteDataOfIndividualPopulations: DataOfFinishOneIteration[][],
): ECBasicOption & ECOption {
    const title_text = 迭代次数和迭代平均路径长度;

    const datas: [number, number][][] = RouteDataOfIndividualPopulations.map(
        (a) => a.map((d, i) => [i + 1, d.average_length_of_iteration]),
    );
    return createMultipleLinesChartOptions({
        yAxis_min: 0,
        title_text,
        datas: datas,
    });
}
