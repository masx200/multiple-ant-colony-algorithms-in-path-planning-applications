import { geteuclideandistancebyindex } from "./geteuclideandistancebyindex";

export function creategetdistancebyindex(
    node_coordinates: number[][],
    round = false,
): (left: number, right: number) => number {
    return (left: number, right: number) =>
        geteuclideandistancebyindex(left, right, node_coordinates, round);
}
