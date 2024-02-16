/**
 * Callback function for determining if two grid positions are visible to each other.
 * @param a - The first grid position.
 * @param b - The second grid position.
 * @returns A boolean indicating if the two grid positions are visible to each other.
 */
export type visibleGridsMatrixCallBack = (
    a: [number, number],
    b: [number, number],
) => boolean;
