<template>
    <canvas id="grid-map-canvas" ref="grid_map_canvas"></canvas>
</template>

<script setup lang="ts">
import { GridMapFromArray } from "./GridMapFromArray";
import { drawMap, drawGrid } from "./drawGridMap";
import { onMounted } from "vue";
import { ref, effect } from "vue";
// import { useElementSize } from "@vueuse/core";

import { useWindowSize } from "@vueuse/core";
import { drawGridRoute } from "./drawGridRoute";
// const { width, height } = useElementSize(document.body);

const props = defineProps<{
    map?: number[][];
    route?: [number, number][];
    column?: number;
    row?: number;
    grid?: boolean;
}>();
const windowSize = useWindowSize();
const grid_map_canvas = ref<HTMLCanvasElement>();
const gridMap = props.map ? GridMapFromArray(props.map) : undefined;

const route: [number, number][] | undefined = props.route;
onMounted(() => {
    render();
});
function render() {
    const canvas = grid_map_canvas.value;
    if (canvas) {
        if (gridMap) drawMap(gridMap, canvas);

        const row = gridMap?.row ?? props.row;
        const column = gridMap?.column ?? props.column;
        if (props.grid && row && column) drawGrid(column, row, canvas);
        if (route && row && column) {
            drawGridRoute(route, canvas, column, row);
        }
    }
}
effect(() => {
    const canvas = grid_map_canvas.value;
    if (canvas) {
        // console.log(width.value, windowSize.width.value, window.innerWidth);
        // console.log(height.value, windowSize.height.value, window.innerHeight);
        canvas.width =
            /* width.value + */

            (windowSize.width.value + window.innerWidth) / 2;
        canvas.height =
            /* height.value + */

            (windowSize.height.value + window.innerHeight) / 2;

        render();
    }
});
</script>
