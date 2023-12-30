import "../functions/echarts-line";
import "./style.css";

import { createApp, h } from "vue";
import appcom from "../path-planning/show-drawGridMap-PointsInsideAllConvexPolygons-test-1.vue";

document.title = "ant-colony-algorithm-for-multiple-populations";

export const app = createApp({
    render() {
        return h(appcom);
    },
});
