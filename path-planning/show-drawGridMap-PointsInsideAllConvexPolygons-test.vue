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
import { PointsInsideAllConvexPolygons } from "./PointsInsideAllConvexPolygons";
import { VisibleGridsMatrix } from "./VisibleGridsMatrix";
import DrawGridMapAndRoute from "./drawGridMapAndRoute.vue";
import { getVisibleGridsList } from "./getVisibleGridsList";
import map from "./屏幕截图-2023-11-24-162727_结果_结果test.json";

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
    ...PointsInsideAllConvexPolygons(gridmap, visibleGridsMatrix),
];
// });
</script>
