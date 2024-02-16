import { MatrixSymmetry } from "@masx200/sparse-2d-matrix";

import { ReadOnlyPheromone } from "./ReadOnlyPheromone";

/**
 * PheromoneCache represents a cache for storing pheromone values.
 */
export type PheromoneCache = MatrixSymmetry<number> &
    ReadOnlyPheromone & {
        /**
         * Clears all pheromone values in the cache.
         */
        clear(): void;

        /**
         * Sets the pheromone value at the specified row and column.
         * @param row The row index.
         * @param column The column index.
         * @param value The pheromone value to set.
         */
        set: (row: number, column: number, value: number) => void;
    };
