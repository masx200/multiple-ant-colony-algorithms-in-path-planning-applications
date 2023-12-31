import { not_cycle_route_to_segments } from "../functions/not_cycle_route_to_segments";

/**
 * 在给定的画布上绘制网格路径
 * @param route 路径的坐标点数组
 * @param canvas 画布元素
 * @param column 列数
 * @param row 行数
 */
export function drawGridRoute(
    route: [number, number][],
    canvas: HTMLCanvasElement,
    column: number,
    row: number,
) {
    const ctx = canvas.getContext("2d");

    if (!ctx) {
        throw new Error("Failed to get 2D rendering context");
    }
    ctx.save();
    //上下翻转
    ctx.translate(0, canvas.height);
    ctx.scale(1, -1);
    var myCanvas_rect = canvas.getBoundingClientRect();
    var width = myCanvas_rect.width;
    var height = myCanvas_rect.height;

    /**
     * 每个格子的大小
     */
    const cellSize = Math.min(height / column, width / row);

    for (const segment of not_cycle_route_to_segments(route)) {
        const [[i1, j1], [i2, j2]] = segment;
        ctx.beginPath();
        ctx.strokeStyle = "red";
        ctx.moveTo(cellSize * (j1 + 0.5), (i1 + 0.5) * cellSize);
        ctx.lineTo(cellSize * (j2 + 0.5), (i2 + 0.5) * cellSize);
        ctx.stroke();
    }
    ctx.restore();
}
