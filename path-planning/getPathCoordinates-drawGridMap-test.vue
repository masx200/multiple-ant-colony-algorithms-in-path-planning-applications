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
import map from "./屏幕截图-2023-11-24-162727_结果_结果test.json";

const start = new Point(11, 21);
const end = new Point(22, 1);

const route: Ref<[number, number][]> = ref([
    [start.x, start.y],
    [end.x, end.y],
]);

onMounted(() => {
    //const gridmap = GridMapFromArray(map);

    console.log(route.value);
    const path = [
        ...route.value,
        ...getPathCoordinates([start.x, start.y], [end.x, end.y]),
        ...route.value,
    ];
    console.log(path);
    route.value = path;
});

import { getPathCoordinates } from "./getPathCoordinates";
</script>
