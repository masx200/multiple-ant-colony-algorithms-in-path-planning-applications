export function isPointInSector(
    i: number,
    j: number,
    x1: number,
    y1: number,
    x2: number,
    y2: number
) {
    // 计算OA和OB的长度
    // const len1 = Math.sqrt(x1 * x1 + y1 * y1);
    // const len2 = Math.sqrt(x2 * x2 + y2 * y2);
    // 计算OA和OB的夹角
    const angle1 = Math.atan2(y1, x1);
    const angle2 = Math.atan2(y2, x2);
    let theta = angle2 - angle1;
    if (theta < 0) {
        theta += 2 * Math.PI;
    }
    // 判断点(i,j)与扇形起点的连线与OA的夹角是否在θ的范围内
    const pointAngle = Math.atan2(j - y1, i - x1);
    if (pointAngle < angle1 && pointAngle + 2 * Math.PI > angle2) {
        return true;
    } else {
        return false;
    }
}
