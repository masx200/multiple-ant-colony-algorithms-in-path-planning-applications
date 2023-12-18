import { GridMap } from "./grid-map";

export function GridMapToArray(gridMap: GridMap): number[][] {
    return Array.from(gridMap.data.map((a) => [...a]));
}
