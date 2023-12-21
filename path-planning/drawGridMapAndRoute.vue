<template>
    <canvas id="grid-map-canvas" ref="grid_map_canvas"></canvas>
</template>

<script setup lang="ts">
import { effect, onMounted, ref } from "vue";
import { GridMapFromArray } from "./GridMapFromArray";
import { drawGrid } from "./drawGrid";
import { drawMap } from "./drawGridMap";
// import { useElementSize } from "@vueuse/core";

import {
    useWindowSize,
    useMouseInElement,
    useEventListener,
} from "@vueuse/core";
import { drawGridRoute } from "./drawGridRoute";
import { drawdisplayMouseCoordinates } from "./drawdisplayMouseCoordinates";
import { debounce } from "lodash-es";
import { clearCanvas } from "./clearCanvas";
// const { width, height } = useElementSize(document.body);

const props = defineProps<
    Partial<{
        map?: number[][];
        route?: [number, number][];
        column?: number;
        row?: number;
        grid?: boolean;
        label: boolean;
    }>
>();
const windowSize = useWindowSize();
const grid_map_canvas = ref<HTMLCanvasElement>();
const gridMap = props.map ? GridMapFromArray(props.map) : undefined;

const route: [number, number][] | undefined = props.route;
onMounted(() => {
    render();
});
onMounted(() => {
    useEventListener(grid_map_canvas, "mousemove", (/* e */) => {
        // console.log(e.key);
        render();
    });
});
const mousePositionInElement = useMouseInElement(grid_map_canvas);

const render = debounce(function render() {
    const canvas = grid_map_canvas.value;
    if (canvas) {
        clearCanvas(canvas);
        if (gridMap) drawMap(gridMap, canvas);

        const row = gridMap?.row ?? props.row;
        const column = gridMap?.column ?? props.column;
        if (props.grid && row && column) drawGrid(column, row, canvas);
        if (route && row && column) {
            drawGridRoute(route, canvas, column, row);
        }
        if (mousePositionInElement.isOutside.value === false && row && column)
            drawdisplayMouseCoordinates(
                canvas,
                {
                    x: mousePositionInElement.elementX.value,
                    y: mousePositionInElement.elementY.value,
                },
                column,
                row,
            );
    }
});

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
