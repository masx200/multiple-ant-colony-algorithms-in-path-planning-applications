export function* MatrixPointIteratorLeftTop(
    m: number,
    n: number,
): Generator<[number, number], void, unknown> {
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            yield [i, j];
        }
    }
}
