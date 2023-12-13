import { assert, test } from "vitest";

import { Vec } from "./Vec";

test("vector", () => {
    const vec1 = new Vec(3, 4);
    const vec2 = new Vec(1, 2);

    assert.equal("",vec1.normal().toString()); // 输出：(-0.8, 0.6)
    assert.equal("",vec1.unit().toString()); // 输出：(0.6, 0.8)
    assert.equal("",vec1.add(vec2).toString()); // 输出：(4, 6)
    assert.equal("",vec1.subtract(vec2).toString()); // 输出：(2, 2)
    assert.equal("",vec1.multiply(2).toString()); // 输出：(6, 8)
    assert.equal("",vec1.divide(2).toString()); // 输出：(1.5, 2)
});
