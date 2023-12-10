export function Float64areEqual(a: number, b: number): boolean {
    const threshold = Number.EPSILON;
    if (isNaN(a) && isNaN(b)) return a === b;
    if (isNaN(a) || isNaN(b)) return false;
    let diff = Math.abs(a - b);
    return diff < threshold ? true : false;
}
