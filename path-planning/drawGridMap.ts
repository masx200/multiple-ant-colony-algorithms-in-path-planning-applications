import { GridMap } from "./grid-map.ts";


/**
 * 绘制地图
 * @param gridMap - 网格地图对象
 * @param canvas - HTMLCanvasElement对象
 */
export function drawMap(gridMap: GridMap, canvas: HTMLCanvasElement) {
    // console.log(gridMap.data.toReversed());
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
    const cellSize = Math.min(height / gridMap.column, width / gridMap.row);
    const raw_data = gridMap.data.toReversed();
    /* 以左下角为原点 */
    const data = //raw_data;
        Array(raw_data[0].length)
            .fill(0)
            .map((_, i) =>
                Array(raw_data.length)
                    .fill(0)
                    .map((_, j) => raw_data[j][i]),
            );
    // console.log(data);

    //.map((a) => a.toReversed()); //.toReversed(); //.map((a) => a.toReversed());
    // 绘制方格
    for (let row = 0; row < data.length; row++) {
        for (let col = 0; col < data[0].length; col++) {
            const value = data[row][col];
            ctx.shadowOffsetX = 0; // x轴偏移量
            ctx.shadowOffsetY = 0; // y轴偏移量
            ctx.shadowBlur = 0; // 模糊程度
            ctx.shadowColor = "fully-transparent black"; // 阴影颜色（半透明黑色）
            ctx.fillStyle = value === 1 ? "black" : "white";
            ctx.fillRect(row * cellSize, col * cellSize, cellSize, cellSize);
        }
    }
    ctx.restore();
}
