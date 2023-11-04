export class GridMethod {
    constructor(
        public row: number,
        public column: number,
        public data: number[]
    ) {}
    get(x: number, y: number) {
        return this.data[x * this.row + y];
    }
    set(x: number, y: number, value: number) {
        this.data[x * this.row + y] = value;
        return this;
    }
}
