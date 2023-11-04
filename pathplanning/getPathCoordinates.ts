export function getPathCoordinates(
    start: [number, number],
    end: [number, number]
): [number, number][] {
    const path: [number, number][] = [];
    const [x1, y1] = start;
    const [x2, y2] = end;

    let currentX = x1 + 0.5;
    let currentY = y1 + 0.5;
    let m = (y2 - y1) / (x2 - x1); // 计算斜率

    if (x1 < x2) {
        while (currentX < x2 + 0.5) {
            // 修改了循环条件，以包含终点坐标
            path.push([Math.round(currentX), Math.round(currentY)]); // 四舍五入，保留整数位
            currentX += 1; // 步长为1，以中心坐标为基准
            currentY += m; // 根据斜率计算y值
        }
    } else if (x1 > x2) {
        while (currentX > x2 + 0.5) {
            // 修改了循环条件，以包含终点坐标
            path.push([Math.round(currentX), Math.round(currentY)]); // 四舍五入，保留整数位
            currentX -= 1; // 步长为-1，以中心坐标为基准
            currentY += m; // 根据斜率计算y值
        }
    } else {
        // 如果 x1 == x2
        for (let i = 0; i < Math.abs(y2 - y1); i++) {
            // 当直线与y轴平行时，输出abs(y2-y1)个点
            path.push([Math.round(x1), Math.round(y1 + i)]); // 四舍五入，保留整数位
        }
    }

    if (y1 === y2) {
        // 如果 y1 == y2，即直线与x轴平行
        if (x1 < x2) {
            // 如果起点x小于终点x，直接将终点加入路径
            for (let i = 0; i < Math.abs(x2 - x1); i++) {
                // 当直线与x轴平行时，输出abs(x2-x1)个点
                path.push([Math.round(x2 - i), Math.round(y1)]); // 四舍五入，保留整数位
            }
        } else if (x1 > x2) {
            // 如果起点x大于终点x，直接将起点加入路径
            for (let i = 0; i < Math.abs(x2 - x1); i++) {
                // 当直线与x轴平行时，输出abs(x2-x1)个点
                path.push([Math.round(x1 + i), Math.round(y1)]); // 四舍五入，保留整数位
            }
        } else {
            // 如果 x1 == x2，只加入起点的坐标
            path.push([Math.round(x1), Math.round(y1)]); // 四舍五入，保留整数位
        }
    }
    return path;
}
