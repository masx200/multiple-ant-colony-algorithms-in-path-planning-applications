export class GridMap {
    //判断指定单元格是否是障碍物
    /**
     * 判断坐标(i, j)是否为障碍物
     *
     * @param i 横坐标
     * @param j 纵坐标
     * @returns 是障碍物返回true，否则返回false
     */
    isObstacle(i: number, j: number) {
        return this.data[i][j] === 1;
    }

    //判断指定单元格是否是空闲
    isFree(i: number, j: number) {
        return this.data[i][j] === 0;
    }

    /**
     * 将指定的单元格置为空闲状态。
     *
     * @param i - 行索引。
     * @param j - 列索引。
     */
    setFree(i: number, j: number) {
        // 将第 i 行第 j 列的元素设置为 0
        this.data[i][j] = 0;
    }
    /**
     * 设置障碍物
     *
     * @param i - 行索引
     * @param j - 列索引
     */
    setObstacle(i: number, j: number) {
        // 将障碍物设置为1
        this.data[i][j] = 1;
    }
    /**
     * 构造函数
     *
     * @param column - 栅格的列数
     * @param row - 栅格的行数
     * @param data - 一个二维数组，表示栅格数据。当栅格内有障碍物时值为1，并用黑色表示；无障碍物时值为0，并用白色表示。
     */
    constructor(
        public column: number,
        public row: number,
        /**
         当该栅格内有障碍物时赋值为1，并用黑色表示；无障碍物时赋值为0，并用白色表示。 */
        public data: number[][] = Array(column)
            .fill(0)
            .map(() => Array(row).fill(0))
    ) {}
}
