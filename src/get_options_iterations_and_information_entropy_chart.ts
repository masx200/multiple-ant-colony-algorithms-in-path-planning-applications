import type { ECBasicOption } from "echarts/types/dist/shared.d.ts";

import { createMultipleLinesChartOptions } from "../functions/createMultipleLinesChartOptions";
import { DataOfFinishOneIteration } from "../functions/DataOfFinishOneIteration";
import { ECOption } from "../functions/echarts-line";

export const 迭代次数和相对信息熵 = "迭代次数和相对信息熵";
/**
 * 获取迭代次数和相对信息熵的图表选项
 * @param IterationDataOfIndividualPopulations 每个种群迭代数据的二维数组
 * @returns ECBasicOption和ECOption的组合
 */
export function get_options_iterations_and_information_entropy_chart(
    IterationDataOfIndividualPopulations: DataOfFinishOneIteration[][],
    selector: { (arg0: DataOfFinishOneIteration): any },
    title: string,
): ECBasicOption & ECOption {
    // 标题文本
    const title_text = title;

    // 将每个种群的迭代数据转换为二维数组
    const datas: [number, number][][] =
        IterationDataOfIndividualPopulations.map((a) =>
            a.map((d, i) => [i + 1, selector(d)]),
        );
    // 创建多条折线图的选项
    return createMultipleLinesChartOptions({
        yAxis_min: 0,
        title_text,
        datas: datas,
    });
}
