import { fileCache } from "@masx200/rollup-plugin-http-resolve";
import { httpResolve } from "@masx200/rollup-plugin-http-resolve";
import { defineConfig } from "vitest/config";

export default defineConfig({
    plugins: [httpResolve({ cache: new fileCache() })],
});
