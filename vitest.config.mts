import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vitest/config";

// Unit tests for pure logic in lib/ and content/. Node environment: no DOM.
export default defineConfig({
  resolve: {
    alias: {
      "@": fileURLToPath(new URL(".", import.meta.url)),
    },
  },
  test: {
    environment: "node",
    include: ["tests/**/*.test.ts"],
  },
});
