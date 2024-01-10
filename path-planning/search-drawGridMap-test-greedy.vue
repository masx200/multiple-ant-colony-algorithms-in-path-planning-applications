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
import { Ref, ref } from "vue";
import { Point } from "./Point";
import DrawGridMapAndRoute from "./drawGridMapAndRoute.vue";
import map from "./screen-capture-2023-11-24-162727_result-result-test.json";

const start = new Point(1, 21);
const end = new Point(22, 1);

const route: Ref<[number, number][]> = ref([
    [start.x, start.y],
    [end.x, end.y],
]);

// onMounted(() => {
const gridmap = GridMapFromArray(map);

const gridDistanceMatrix = GridDistanceMatrix(
    gridmap.data.length,
    gridmap.data[0].length,
);
const visibleGridsList = getVisibleGridsList(gridmap);
const visibleGridsMatrix = VisibleGridsMatrix(visibleGridsList);
const pointsInsideAllConvexPolygons = new Set(
    [...FindPointsInsideAllConvexPolygons(gridmap, visibleGridsMatrix)].map(
        (a) => a[0] * gridmap.row + a[1],
    ),
);
// const PheromoneMatrix = generate_initial_pheromone_matrix(
//     gridmap,
//     start,
//     end,
// );
// const PheromoneZeroMatrix = structuredClone(PheromoneMatrix);
// const q0_Path_selection_parameters = 0.8;
console.log(route.value);

const visibleGridsListWithOutPointsInsideAllConvexPolygons =
    FilterVisibleGridsListWithOutPointsInsideAllConvexPolygons(
        visibleGridsList,
        pointsInsideAllConvexPolygons,
    );
const path = search_one_route_on_grid_map(
    gridmap,
    start,
    end,
    // PheromoneMatrix,
    visibleGridsListWithOutPointsInsideAllConvexPolygons,
    visibleGridsMatrix,
    //   pointsInsideAllConvexPolygons,
    // DefaultOptions.alpha_zero,
    // DefaultOptions.beta_zero,
    // q0_Path_selection_parameters,
    // PheromoneZeroMatrix,
    // DefaultOptions.local_pheromone_volatilization_coefficient,
    // DefaultOptions.global_pheromone_volatilization_coefficient,
    (a, b) => greedy_next_point_selector(a, b, gridDistanceMatrix, end),
);
console.log(path);
route.value = path;
// });
import { FilterVisibleGridsListWithOutPointsInsideAllConvexPolygons } from "./FilterVisibleGridsListWithOutPointsInsideAllConvexPolygons";
import { search_one_route_on_grid_map } from "./search_one_route_on_grid_map";
import { getVisibleGridsList } from "./getVisibleGridsList";
import { GridMapFromArray } from "./GridMapFromArray";
import { VisibleGridsMatrix } from "./VisibleGridsMatrix";
import { FindPointsInsideAllConvexPolygons } from "./FindPointsInsideAllConvexPolygons";
import { greedy_next_point_selector } from "./greedy_next_point_selector";
import { GridDistanceMatrix } from "./Grid-distance-matrix";
</script>
