import { Float64areEqual } from "./Float64areEqual";
import { SegmentTreeNode } from "./SegmentTreeNode";


export { RangeModule };
/**
 * RangeModule 类用于处理区间覆盖问题。
 *
 * 区间覆盖问题是一种数据结构问题，其中每个节点代表一个闭区间 [start, end]，
 * 并且包含一个计数器（covered）来表示该区间被覆盖的次数。
 * 每个节点还可能有左右子节点，分别代表更小的区间。
 *
 *
 * 这段代码定义了一个名为 RangeModule 的类。这个类用于处理区间覆盖问题。它包含一个私有成员变量 root，这是一个 SegmentTreeNode 类型的对象，用于存储整个区
 * 间树的根节点。

RangeModule 类提供了以下公共方法：

addRange(left: number, right: number): void：添加一个新的范围 [left, right] 到当前树中。
queryRange(left: number, right: number): boolean：查询指定范围 [left, right] 是否完全在已添加的范围内。如果指定范围完全在已添加的范围内，则返回 true，否则返回 false。
removeRange(left: number, right: number): void：从当前树中移除指定范围 [left, right]。
getAvailableRanges(): number[][]：获取所有未被覆盖的可用范围。返回一个二维数组，其中每个元素是一个范围 [start, end]。
此外，RangeModule 类还包含一些私有辅助方法，如 #addRangeToSegmentTree()、#queryRangeInSegmentTree()、#removeRangeFromSegmentTree() 等，用于处理与区间树相关的操作。

RangeModule 类使用了 SegmentTreeNode 类作为其内部的数据结构。SegmentTreeNode 类表示一个区间覆盖问题中的节点，它包含区间的开始位置、结束位置、覆盖次数等信息，并可能有左右子节点，分别代表更小的区间。

私有辅助方法包括：

#addRangeToSegmentTree(node: SegmentTreeNode, left: number, right: number): void：递归地向树中添加一个范围。
#queryRangeInSegmentTree(node: SegmentTreeNode, left: number, right: number): boolean：递归地查询指定范围是否完全在已添加的范围内。
#removeRangeFromSegmentTree(node: SegmentTreeNode, left: number, right: number): void：递归地从树中移除指定范围。
#pushdown(node: SegmentTreeNode)：向下传递节点的属性值。
#pushup(node: SegmentTreeNode)：向上合并子节点的信息。
`#getAvailableRangesFromSegmentTree(node: SegmentTreeNode, result: number[][]
    ): void`：递归地获取所有未被覆盖的可用范围。
- `#mergeAvailableRanges(ranges: number[][]): number[][]`：合并连续的可用范围。

这个类的主要功能是处理区间覆盖问题。通过使用区间树的数据结构，可以高效地进行添加、查询和移除操作。同时，它还提供了获取所有未被覆盖的可用范围的方法，并在返回结果时自动合并了连续的可用范围。

需要注意的是，为了简化代码，这里假设输入参数 `left` 和 `right` 始终满足 `left <= right`。如果实际应用中可能有不满足此条件的情况，可以在每个方法的开始处添加检查并调整参数顺序以确保正确性。
 */
class RangeModule {
    private root: SegmentTreeNode;

    constructor(
        public left: number = Number.MIN_SAFE_INTEGER,
        public right: number = Number.MAX_SAFE_INTEGER,
        public epsilon =1
    ) {
        this.root = new SegmentTreeNode(left, right);
    }
    /**
     * 添加一个新的范围 [left, right] 到当前树中。
     *
     * @param {number} left - 范围的开始位置。
     * @param {number} right - 范围的结束位置。
     */
    addRange(left: number, right: number): void {
        // console.log("addRange", { left, right });
        // debugger;
        this.#addRangeToSegmentTree(this.root, left, right);
        // debugger;
        // console.log(JSON.stringify(this));
    }

    /** private */
    /**
    
    递归地向树中添加一个范围。
    */
    #addRangeToSegmentTree(
        node: SegmentTreeNode,
        left: number,
        right: number,
    ): void {
        if (left >= right) return;
        if (node.start >= right || node.end <= left) {
            return; // 当前区间与目标区间无交集，直接返回
        }

        if (node.start >= left && node.end <= right) {
            node.covered = 1; // 当前区间被完全覆盖，标记为已覆盖
            node.leftChild = null;
            node.rightChild = null;
            return;
        }

        this.#pushdown(node);
        // console.log({ node, left, mid, right })
        if (node.leftChild)
            this.#addRangeToSegmentTree(node.leftChild, left, right);
        if (node.rightChild)
            this.#addRangeToSegmentTree(node.rightChild, left, right);
        this.#pushup(node);
    }
    /**
     * 查询指定范围 [left, right] 是否完全在已添加的范围内。
     *
     * @param {number} left - 要查询的范围的开始位置。
     * @param {number} right - 要查询的范围的结束位置。
     * @returns {boolean} 如果指定范围完全在已添加的范围内，则返回 true，否则返回 false。
     */
    queryRange(left: number, right: number): boolean {
        const result = this.#queryRangeInSegmentTree(this.root, left, right);
        //console.log({ node: this.root, left, right, result });
        return result;
    }

    /* private */
    /** 递归地查询指定范围是否完全在已添加的范围内。*/
    #queryRangeInSegmentTree(
        node: SegmentTreeNode,
        left: number,
        right: number,
    ): boolean {
        if (!node) return true;
        // debugger;
        if (left >= right) return true;
        if (node.start >= right || node.end <= left) {
            return true; // 当前区间与目标区间无交集，表示目标区间在当前区间之外，返回true
        }
        // if (node.start >= left && node.end <= right) {
        if (Float64areEqual(0, node.covered)) {
            return false;
        }
        if (Float64areEqual(1, node.covered)) {
            return true; // 当前区间被完全覆盖，判断是否在目标区间之内
        }
        // }

        const lr = Boolean(
            node.leftChild
                ? this.#queryRangeInSegmentTree(node.leftChild, left, right)
                : Float64areEqual(1, node.covered),
        );
        const rr = Boolean(
            node.rightChild
                ? this.#queryRangeInSegmentTree(node.rightChild, left, right)
                : Float64areEqual(1, node.covered),
        );
        //console.log({ node: node.leftChild, left, right, result: lr });
        //  console.log({ node: node.rightChild, left, right, result: rr });
        return Boolean(lr && rr);
    }
    /**
     * 从当前树中移除指定范围 [left, right]。
     *
     * @param {number} left - 要移除的范围的开始位置。
     * @param {number} right - 要移除的范围的结束位置。
     */
    removeRange(left: number, right: number): void {
        this.#removeRangeFromSegmentTree(this.root, left, right);
    }

    /* private */
    /**递归地从树中移除指定范围。 */
    #removeRangeFromSegmentTree(
        node: SegmentTreeNode,
        left: number,
        right: number,
    ): void {
        // if (node.start === 35) debugger;
        if (left >= right) return;
        if (node.start >= right || node.end <= left) {
            return; // 当前区间与目标区间无交集，直接返回
        }

        if (node.start >= left && node.end <= right) {
            node.covered = 0; // 当前区间被完全覆盖，标记为未覆盖，并删除子节点
            node.leftChild = null;
            node.rightChild = null;
            return;
        }
        //需要重新创建子节点

        this.#pushdown(node);
        if (node.leftChild)
            this.#removeRangeFromSegmentTree(node.leftChild, left, right);
        if (node.rightChild)
            this.#removeRangeFromSegmentTree(node.rightChild, left, right);

        this.#pushup(node);
        // debugger;
    }
    /**向下传递节点的属性值。 */
    #pushdown(node: SegmentTreeNode) {
        //浮点数可能存在问题
        const mid =
            Math.round((node.start + node.end) / 2 / this.epsilon) *
            this.epsilon;

        if (node.end > mid && mid > node.start) {
            if (!node.leftChild) {
                node.leftChild = new SegmentTreeNode(node.start, mid);
            }
            if (!node.rightChild) {
                node.rightChild = new SegmentTreeNode(mid, node.end);
            }
        }
        if (Float64areEqual(1, node.covered) && node.leftChild)
            node.leftChild.covered = 1;
        if (Float64areEqual(1, node.covered) && node.rightChild)
            node.rightChild.covered = 1;
        if (Float64areEqual(0, node.covered) && node.leftChild)
            node.leftChild.covered = 0;
        if (Float64areEqual(0, node.covered) && node.rightChild)
            node.rightChild.covered = 0;
    }
    /**向上合并子节点的信息。 */
    #pushup(node: SegmentTreeNode) {
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
    /**
     * 获取所有未被覆盖的可用范围。
     *
     * @returns {number[][]} 返回一个二维数组，其中每个元素是一个范围 [start, end]。
     */
    getAvailableRanges(): number[][] {
        const result: number[][] = [];
        this.#getAvailableRangesFromSegmentTree(this.root, result);
        //需要合并连续的区间
        // console.log("getAvailableRanges", result);
        return this.#mergeAvailableRanges(result);
    }

    /* 合并连续的区间 */
    /* private */
    /**递归地获取所有未被覆盖的可用范围。 */
    #mergeAvailableRanges(ranges: number[][]): number[][] {
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

    /* private */

    /**合并连续的可用范围。*/
    #getAvailableRangesFromSegmentTree(
        node: SegmentTreeNode,
        result: number[][],
    ): void {
        // if (node.start === 35) debugger;
        //需要合并连续的区间
        if (!node || Float64areEqual(node.covered, 0)) {
            return; // 当前节点为空或被覆盖，直接返回
        }

        if (
            !node.leftChild &&
            !node.rightChild &&
            Float64areEqual(node.covered, 1)
        ) {
            result.push([node.start, node.end]); // 叶节点，添加到结果中
            // debugger;
            return;
        }

        if (node.leftChild)
            this.#getAvailableRangesFromSegmentTree(node.leftChild, result);
        if (node.rightChild)
            this.#getAvailableRangesFromSegmentTree(node.rightChild, result);
    }
}
