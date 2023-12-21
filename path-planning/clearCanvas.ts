/**

清除指定HTMLCanvasElement的整个画布内容。
@param canvas - 需要清除的HTMLCanvasElement对象 */

export function clearCanvas(canvas: HTMLCanvasElement) {
    const ctx = canvas.getContext("2d");
    if (!ctx) {
        throw new Error("Failed to get 2D rendering context");
    }
    // 清除整个canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}
