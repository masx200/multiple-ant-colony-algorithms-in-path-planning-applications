<template>
    <div><canvas id="grid-map-canvas" ref="grid_map_canvas"></canvas></div>
</template>

<script setup lang="ts">
import { effect, onMounted, ref, watch } from "vue";
import { GridMapFromArray } from "./GridMapFromArray";
import { drawMap } from "./drawGridMap";
import { drawGridlines } from "./drawGridlines.ts";
// import { useElementSize } from "@vueuse/core";
import {
    useEventListener,
    useMouseInElement,
    useWindowSize,
} from "@vueuse/core";
import { debounce } from "lodash-es";
import { debounce_animation_frame } from "../src/debounce_animation_frame";
import { clearCanvas } from "./clearCanvas";
import { drawGridRoute } from "./drawGridRoute";
import { draw_PointsInsideAllConvexPolygons } from "./draw_PointsInsideAllConvexPolygons";
import { drawMouseCoordinatesText } from "./drawdisplayMouseCoordinates";
// const { width, height } = useElementSize(document.body);
import { useIntersectionObserver } from "@vueuse/core";
const render = debounce_animation_frame(
    debounce(function render() {
        if (!targetIsVisible.value) {
            return;
        }
        const route: [number, number][] | undefined = props.route;
        const canvas = grid_map_canvas.value;
        if (canvas) {
            console.log("render");
            clearCanvas(canvas);
            const gridMap = props.map ? GridMapFromArray(props.map) : undefined;
            if (gridMap) drawMap(gridMap, canvas);

            const row = gridMap?.row ?? props.row;
            const column = gridMap?.column ?? props.column;
            if (props.grid && row && column) drawGridlines(column, row, canvas);

            if (props.pointsInsideAllConvexPolygons && row && column) {
                draw_PointsInsideAllConvexPolygons(
                    column,
                    row,
                    canvas,
                    props.pointsInsideAllConvexPolygons,
                );
            }
            if (route && row && column) {
                drawGridRoute(route, canvas, column, row);
            }
            if (
                props.label &&
                mousePositionInElement.isOutside.value === false &&
                row &&
                column
            )
                drawMouseCoordinatesText(
                    canvas,
                    {
                        x: mousePositionInElement.elementX.value,
                        y: mousePositionInElement.elementY.value,
                    },
                    column,
                    row,
                );
        }
    }),
);
const targetIsVisible = ref(false);
onMounted(() => {
    useIntersectionObserver(
        grid_map_canvas,
        ([{ isIntersecting }] /* observerElement */) => {
            targetIsVisible.value = isIntersecting;
        },
    );
});
const props = defineProps<
    Partial<{
        map?: number[][];
        route?: [number, number][];
        column?: number;
        row?: number;
        grid?: boolean;
        label: boolean;
        pointsInsideAllConvexPolygons: Iterable<[number, number]>;
    }>
>();
const windowSize = useWindowSize();
const grid_map_canvas = ref<HTMLCanvasElement>();

onMounted(() => {
    render();
    useEventListener(window, "scroll", (/* e */) => {
        // console.log(e.key);
        render();
    });
});
onMounted(() => {
    useEventListener(grid_map_canvas, "mousemove", (/* e */) => {
        // console.log(e.key);
        render();
    });
});

const mousePositionInElement = useMouseInElement(grid_map_canvas);

watch(() => props, render);
effect(() => {
    const canvas = grid_map_canvas.value;
    if (canvas) {
        var width = (windowSize.width.value + window.innerWidth) / 2;
        var height = (windowSize.height.value + window.innerHeight) / 2;
        const gridMap = props.map ? GridMapFromArray(props.map) : undefined;

        if (gridMap) {
            const cellSize = Math.min(
                height / gridMap.column,
                width / gridMap.row,
            );

            canvas.width = cellSize * gridMap.row;
            canvas.height = cellSize * gridMap.column;
        } else {
            canvas.width =
                /* width.value + */

                (windowSize.width.value + window.innerWidth) / 2;
            canvas.height =
                /* height.value + */

                (windowSize.height.value + window.innerHeight) / 2;
        }
        // console.log(width.value, windowSize.width.value, window.innerWidth);
        // console.log(height.value, windowSize.height.value, window.innerHeight);

        render();
    }
});
</script>
