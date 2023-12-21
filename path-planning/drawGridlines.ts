/**
 * 绘制网格
 *
 * @param column 栅格地图的列数
 * @param row 栅格地图的行数
 * @param canvas 画布元素
 */
export function drawGridlines(
    column: number,
    row: number,
    canvas: HTMLCanvasElement,
) {
    const ctx = canvas.getContext("2d");

    if (!ctx) {
        throw new Error("Failed to get 2D rendering context");
    }
    ctx.save();
    // 设置canvas的尺寸为栅格地图的尺寸
    // canvas.width = gridMap.column;
    // canvas.height = gridMap.row;
    var myCanvas_rect = canvas.getBoundingClientRect();
    var width = myCanvas_rect.width;
    var height = myCanvas_rect.height;
    // 计算每个方格的实际大小（以像素为单位）
    const cellSize = Math.min(width / column, height / row);

    // 绘制竖直网格线
    for (let i = 0; i <= row + 1; i++) {
        ctx.beginPath();
        ctx.strokeStyle = "green";
        ctx.moveTo(i * cellSize, 0);
        ctx.lineTo(i * cellSize, cellSize * (column - 1));
        ctx.stroke();
    }

    // 绘制水平网格线
    for (let i = 0; i <= column - 1; i++) {
        ctx.beginPath();
        ctx.strokeStyle = "blue";
        ctx.moveTo(0, i * cellSize);
        ctx.lineTo(cellSize * (row + 1), i * cellSize);
        ctx.stroke();
    }
    ctx.restore();
}
