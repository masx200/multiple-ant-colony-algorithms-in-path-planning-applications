export function* MatrixPointIteratorLeftButton(
    m: number,
    n: number,
): Generator<[number, number], void, unknown> {
    for (let i = m - 1; i >= 0; i--) {
        for (let j = 0; j < n; j++) {
            yield [i, j];
        }
    }
}
