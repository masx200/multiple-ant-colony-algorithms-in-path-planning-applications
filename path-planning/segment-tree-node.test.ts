import { describe, expect, it } from "vitest";
import { SegmentTreeNode } from "./SegmentTreeNode";

describe("SegmentTreeNode", () => {
    it("should initialize a node with default values", () => {
        const node = new SegmentTreeNode(1, 5);
        expect(node.start).toBe(1);
        expect(node.end).toBe(5);
        expect(node.covered).toBe(0);
        expect(node.leftChild).toBe(null);
        expect(node.rightChild).toBe(null);
    });

    it("should initialize a node with custom values", () => {
        const leftChild = new SegmentTreeNode(2, 3, 1);
        const rightChild = new SegmentTreeNode(4, 5, 2);
        const node = new SegmentTreeNode(1, 5, 3, leftChild, rightChild);

        expect(node.start).toBe(1);
        expect(node.end).toBe(5);
        expect(node.covered).toBe(3);
        expect(node.leftChild).toEqual(leftChild);
        expect(node.rightChild).toEqual(rightChild);
    });
});
