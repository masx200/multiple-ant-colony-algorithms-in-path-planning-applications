export function float64equal(a: number, b: number): boolean {
    const threshold = Number.EPSILON;
    return Math.abs(a - b) <= threshold;
}
