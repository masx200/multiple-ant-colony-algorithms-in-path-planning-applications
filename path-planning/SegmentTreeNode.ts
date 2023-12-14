/**
 * SegmentTreeNode 类表示一个区间覆盖问题中的节点。
 *
 * 区间覆盖问题是一种数据结构问题，其中每个节点代表一个闭区间 [start, end]，
 * 并且包含一个计数器（covered）来表示该区间被覆盖的次数。
 * 每个节点还可能有左右子节点，分别代表更小的区间。
 *
 * @param {number} start - 区间开始位置。
 * @param {number} end - 区间结束位置。
 * @param {number} covered - 区间被覆盖的次数，默认为 0。
 * @param {SegmentTreeNode | null} leftChild - 左子节点，默认为 null。
 * @param {SegmentTreeNode | null} rightChild - 右子节点，默认为 null。
 * 这段代码定义了一个名为 `SegmentTreeNode` 的类。这个类用于表示一个区间覆盖问题中的节点。在区间覆盖问题中，每个节点代表一个闭区间 `[start, end]`，并包含一个计数器（`covered`）来表示该区间被覆盖的次数。每个节点还可能有左右子节点，分别代表更小的区间。

类的构造函数接受五个参数：

- `start`：区间的开始位置。
- `end`：区间的结束位置。
- `covered`：区间的覆盖次数，默认值为 0。
- `leftChild`：左子节点，默认值为 `null`。
- `rightChild`：右子节点，默认值为 `null`。
 */
export class SegmentTreeNode {
    constructor(
        public start: number = Number.MIN_SAFE_INTEGER,
        public end: number = Number.MAX_SAFE_INTEGER,
        public covered: number = 0,
        public leftChild: SegmentTreeNode | null = null,
        public rightChild: SegmentTreeNode | null = null,
    ) {}
}
