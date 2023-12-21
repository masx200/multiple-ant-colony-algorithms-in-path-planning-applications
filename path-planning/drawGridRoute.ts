import { not_cycle_route_to_segments } from "../functions/not_cycle_route_to_segments";

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
    var myCanvas_rect = canvas.getBoundingClientRect();
    var width = myCanvas_rect.width;
    var height = myCanvas_rect.height;

    const cellSize = Math.min(width / column, height / row);

    for (const segment of not_cycle_route_to_segments(route)) {
        const [[i1, j1], [i2, j2]] = segment;
        ctx.beginPath();
        ctx.strokeStyle = "red";
        ctx.moveTo((i1 + 0.5) * cellSize, cellSize * (column - j1 - 0.5));
        ctx.lineTo((i2 + 0.5) * cellSize, cellSize * (column - j2 - 0.5));
        ctx.stroke();
    }
    ctx.restore();
}
