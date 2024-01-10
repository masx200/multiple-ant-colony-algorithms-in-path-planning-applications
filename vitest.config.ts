import { defineConfig } from "vitest/config";

import { fileCache, httpResolve } from "@masx200/rollup-plugin-http-resolve";

export default defineConfig({
    plugins: [httpResolve({ cache: new fileCache() })],
});
