import { expect, test } from "vitest";
import { isAngleInRange } from "./isAngleInRange";

/**

测试函数isAngleInRange
*/
test("isAngleInRange", () => {
    // 定义测试用例
    const testCases = [
        { a: 0, b: 0, c: Math.PI },
        { a: Math.PI / 3, b: 0, c: Math.PI },
        { a: -Math.PI, b: -Math.PI, c: Math.PI },
        { a: -Math.PI, b: -Math.PI, c: -Math.PI },
        { a: 0, b: Math.PI, c: 0 },
        { a: 0, b: -Math.PI, c: Math.PI },
        { a: -Math.PI, b: -Math.PI, c: -Math.PI },
        { a: Math.PI, b: -Math.PI, c: Math.PI },
        { a: Math.PI, b: Math.PI / 2, c: -Math.PI / 2 },
    ];
    // 进行测试
    for (const { a, b, c } of testCases) {
        const result = isAngleInRange(a, b, c);
        // console.log(a, b, c);
        expect(result).toBe(true);
    }
});
