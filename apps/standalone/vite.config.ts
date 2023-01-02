import react from "@vitejs/plugin-react";
import path from "path";
import Icons from "unplugin-icons/vite";
import { defineConfig } from "vite";
import eslintPlugin from "vite-plugin-eslint";

// https://vitejs.dev/config/
export default defineConfig({
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
      { find: /^~/, replacement: "" },
    ],
  },
});
