//计算两个向量的夹角
/**
 * 计算两个向量的夹角（弧度制）
 *
 * @param v1 第一个向量，由两个数字组成的数组
 * @param v2 第二个向量，由两个数字组成的数组
 * @returns 两个向量的夹角，单位为弧度制
 */
export function vectorAngle(v1: [number, number], v2: [number, number]) {
    // 计算两个向量的点积
    let dotProduct = v1[0] * v2[0] + v1[1] * v2[1];

    // 计算向量v1的模
    let magnitude = Math.sqrt(v1[0] * v1[0] + v1[1] * v1[1]);

    // 计算向量v2的模
    let bMagnitude = Math.sqrt(v2[0] * v2[0] + v2[1] * v2[1]);

    // 计算两个向量的夹角余弦值
    let cosTheta = dotProduct / (magnitude * bMagnitude);

    // 返回两个向量的夹角（弧度制），注意需要判断夹角的方向
    return Math.acos(cosTheta) * Math.sign(+v1[0] * v2[1] - v1[1] * v2[0]);
}
