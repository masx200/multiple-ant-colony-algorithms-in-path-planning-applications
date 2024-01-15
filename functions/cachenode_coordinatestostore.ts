import { MatrixSymmetry } from "@masx200/sparse-2d-matrix";

export const cachenode_coordinatestostore = new WeakMap<
    number[][],
    MatrixSymmetry<number>
>();
