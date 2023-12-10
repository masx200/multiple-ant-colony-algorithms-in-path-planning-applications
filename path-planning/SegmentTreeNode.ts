export class SegmentTreeNode {
    constructor(
        public start: number,
        public end: number,
        public covered: number = 0,
        public leftChild: SegmentTreeNode | null = null,
        public rightChild: SegmentTreeNode | null = null,
    ) {}
}
