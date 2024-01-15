import { MatrixSymmetry } from "@masx200/sparse-2d-matrix";

import { cachenode_coordinatestostore } from "./cachenode_coordinatestostore";
import { createdistancestore } from "./createdistancestore";

export function getstoreofnode_coordinates(
    node_coordinates: number[][],
    round = false,
): MatrixSymmetry<number> {
    return (
        cachenode_coordinatestostore.get(node_coordinates) ??
        createdistancestore(node_coordinates, round)
    );
}
