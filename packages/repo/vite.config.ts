import react from "@vitejs/plugin-react";
import { resolve } from "path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

export default defineConfig({
  plugins: [react(), dts()],
  build: {
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: resolve(__dirname, "index.ts"),
      name: "MooseDeskCore",
      // the proper extensions will be added
      fileName: "index.es.js",
      formats: ["es", "cjs"],
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ["react", ...Object.keys(import("./package.json"))],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        entryFileNames: "index.es.js", // Set the desired filename
        chunkFileNames: "chunk-[name].js", // Set the desired chunk filename
        assetFileNames: "assets/[name].[ext]", // Set the desired asset filename
        globals: {},
      },
    },
  },
});
