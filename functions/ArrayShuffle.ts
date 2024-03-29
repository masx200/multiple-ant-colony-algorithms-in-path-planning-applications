/**
 * Shuffles the elements of an array randomly.
 * @param nodesinsidecircle - The array to be shuffled.
 * @returns The shuffled array.
 */
export function ArrayShuffle<T>(nodesinsidecircle: T[]): T[] {
    return Array.from(nodesinsidecircle).sort(() => Math.random() - 0.5);
}
