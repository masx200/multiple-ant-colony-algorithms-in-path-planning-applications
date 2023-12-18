import "./service-worker.ts";
import "core-js/stable/array/at";

import { appcontainer } from "./appcontainer";
import { app } from "./main";

// import "process";

app.config.errorHandler = (e: any) => {
    typeof alert === "function" &&
        alert?.(
            [
                String(e),
                e.message,
                String(e.error?.stack),
                String(e?.stack),
            ].join("\n"),
        );
    setTimeout(() => {
        throw e;
    });
};
app.mount(appcontainer);
self.addEventListener("unhandledrejection", (e) => {
    // console.log(self);
    // console.error(e);
    throw e.reason;
});
