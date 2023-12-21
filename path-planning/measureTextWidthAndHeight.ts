/**
 * 计算文本的宽度和高度
 *
 * @param text - 要计算的文本
 * @param font - 文本的字体样式
 * @returns 文本的宽度和高度对象，包含width和height属性
 */
export function measureTextWidthAndHeight(
    text: string,
    font: string,
): { width: number; height: number } {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    if (!ctx) {
        throw new Error("Failed to get 2D rendering context");
        // return;
    }
    ctx.font = font;
    const metrics = ctx.measureText(text);
    return {
        width: ctx.measureText(text).width,
        height:
            metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent,
    };
}
