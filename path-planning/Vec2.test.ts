import { assert, test } from "vitest";
import { Vec } from "./Vec";

test("vector", () => {
    const vec1 = new Vec(3, 4);
    const vec2 = new Vec(1, 2);

    assert.equal('{"x":-0.8,"y":0.6}', JSON.stringify(vec1.normal())); // 输出：(-0.8, 0.6)
    assert.equal('{"x":0.6,"y":0.8}', JSON.stringify(vec1.unit())); // 输出：(0.6, 0.8)
    assert.equal('{"x":4,"y":6}', JSON.stringify(vec1.add(vec2))); // 输出：(4, 6)
    assert.equal('{"x":2,"y":2}', JSON.stringify(vec1.subtract(vec2))); // 输出：(2, 2)
    assert.equal('{"x":6,"y":8}', JSON.stringify(vec1.multiply(2))); // 输出：(6, 8)
    assert.equal('{"x":1.5,"y":2}', JSON.stringify(vec1.divide(2))); // 输出：(1.5, 2)
});
