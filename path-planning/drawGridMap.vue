<template>
    <canvas id="grid-map-canvas" ref="grid_map_canvas"></canvas>
</template>

<script setup lang="ts">
import { drawGridMap } from "./drawGridMap";
import { GridMap } from "./grid-map";
import { onMounted } from "vue";
import { ref } from "vue";
const grid_map_canvas = ref<HTMLCanvasElement>();
const gridMap = new GridMap(10, 10, [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 0, 0, 0, 0, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 0, 0, 0, 0, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
]);
onMounted(() => {
    const canvas = grid_map_canvas.value;
    if (canvas) drawGridMap(gridMap, canvas);
});
</script>
