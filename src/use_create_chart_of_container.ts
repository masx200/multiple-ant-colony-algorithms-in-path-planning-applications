import * as echarts from "echarts";

import type { EChartsType } from "echarts/types/dist/shared.d.ts";
import { debounce } from "lodash-es";
import { debounce_animation_frame } from "./debounce_animation_frame";

export function use_create_chart_of_container(
    container: HTMLElement,
    cleanup: (hook: () => void) => void,
): Pick<EChartsType, "resize" | "setOption"> {
    const debouncedresize = debounce_animation_frame(
        debounce(() => {
            chart.resize();
        }),
    );
    const chart = echarts.init(container);

    const resizeobserver = new ResizeObserver(debouncedresize);
    resizeobserver.observe(container);
    window.addEventListener("resize", debouncedresize);
    const keys = ["resize", "setOption"];
    keys.forEach((key) => {
        Reflect.set(chart, key, Reflect.get(chart, key).bind(chart));
    });

    const resize = debounce_animation_frame(
        debounce(chart.resize),
    ) as EChartsType["resize"];

    const setOption = debounce_animation_frame(
        debounce(chart.setOption),
    ) as EChartsType["setOption"];
    cleanup(() => {
        resizeobserver.disconnect();
        window.removeEventListener("resize", debouncedresize);
    });
    return { resize, setOption } as Pick<EChartsType, "resize" | "setOption">;
}
