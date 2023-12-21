import { GridMap } from "./grid-map.ts";

export function drawMap(gridMap: GridMap, canvas: HTMLCanvasElement) {
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
    const data = gridMap.data.toReversed();
    // 绘制方格
    for (let col = 0; col < gridMap.column; col++) {
        for (let row = 0; row < gridMap.row; row++) {
            const value = data[col][row];
            ctx.shadowOffsetX = 0; // x轴偏移量
            ctx.shadowOffsetY = 0; // y轴偏移量
            ctx.shadowBlur = 0; // 模糊程度
            ctx.shadowColor = "fully-transparent black"; // 阴影颜色（半透明黑色）
            ctx.fillStyle = value === 1 ? "black" : "white";
            ctx.fillRect(col * cellSize, row * cellSize, cellSize, cellSize);
        }
    }
}
