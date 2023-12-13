/**
 * 
 * 以下是一个使用 TypeScript 编写的函数，它接受一个二维向量作为输入，并返回该向量与 0 度方向（即正 x 轴）的夹角弧度。
 * 
这个函数首先使用 `Math.atan2` 函数计算出向量与 x 轴之间的角度。然后，它将这个角度直接返回。注意，`Math.atan2` 返回的角度是弧度制的，范围在 -π 到 π 之间。如果你需要的是角度制的结果，你可以将结果乘以 180/π。

这个函数假设输入的向量是一个对象，具有 `x` 和 `y` 属性。这两个属性分别表示向量在 x 和 y 轴上的分量。


 * @param vec{{ x: number; y: number }}
 * 
 * @returns {number}

 *
 */

export function getAngle(vec: { x: number; y: number }): number {
    // 将向量转换为角度
    const angleInRadians = Math.atan2(vec.y, vec.x);

    return angleInRadians;
}
