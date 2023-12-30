/**
 *  二维数组索引转一维索引*/
export function twoDimensionsToOneDimension(
    row: number,
    column: number,
    n: number,
): number {
    return row * n + column;
}
