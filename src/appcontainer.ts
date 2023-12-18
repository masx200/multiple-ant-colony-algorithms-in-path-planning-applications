import { assert_true } from "../test/assert_true";

export const appcontainer = (() => {
    let app = document.querySelector<HTMLDivElement>("#app");
    if (!app) {
        app = document.createElement("div");
        app.id = "app";
        document.body.appendChild(app);
    }

    assert_true(app);
    return app;
})();
