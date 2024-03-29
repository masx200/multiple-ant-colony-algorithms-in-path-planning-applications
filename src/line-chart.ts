import type { ECBasicOption } from "echarts/types/dist/shared.d.ts";
import { throttle } from "lodash-es";
import { defineComponent, onMounted, PropType, watch } from "vue";

import { run_idle_work } from "../functions/run_idle_work";
import { debounce_animation_frame } from "./debounce_animation_frame";
import { drawChartWait } from "./drawChartMaxWait";
import { use_escharts_container_pair } from "./use_escharts_container_pair";
/**
 * This component is responsible for rendering a chart using ECharts.
 * It takes in an options object as a prop and uses it to configure the chart.
 */
export default defineComponent({
    props: {
        options: { required: true, type: Object as PropType<ECBasicOption> },
    },
    setup(props) {
        const debounced_update = throttle(
            debounce_animation_frame(function update_chart() {
                if (!chart.value) {
                    return;
                }

                chart.value.resize();
                chart.value.setOption(props.options, { lazyUpdate: true });
            }),
            drawChartWait,
        );
        const { container: container, chart: chart } =
            use_escharts_container_pair();

        const update_chart = function () {
            run_idle_work(debounced_update, 4000);
        };
        onMounted(() => {
            update_chart();
            watch(props, () => {
                update_chart();
            });

            watch(chart, () => {
                update_chart();
            });
        });

        return { container };
    },
});
