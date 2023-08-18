import react from "@vitejs/plugin-react";
import path, { dirname } from "path";
import Icons from "unplugin-icons/vite";
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

export default defineConfig(({ mode }) => ({
  root: dirname(fileURLToPath(import.meta.url)),
  plugins: [
    react(),
    eslintPlugin({
      cache: false,
    }),
    Icons({ jsx: "react", compiler: "jsx", autoInstall: true }),
  ],
  define: {
    "process.env.SHOPIFY_API_KEY": JSON.stringify(process.env.SHOPIFY_API_KEY),
    "process.env.HOST": JSON.stringify(process.env.HOST),
  },
  resolve: {
    preserveSymlinks: true,
    alias: [
      { find: "src", replacement: path.resolve(__dirname, "src") },
      { find: "templates", replacement: path.resolve(__dirname, "templates") },
      { find: /^~antd/, replacement: "antd" },
    ],
  },
  server: {
    host: "localhost",
    port: Number(process.env.FRONTEND_PORT),
    // hmr: hmrConfig,
    proxy: {
      "^/(\\?.*)?$": proxyOptions,
      "^/api(/|(\\?.*)?$)": proxyOptions,
    },
  },
  esbuild: {
    drop: mode === "production" ? ["console", "debugger"] : [],
  },
  build: {
    rollupOptions: {
      output: {
        entryFileNames: "index.js", // Set the desired filename
        chunkFileNames: "chunk-[name].js", // Set the desired chunk filename
        assetFileNames: "assets/[name].[ext]", // Set the desired asset filename
      },
    },
  },
}));
