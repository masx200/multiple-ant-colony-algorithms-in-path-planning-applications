import AllGridMap, { nametodimention } from "../all-grid-maps/index.ts";
// console.log(AllGridMap, nametodimention);
// import {
// TSP_cities_map
// } from "./TSP_cities_map";
const GridMapSelectorOptions = Object.keys(AllGridMap)
    .map((a) => {
        return {
            value: a,
            label: `名称:${a} 规模:${nametodimention.get(a)}`,
        };
    })
    .sort((a, b) => {
        return (
            (nametodimention.get(a.value) ?? 0) -
            (nametodimention.get(b.value) ?? 0)
        );
    });
export { GridMapSelectorOptions };
console.log(GridMapSelectorOptions);
