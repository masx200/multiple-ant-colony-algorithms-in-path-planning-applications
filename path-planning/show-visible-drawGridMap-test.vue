<template>
    <DrawGridMapAndRoute
        :route="route"
        :column="map.length"
        :row="map[0].length"
        :grid="true"
        :map="map"
    ></DrawGridMapAndRoute>
</template>

<script setup lang="ts">
import { Ref, onMounted, ref } from "vue";
import { Point } from "./Point";
import DrawGridMapAndRoute from "./drawGridMapAndRoute.vue";
import map from "./screen-capture-2023-11-24-162727_result-result-test.json";

const start = new Point(0, 20);
const end = new Point(22, 1);

const route: Ref<[number, number][]> = ref([
    [start.x, start.y],
    [end.x, end.y],
]);

onMounted(() => {
    const gridmap = GridMapFromArray(map);
    const visibleGrids = findVisibleGridsCircle([start.x, start.y], gridmap);

    // console.log(visibleGrids);
    const path: [number, number][] = visibleGrids
        .map(([i, j]) => [
            [i, j],
            [start.x, start.y],
        ])
        .flat() as [number, number][];

    route.value = path;
});
// import { GridMapFromArray } from "./GridMapFromArray";
// import { drawGridMap } from "./drawGridMap";
// import { onMounted } from "vue";
// import { ref, effect } from "vue";
// // import { useElementSize } from "@vueuse/core";

// import { useWindowSize } from "@vueuse/core";
// import { drawGridRoute } from "./drawGridRoute";
// // const { width, height } = useElementSize(document.body);

// const windowSize = useWindowSize();
// const grid_map_canvas = ref<HTMLCanvasElement>();

// const { column, row } = gridMap;
//import route from "./test-route-23-22.json"; //: [number, number][] = ;
import { GridMapFromArray } from "./GridMapFromArray";
import { findVisibleGridsCircle } from "./findVisibleGridsCircle";
</script>
