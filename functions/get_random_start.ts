import { NodeCoordinates } from "./NodeCoordinates";
import { pickRandomOne } from "./pickRandomOne";

export function get_random_start(node_coordinates: number[][]): number {
    const inputindexs = Array.from(node_coordinates.keys());
    return pickRandomOne(inputindexs);
}
