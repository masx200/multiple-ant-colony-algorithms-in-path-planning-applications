export class GridMethod {
    constructor(
        public column: number,
        public row: number,
        /**
         当该栅格内有障碍物时赋值为1，并用黑色表示；无障碍物时赋值为0，并用白色表示。 */
        public data: number[][]
    ) {}
}
