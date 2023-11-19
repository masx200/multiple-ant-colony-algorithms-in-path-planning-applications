export class Vec {
    public x: number;
    public y: number;

    /**
     * 构造函数
     *
     * @param _x - x坐标
     * @param _y - y坐标
     */
    constructor(_x: number, _y: number) {
        this.x = _x;
        this.y = _y;
    }

    /**
     * 计算向量长度
     *
     * @returns {number} 向量长度
     */
    length(): number {
        return Math.sqrt(this.siz());
    }

    /**
     * 计算点到原点的距离的平方
     *
     * @returns 返回点到原点的距离的平方
     */
    siz(): number {
        return this.x * this.x + this.y * this.y;
    }

    /**
     * 点积计算
     *
     * @param v 向量
     * @returns 点积结果
     */
    dot(v: Vec): number {
        return v.x * this.x + v.y * this.y;
    }

    /**
     * 余弦函数
     *
     * @param v 向量
     * @returns 余弦值
     */
    cos(v: Vec): number {
        return this.dot(v) / Math.sqrt(this.siz() * v.siz());
    }
}
