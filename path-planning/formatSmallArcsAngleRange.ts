export function formatSmallArcsAngleRange(
    angles: number[],
): [number, number][] {
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
