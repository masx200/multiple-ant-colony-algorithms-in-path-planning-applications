export function* MatrixPointIteratorRightButton(
    m: number,
    n: number,
): Generator<[number, number], void, unknown> {
    for (let i = m - 1; i >= 0; i--) {
        for (let j = n - 1; j >= 0; j--) {
            yield [i, j];
        }
    }
}
