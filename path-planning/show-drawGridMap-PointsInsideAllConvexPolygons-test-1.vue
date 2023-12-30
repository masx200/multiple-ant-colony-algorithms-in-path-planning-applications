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
import map from "./space-findVisibleGrids2-test-two-line-Obstacle-partial.json";

const start = new Point(0, 0);
const end = new Point(map.length - 1, map[0].length - 1);

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

console.log(pointsInsideAllConvexPolygons);
// });
</script>
