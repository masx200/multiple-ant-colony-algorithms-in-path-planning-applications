/**
 * 检查两个浮点数是否近似相等，使用 Number.EPSILON 作为阈值。
 *
 * @param {number} a - 第一个要比较的浮点数。
 * @param {number} b - 第二个要比较的浮点数。
 * @returns {boolean} 如果两个浮点数近似相等，则返回 true，否则返回 false。
 * 
 * 这段代码定义了一个名为 Float64areEqual 的函数，它接受两个数字参数 a 和 b。该函数用于判断这两个浮点数是否足够接近，可以被认为是相等的。这个判断基于 JavaScript 中的 Number.EPSILON 常量，这是一个非常小的正数，通常用来做浮点数的近似比较。

函数首先检查 a 和 b 是否都是 NaN，如果是，则认为它们相等（根据 IEEE 754 浮点数规范）。如果其中一个数是 NaN，而另一个不是，则认为它们不相等。

然后，函数计算两个数之间的差值，并取其绝对值。最后，判断这个差值是否小于 threshold（即 Number.EPSILON），如果是，则认为两个数近似相等，函数返回 true；否则，返回 false。
 */
export function Float64areEqual(a: number, b: number): boolean {
    const threshold = Number.EPSILON;

    // 如果两个数都是 NaN，则它们相等（根据 IEEE 754 规范）
    if (isNaN(a) && isNaN(b)) return a === b;

    // 如果其中一个是 NaN，但另一个不是，则它们不相等
    if (isNaN(a) || isNaN(b)) return false;

    // 计算两个数之间的差值，并取绝对值
    let diff = Math.abs(a - b);

    // 判断差值是否小于阈值，如果是则认为两个数近似相等
    return diff < threshold ? true : false;
}
