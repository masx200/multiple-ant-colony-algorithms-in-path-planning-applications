import { MousePosition } from "./MousePosition";

/**
 * 显示鼠标在画布上的坐标
 *
 * @param canvas - 画布元素
 * @param mousePositionInElement - 鼠标相对于画布位置的坐标
 * @param column - 列数
 * @param row - 行数
 */
export function displayMouseCoordinates(
    canvas: HTMLCanvasElement,
    mousePositionInElement: MousePosition,
    column: number,
    row: number,
) {
    // console.log("displayMouseCoordinates", mousePositionInElement);
    const ctx = canvas.getContext("2d");

    if (!ctx) {
        throw new Error("Failed to get 2D rendering context");
        // return;
    }
    var myCanvas_rect = canvas.getBoundingClientRect();
    var width = myCanvas_rect.width;
    var height = myCanvas_rect.height;

    /**
     * 计算每个格子的大小
     */
    const cellSize = Math.min(width / column, height / row);

    // let mousePosition: MousePosition | null = null;
    // function handleMouseMove(event: MouseEvent) {
    //     const rect = canvas.getBoundingClientRect();
    //     mousePosition = {
    //         x: event.clientX - rect.left,
    //         y: event.clientY - rect.top,
    //     };
    //     drawCoordinates();
    // }
    // function drawCoordinates() {
    if (mousePositionInElement) {
        // 清空画布样式
        // ctx.clearRect(0, 0, canvas.width, canvas.height);

        // 设置阴影样式
        ctx.shadowOffsetX = 2; // x轴偏移量
        ctx.shadowOffsetY = 2; // y轴偏移量
        ctx.shadowBlur = 4; // 模糊程度
        ctx.shadowColor = "blue"; // 阴影颜色（半透明黑色）
        ctx.font = "16px Arial";
        ctx.fillStyle = "yellow";
        ctx.fillText(
            `( ${mousePositionInElement.x / cellSize},  ${
                mousePositionInElement.y / cellSize
            })`,
            mousePositionInElement.x,
            mousePositionInElement.y,
        );
        // }
    }

    // canvas.addEventListener("mousemove", handleMouseMove);
    // 当鼠标离开canvas时，清除坐标显示
    // canvas.addEventListener("mouseout", () => {
    //     mousePosition = null;
    //     ctx.clearRect(0, 0, canvas.width, canvas.height);
    // });
}