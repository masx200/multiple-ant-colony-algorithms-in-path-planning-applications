export class GridMap {
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
        public data: number[][]
    ) {}
}
