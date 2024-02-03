import AllGridMap, { nametodimention } from "../all-grid-maps/index.ts";

// 导入AllGridMap和nametodimention
// console.log(AllGridMap, nametodimention);
// 导入TSP_cities_map
// import {
// TSP_cities_map
// } from "./TSP_cities_map";
// 生成GridMapSelectorOptions选项
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
    })
    .filter((a) => (nametodimention.get(a.value) ?? 0) < 10000);
// 导出GridMapSelectorOptions选项
export { GridMapSelectorOptions };
// console.log(GridMapSelectorOptions);
