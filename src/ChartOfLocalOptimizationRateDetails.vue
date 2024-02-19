<template>
    <details
        class="width-100-percent"
        :open="show_chart_of_local_optimization_rate"
        @toggle="show_chart_of_local_optimization_rate = $event.target.open"
    >
        <summary>迭代次数和局部优化的比率</summary>
        <div class="chart-container" style="">
            <LineChart
                v-if="show_chart_of_local_optimization_rate"
                class="single-chart"
                style=""
                :options="options_of_iterations_and_local_optimization_rate"
            ></LineChart>
        </div>
    </details>
</template>

<script setup lang="ts">
import { ECBasicOption } from "echarts/types/dist/shared";
import LineChart from "./LineChart.vue";
defineProps<{
    options_of_iterations_and_local_optimization_rate: ECBasicOption;
}>();
const show_chart_of_local_optimization_rate = defineModel<any>(
    "show_chart_of_local_optimization_rate",
    { required: true },
);
</script>
<style scoped>
.single-chart {
    min-height: 500px;
    max-width: 100%;
    width: 100%;
    min-width: 300px;
    max-height: 100%;
}
.chart-container {
    max-width: 100%;
    display: flex;
    max-height: 100%;
    width: 100%;
    align-items: center;
    align-content: center;
    justify-content: center;
    flex-wrap: nowrap;
}
.width-100-percent {
    width: 100%;
}
</style>
