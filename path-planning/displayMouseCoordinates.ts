import { MousePosition } from "./MousePosition";

export function displayMouseCoordinates(
    canvas: HTMLCanvasElement,
    mousePositionInElement: MousePosition,
) {
    // console.log("displayMouseCoordinates", mousePositionInElement);
    const ctx = canvas.getContext("2d");

    if (!ctx) {
        throw new Error("Failed to get 2D rendering context");
        // return;
    }

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
        // ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.font = "16px Arial";
        ctx.fillStyle = "yellow";
        ctx.fillText(
            `( ${mousePositionInElement.x},  ${mousePositionInElement.y})`,
            10,
            30,
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
