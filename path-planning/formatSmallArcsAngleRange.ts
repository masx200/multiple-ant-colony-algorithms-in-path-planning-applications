/**
 * 这个函数用于处理角度范围，将角度转换为弧度并规范化范围。如果角度范围跨过π，则返回两个数组，第一个数组包含最大值和π，第二个数组包含−π和最小值。否则，只返回一个数组，包含最小值和最大值。
 * @param angles
 * @returns
 */
export function formatSmallArcsAngleRange(
    angles: number[],
): [number, number][] {
    angles = angles.map((a) => {
        if (a >= -Math.PI && a < Math.PI) return a;
        a = a % (2 * Math.PI);
        if (a < 0) {
            a += 2 * Math.PI;
        }
        return a >= Math.PI ? a - 2 * Math.PI : a;
    });
    const max = Math.max(...angles);
    const min = Math.min(...angles);
    // console.log({
    //     max: String(max / Math.PI) + "* Math.PI ",
    //     min: String(min / Math.PI) + "* Math.PI ",
    // });
    // 如果最大值和最小值的差大于π，则返回[max, min]，否则返回[min, max]
    //角度范围跨过Math.PI
    if (max - min > Math.PI) {
        //角度范围跨过Math.PI
        return [
            [max, Math.PI],
            [-Math.PI, min],
        ];
    } else {
        return [[min, max]];
    }
}
