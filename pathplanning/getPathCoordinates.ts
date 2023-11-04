import { uniqBy } from "lodash-es";

/**
 * 获取两点间直线的坐标路径
 *
 * @param start 起始点坐标
 * @param end   终点坐标
 * @returns 包含路径坐标的数组
 */
export function getPathCoordinates(
    start: [number, number],
    end: [number, number]
): [number, number][] {
    const path: [number, number][] = [];
    const [x1, y1] = start;
    const [x2, y2] = end;

    let currentX = x1 + 0.5;
    let currentY = y1 + 0.5;
    // 计算斜率
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
    } /*  */
    // uniqBy 是一个函数，它接受两个参数：path 和一个箭头函数。
    // path 是一个数组，指定了要在其中查找重复项的路径。
    // 箭头函数接受一个元素作为参数，并返回它的字符串表示形式。
    // 这个箭头函数使用 JavaScript 的 JSON.stringify 方法将元素转换为字符串。
    // 然后，uniqBy 函数使用这个箭头函数来确定哪些元素是唯一的，并返回一个只包含唯一元素的新数组。

    return uniqBy(path, (item) => JSON.stringify(item));
}
