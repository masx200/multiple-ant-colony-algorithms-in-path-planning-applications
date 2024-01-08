import AllGridMap from "../all-grid-maps/index.ts";

// import {
// TSP_cities_map
// } from "./TSP_cities_map";
const GridMapSelectorOptions = Object.keys(AllGridMap).map((a) => ({
    value: a,
    label: a,
}));
export { GridMapSelectorOptions };
