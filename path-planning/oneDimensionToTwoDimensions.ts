/**
 *   一维索引转二维数组索引*/
export function oneDimensionToTwoDimensions(
    index: number,
    n: number,
): [number, number] {
    const column = index % n;
    const row = Math.floor(index / n);
    return [row, column];
}
