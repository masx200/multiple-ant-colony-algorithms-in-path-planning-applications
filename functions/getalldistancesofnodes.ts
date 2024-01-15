import { combinations } from "combinatorial-generators";

import { geteuclideandistancebyindex } from "./geteuclideandistancebyindex";

export function getalldistancesofnodes(
    node_coordinates: number[][],
    round = false,
): number[] {
    const inputarray = Array(node_coordinates.length)
        .fill(0)
        .map((_v, i) => i);
    return [...combinations(inputarray, 2)].map(([left, right]) =>
        geteuclideandistancebyindex(left, right, node_coordinates, round),
    );
}
