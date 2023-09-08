import react from "@vitejs/plugin-react";
import path from "path";
import Icons from "unplugin-icons/vite";
import { defineConfig } from "vite";
import eslintPlugin from "vite-plugin-eslint";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [
    react(),
    eslintPlugin({
      cache: false,
    }),
    Icons({ jsx: "react", compiler: "jsx", autoInstall: true }),
  ],
  resolve: {
    preserveSymlinks: true,
    alias: [
      { find: "src", replacement: path.resolve(__dirname, "src") },
      { find: "templates", replacement: path.resolve(__dirname, "templates") },
      { find: /^~antd/, replacement: "antd" },
      {
        find: "@moose-beta",
        replacement: path.resolve(__dirname, "src/modules/BetaVersion"),
      },
    ],
  },
  server: {
    watch: {
      usePolling: true,
    },
    host: true, // needed for the Docker Container port mapping to work
    strictPort: true,
    port: 3580, // you can replace this port with any port
  },
  esbuild: {
    drop: mode === "production" ? ["console", "debugger"] : [],
  },
  // build: {
  //   rollupOptions: {
  //     output: {
  //       entryFileNames: "index.js", // Set the desired filename
  //       chunkFileNames: "chunk-[name].js", // Set the desired chunk filename
  //       assetFileNames: "assets/[name].[ext]", // Set the desired asset filename
  //     },
  //   },
  // },
}));
