//计算两个向量的夹角
/**
 * 计算两个向量的夹角（弧度制）
 *
 * @param v1 第一个向量，由两个数字组成的数组
 * @param v2 第二个向量，由两个数字组成的数组
 * @returns 两个向量的夹角，单位为弧度制
 */
export function vectorAngle(v1: [number, number], v2: [number, number]) {
    let dotProduct = v1[0] * v2[0] + v1[1] * v2[1];
    let magnitude = Math.sqrt(v1[0] * v1[0] + v1[1] * v1[1]);

    let bMagnitude = Math.sqrt(v2[0] * v2[0] + v2[1] * v2[1]);
    let cosTheta = dotProduct / (magnitude * bMagnitude);
    return Math.acos(cosTheta) * Math.sign(+v1[0] * v2[1] - v1[1] * v2[0]);
}
