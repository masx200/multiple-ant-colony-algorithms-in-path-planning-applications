import { GridMap } from "./grid-map.ts";

/**
 * 绘制地图
 * @param gridMap - 网格地图对象
 * @param canvas - HTMLCanvasElement对象
 */
export function draw_PointsInsideAllConvexPolygons(
    column: number,
    row: number,

    canvas: HTMLCanvasElement,
    pointsInsideAllConvexPolygons: Iterable<[number, number]>,
) {
    const ctx = canvas.getContext("2d");

    if (!ctx) {
        throw new Error("Failed to get 2D rendering context");
    }
    ctx.save();

    var myCanvas_rect = canvas.getBoundingClientRect();
    var width = myCanvas_rect.width;
    var height = myCanvas_rect.height;
    const gridMap = new GridMap(column, row);
    const cellSize = Math.min(height / gridMap.column, width / gridMap.row);

    for (const [x, y] of pointsInsideAllConvexPolygons) {
        gridMap.data[x][y] = 1;
    }
    const raw_data = gridMap.data;

    const data = Array(raw_data[0].length)
        .fill(0)
        .map((_, i) =>
            Array(raw_data.length)
                .fill(0)
                .map((_, j) => raw_data[j][i]),
        );

    for (let row = 0; row < data.length; row++) {
        for (let col = 0; col < data[0].length; col++) {
            const value = data[row][col];

            if (value === 1) {
                ctx.shadowOffsetX = 0;
                ctx.shadowOffsetY = 0;
                ctx.shadowBlur = 0;
                ctx.shadowColor = "fully-transparent black";
                ctx.fillStyle = "gray";
                ctx.fillRect(
                    row * cellSize,
                    col * cellSize,
                    cellSize,
                    cellSize,
                );
            }
        }
    }
    ctx.restore();
}
