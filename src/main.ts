import "../functions/echarts-line";
import "./style.css";

import { createApp, h } from "vue";

// import appcom from "../path-planning/show-drawGridMap-PointsInsideAllConvexPolygons-test-3.vue";
import appcom from "./app-com.vue";

// import AllGridMap from "../all-grid-maps/index.ts";
// import appcom from "../path-planning/search-drawGridMap-test-random-reverse.vue";

// import appcom from "../path-planning/search-drawGridMap-test-greedy.vue";

// import appcom from "../path-planning/search-drawGridMap-test.vue";

document.title = "path-planning-ant-colony-algorithm-for-multiple-populations";

export const app = createApp({
    render() {
        return h(appcom);
    },
});
// console.log(AllGridMap);
