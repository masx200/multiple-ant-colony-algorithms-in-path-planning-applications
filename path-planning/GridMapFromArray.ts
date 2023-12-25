import { GridMap } from "./grid-map";


export function GridMapFromArray(array: number[][]): GridMap {
    return new GridMap(array.length, array[0].length, array);
}
