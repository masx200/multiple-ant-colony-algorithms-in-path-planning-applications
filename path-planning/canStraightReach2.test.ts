import { assert, test } from "vitest";

import { canStraightReach } from "./canStraightReach";
import { GridMap } from "./grid-map";

test("canStraightReach", () => {
    assert.equal(canStraightReach([1, 1], [1, 1], new GridMap(5, 5)), true);
});
test("canStraightReach", () => {
    assert.equal(canStraightReach([0, 0], [4, 4], new GridMap(5, 5)), true);
});
test("canStraightReach", () => {
    const grid = new GridMap(5, 5);
    grid.setObstacle(0, 1);
    grid.setObstacle(1, 0);
    assert.equal(canStraightReach([0, 0], [4, 4], grid), false);
});
