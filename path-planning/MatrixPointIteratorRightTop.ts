export function* MatrixPointIteratorRightTop(
    m: number,
    n: number,
): Generator<[number, number], void, unknown> {
    for (let i = 0; i < m; i++) {
        for (let j = n - 1; j >= 0; j--) {
            yield [i, j];
        }
    }
}
