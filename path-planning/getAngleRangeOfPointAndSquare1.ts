/**
 * 获取一个点与正方形四个顶点连线形成的角度范围
 *
 * @param 当前a 中心点x坐标
 * @param 当前b 中心点y坐标
 * @param 目标格子x 点的x坐标
 * @param 目标格子y 点的y坐标
 * @returns 返回角度范围，以[最小角度, 最大角度]的形式返回
 */
export function getAngleRangeOfPointAndSquare1(
    a: number,
    b: number,
    x: number,
    y: number,
): [number, number] {
    // 计算四个角度值
    const angles = [
        //格子缩小到95%,为了减小误差
        Math.atan2(y + 0.5 * 0.95 - b, x + 0.5 - a),
        Math.atan2(y + 0.5 - b, x - 0.5 * 0.95 - a),
        Math.atan2(y - 0.5 * 0.95 - b, x + 0.5 - a),
        Math.atan2(y - 0.5 - b, x - 0.5 * 0.95 - a),
        Math.atan2(y + 0.5 * 0.95 - b, x + 0.5 - a),
        Math.atan2(y + 0.5 - b, x - 0.5 * 0.95 - a),
        Math.atan2(y - 0.5 * 0.95 - b, x + 0.5 - a),
        Math.atan2(y - 0.5 - b, x - 0.5 * 0.95 - a),
    ];

    // 找到最大值和最小值
    const max = Math.max(...angles);
    const min = Math.min(...angles);

    // 如果最大值和最小值的差大于π，则返回[max, min]，否则返回[min, max]
    //角度范围跨过Math.PI
    if (max - min > Math.PI) {
        //角度范围跨过Math.PI
        return [max, min];
    } else {
        return [min, max];
    }
}
