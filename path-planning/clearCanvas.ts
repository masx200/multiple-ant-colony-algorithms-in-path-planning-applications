// 使用函数
// const myCanvas = document.getElementById('myCanvas') as HTMLCanvasElement;
// displayMouseCoordinates(myCanvas);
export function clearCanvas(canvas: HTMLCanvasElement) {
    const ctx = canvas.getContext("2d");
    if (!ctx) {
        throw new Error("Failed to get 2D rendering context");
    }
    // 清除整个canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}
