export class GridMethod extends Array<Array<number>> {
  constructor(
    public row: number,
    public column: number,
    public data: number[],
  ) {
    super(row);
    for (let i = 0; i < row; i++) {
      this[i] = new Array(column);
      for (let j = 0; j < column; j++) {
        this[i][j] = data[i * column + j];
      }
    }
  }
}
