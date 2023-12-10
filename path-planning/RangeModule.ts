import { Float64areEqual } from "./Float64areEqual";
import { SegmentTreeNode } from "./SegmentTreeNode";
export { RangeModule, SegmentTreeNode };
class RangeModule {
    private root: SegmentTreeNode;

    constructor(
        public left: number,
        public right: number,
    ) {
        this.root = new SegmentTreeNode(left, right);
    }

    addRange(left: number, right: number): void {
        this.addRangeToSegmentTree(this.root, left, right);
    }

    private addRangeToSegmentTree(
        node: SegmentTreeNode,
        left: number,
        right: number,
    ): void {
        if (left >= right) return;
        if (node.start > right || node.end < left) {
            return; // 当前区间与目标区间无交集，直接返回
        }

        if (node.start >= left && node.end <= right) {
            node.covered = 1; // 当前区间被完全覆盖，标记为已覆盖
            node.leftChild = null;
            node.rightChild = null;
            return;
        }
        //浮点数可能存在问题
        const mid = (node.start + node.end) / 2;

        if (node.end > mid && mid > node.start) {
            if (!node.leftChild) {
                node.leftChild = new SegmentTreeNode(node.start, mid);
            }
            if (!node.rightChild) {
                node.rightChild = new SegmentTreeNode(mid, node.end);
            }
        }
        this.pushdown(node);
        // console.log({ node, left, mid, right })
        if (node.leftChild)
            this.addRangeToSegmentTree(node.leftChild, left, right);
        if (node.rightChild)
            this.addRangeToSegmentTree(node.rightChild, left, right);
        this.pushup(node);
    }

    queryRange(left: number, right: number): boolean {
        return this.queryRangeInSegmentTree(this.root, left, right);
    }

    private queryRangeInSegmentTree(
        node: SegmentTreeNode,
        left: number,
        right: number,
    ): boolean {
        if (left >= right) return true;
        if (node.start > right || node.end < left) {
            return true; // 当前区间与目标区间无交集，表示目标区间在当前区间之外，返回true
        }

        if (Float64areEqual(1, node.covered)) {
            return node.start >= left && node.end <= right; // 当前区间被完全覆盖，判断是否在目标区间之内
        }

        return Boolean(
            node.leftChild &&
                this.queryRangeInSegmentTree(node.leftChild, left, right) &&
                node.rightChild &&
                this.queryRangeInSegmentTree(node.rightChild, left, right),
        );
    }

    removeRange(left: number, right: number): void {
        this.removeRangeFromSegmentTree(this.root, left, right);
    }

    private removeRangeFromSegmentTree(
        node: SegmentTreeNode,
        left: number,
        right: number,
    ): void {
        if (left >= right) return;
        if (node.start > right || node.end < left) {
            return; // 当前区间与目标区间无交集，直接返回
        }

        if (node.start >= left && node.end <= right) {
            node.covered = 0; // 当前区间被完全覆盖，标记为未覆盖，并删除子节点
            node.leftChild = null;
            node.rightChild = null;
            return;
        }
        //需要重新创建子节点
        //浮点数可能存在问题
        const mid = (node.start + node.end) / 2;

        if (node.end > mid && mid > node.start) {
            if (!node.leftChild) {
                node.leftChild = new SegmentTreeNode(node.start, mid);
            }
            if (!node.rightChild) {
                node.rightChild = new SegmentTreeNode(mid, node.end);
            }
        }
        this.pushdown(node);
        if (node.leftChild)
            this.removeRangeFromSegmentTree(node.leftChild, left, right);
        if (node.rightChild)
            this.removeRangeFromSegmentTree(node.rightChild, left, right);

        this.pushup(node);
        // debugger;
    }
    pushdown(node: SegmentTreeNode) {
        if (Float64areEqual(1, node.covered) && node.leftChild)
            node.leftChild.covered = 1;
        if (Float64areEqual(1, node.covered) && node.rightChild)
            node.rightChild.covered = 1;
        if (Float64areEqual(0, node.covered) && node.leftChild)
            node.leftChild.covered = 0;
        if (Float64areEqual(0, node.covered) && node.rightChild)
            node.rightChild.covered = 0;
    }
    pushup(node: SegmentTreeNode) {
        if (node.leftChild?.covered === 1 && node.rightChild?.covered === 1) {
            node.covered = 1;
            node.leftChild = null;
            node.rightChild = null;
            return;
        }

        node.covered =
            (node.leftChild
                ? (node.leftChild.covered *
                      (node.leftChild.end - node.leftChild.start)) /
                  (node.end - node.start)
                : 0) +
            (node.rightChild
                ? (node.rightChild.covered *
                      (node.rightChild.end - node.rightChild.start)) /
                  (node.end - node.start)
                : 0);
        if (Float64areEqual(1, node.covered)) {
            node.covered = 1;
            node.leftChild = null;
            node.rightChild = null;
            return;
        }
        if (Float64areEqual(0, node.covered)) {
            node.covered = 0;
            node.leftChild = null;
            node.rightChild = null;
            return;
        }
    }
    getAvailableRanges(): number[][] {
        const result: number[][] = [];
        this.getAvailableRangesFromSegmentTree(this.root, result);
        //需要合并连续的区间

        return this.mergeAvailableRanges(result);
    }

    /* 合并连续的区间 */
    private mergeAvailableRanges(ranges: number[][]): number[][] {
        const result: number[][] = [];
        for (const range of ranges) {
            if (result.length === 0) {
                result.push(range);
                continue;
            }
            const last = result[result.length - 1];
            if (last[1] >= range[0]) {
                last[1] = Math.max(last[1], range[1]);
            } else {
                result.push(range);
            }
        }
        return result;
    }

    private getAvailableRangesFromSegmentTree(
        node: SegmentTreeNode,
        result: number[][],
    ): void {
        //需要合并连续的区间
        if (!node || Float64areEqual(node.covered, 0)) {
            return; // 当前节点为空或被覆盖，直接返回
        }

        if (!node.leftChild && !node.rightChild) {
            result.push([node.start, node.end]); // 叶节点，添加到结果中
            return;
        }

        if (node.leftChild)
            this.getAvailableRangesFromSegmentTree(node.leftChild, result);
        if (node.rightChild)
            this.getAvailableRangesFromSegmentTree(node.rightChild, result);
    }
}
