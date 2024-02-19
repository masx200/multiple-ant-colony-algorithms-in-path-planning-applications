import { EChartsType } from "echarts";
import { onMounted, onUnmounted, Ref, ref, ShallowRef, shallowRef } from "vue";

import { use_create_chart_of_container } from "./use_create_chart_of_container";

/**
 * 使用ECharts容器对图表进行封装
 * @returns {object} 包含容器和图表的引用的对象
 */
export function use_escharts_container_pair(): {
    container: Ref<HTMLDivElement | undefined>;
    chart: ShallowRef<undefined | Pick<EChartsType, "resize" | "setOption">>;
} {
    // 定义容器引用
    const container = ref<HTMLDivElement>();
    // 定义图表引用
    const chart = shallowRef<Pick<EChartsType, "resize" | "setOption">>();

    // 在页面挂载时初始化图表
    onMounted(() => {
        const container_element = container.value;
        if (chart.value) {
            return;
        }
        if (container_element) {
            // 使用容器创建图表
            const bestchart = use_create_chart_of_container(
                container_element,
                onUnmounted,
            );
            chart.value = bestchart;
        }
    });

    return { chart, container };
}
