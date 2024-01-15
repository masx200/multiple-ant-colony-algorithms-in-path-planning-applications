import { closed_total_path_length } from "../functions/closed-total-path-length";
import { creategetdistancebyIndex } from "../functions/creategetdistancebyIndex";
import { totalpathlengthwithoutcycle } from "../functions/totalpathlengthwithoutcycle";
import { assert_true } from "./assert_true";

export function testclosedtotalpathlength() {
    const node_coordinates: number[][] = [
        [0, 0],
        [0, 3],
        [4, 3],
    ];

    assert_true(
        12 ===
            closed_total_path_length({
                path: [0, 1, 2],
                getdistancebyIndex: creategetdistancebyIndex(node_coordinates),
            }),
    );
    assert_true(3 === totalpathlengthwithoutcycle([0, 1], node_coordinates));
}
