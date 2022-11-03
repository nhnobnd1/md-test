/// <reference types="vitest" />

import react from "@vitejs/plugin-react";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import { defineConfig } from "vite";
import eslintPlugin from "vite-plugin-eslint";

if (
  process.env.npm_lifecycle_event === "build" &&
  !process.env.CI &&
  !process.env.SHOPIFY_API_KEY
) {
  console.warn(
    "\nBuilding the frontend app without an API key. The frontend build will not run without an API key. Set the SHOPIFY_API_KEY environment variable when running the build command.\n"
  );
}

const proxyOptions = {
  target: `http://127.0.0.1:${process.env.BACKEND_PORT}`,
  changeOrigin: false,
  secure: true,
  ws: false,
};

const host = process.env.HOST
  ? process.env.HOST.replace(/https?:\/\//, "")
  : "localhost";

let hmrConfig;
if (host === "localhost") {
  hmrConfig = {
    protocol: "ws",
    host: "localhost",
    port: 64999,
    clientPort: 64999,
  };
} else {
  hmrConfig = {
    protocol: "wss",
    host: host,
    port: process.env.FRONTEND_PORT,
    clientPort: 443,
  };
}

export default defineConfig({
  root: dirname(fileURLToPath(import.meta.url)),
  plugins: [
    react(),
    eslintPlugin({
      cache: false,
    }),
  ],
  define: {
    "process.env.SHOPIFY_API_KEY": JSON.stringify(process.env.SHOPIFY_API_KEY),
  },
  resolve: {
    preserveSymlinks: true,
    alias: [
      { find: "src", replacement: path.resolve(__dirname, "src") },
      { find: "/src", replacement: path.resolve(__dirname, "src") },
      { find: "templates", replacement: path.resolve(__dirname, "templates") },
      { find: /^~/, replacement: "" },
    ],
  },
  server: {
    host: "localhost",
    port: Number(process.env.FRONTEND_PORT),
    hmr: hmrConfig,
    proxy: {
      "^/(\\?.*)?$": proxyOptions,
      "^/api(/|(\\?.*)?$)": proxyOptions,
    },
  },

  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./__test__/test.setup.ts",
    exclude: [
      "node_modules",
      "dist",
      ".idea",
      ".git",
      ".vscode",
      ".cache",
      "./src/core",
    ],
    coverage: {
      exclude: ["src/core"],
    },
  },
});
