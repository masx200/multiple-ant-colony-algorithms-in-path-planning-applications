<template>
    <DrawGridMapAndRoute
        :route="route"
        :column="map.length"
        :row="map[0].length"
        :grid="true"
        :map="map"
        :pointsInsideAllConvexPolygons="pointsInsideAllConvexPolygons"
    ></DrawGridMapAndRoute>
</template>

<script setup lang="ts">
import { Ref, ref } from "vue";
import { GridMapFromArray } from "./GridMapFromArray";
import { Point } from "./Point";
import { FindPointsInsideAllConvexPolygons } from "./FindPointsInsideAllConvexPolygons";
import { VisibleGridsMatrix } from "./VisibleGridsMatrix";
import DrawGridMapAndRoute from "./drawGridMapAndRoute.vue";
import { getVisibleGridsList } from "./getVisibleGridsList";
import map from "./screen-capture-2023-11-24-162727_result-result-test.json";

const start = new Point(1, 21);
const end = new Point(22, 1);

const route: Ref<[number, number][]> = ref([
    [start.x, start.y],
    [end.x, end.y],
]);

// onMounted(() => {
const gridmap = GridMapFromArray(map);
const visibleGridsList = getVisibleGridsList(gridmap);
const visibleGridsMatrix = VisibleGridsMatrix(visibleGridsList);
const pointsInsideAllConvexPolygons = [
    ...FindPointsInsideAllConvexPolygons(gridmap, visibleGridsMatrix),
];
// });
</script>
