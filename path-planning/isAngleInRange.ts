/**
 * 判断弧度a是否在弧度b和弧度c之间
 *
 * @param a 弧度值  在-π到+π范围
 * @param b 弧度值 在-π到+π范围
 * @param c 弧度值 在-π到+π范围
 * @returns boolean
 */
export function isAngleInRange(a: number, b: number, c: number): boolean {
    const radiansA = a; // 将角度转换为弧度，并其在-π到+π范围内
    const radiansB = b; // 将角度转换为弧度，并其在-π到+π范围内
    const radiansC = c; // 将角度转换为弧度，并其在-π到+π范围内

    if (b > 0 && c < 0) {
        // 当b>0且c<0时，需要进行特殊处理
        const positiveB = b; // 将b转换为大于0的角度
        const positiveC = c + 2 * Math.PI; // 将c转换为大于0的角度
        return radiansA >= positiveB && positiveC < radiansA; // 判断弧度 a 是否在大于0的角度 b 和 c 之间
    } else {
        return radiansA >= radiansB && radiansC < radiansA; // 判断弧度 a 是否在弧度 b 和 c 之间
    }
}
