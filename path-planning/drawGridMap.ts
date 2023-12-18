import { GridMap } from "./grid-map.ts";

export function drawGridMap(gridMap: GridMap, canvas: HTMLCanvasElement) {
    const ctx = canvas.getContext("2d");

    if (!ctx) {
        throw new Error("Failed to get 2D rendering context");
    }

    // 设置canvas的尺寸为栅格地图的尺寸
    // canvas.width = gridMap.column;
    // canvas.height = gridMap.row;
    var myCanvas_rect = canvas.getBoundingClientRect();
    var width = myCanvas_rect.width;
    var height = myCanvas_rect.height;
    // 计算每个方格的实际大小（以像素为单位）
    const cellSize = Math.min(width / gridMap.column, height / gridMap.row);

    // 绘制竖直网格线
    for (let i = 0; i <= gridMap.column; i++) {
        ctx.beginPath();
        ctx.strokeStyle = "green";
        ctx.moveTo(i * cellSize, 0);
        ctx.lineTo(i * cellSize, height);
        ctx.stroke();
    }

    // 绘制水平网格线
    for (let i = 0; i <= gridMap.row; i++) {
        ctx.beginPath();
        ctx.strokeStyle = "blue";
        ctx.moveTo(0, i * cellSize);
        ctx.lineTo(width, i * cellSize);
        ctx.stroke();
    }

    // 绘制方格
    for (let col = 0; col < gridMap.column; col++) {
        for (let row = 0; row < gridMap.row; row++) {
            const value = gridMap.data[col][row];
            ctx.fillStyle = value === 1 ? "black" : "white";
            ctx.fillRect(col * cellSize, row * cellSize, cellSize, cellSize);
        }
    }
}
