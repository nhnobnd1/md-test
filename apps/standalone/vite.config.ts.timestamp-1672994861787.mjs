// vite.config.ts
import react from "file:///C:/Users/dell/Desktop/MD/shopify-cms/node_modules/@vitejs/plugin-react/dist/index.mjs";
import path from "path";
import Icons from "file:///C:/Users/dell/Desktop/MD/shopify-cms/node_modules/unplugin-icons/dist/vite.mjs";
import { defineConfig } from "file:///C:/Users/dell/Desktop/MD/shopify-cms/node_modules/vite/dist/node/index.js";
import eslintPlugin from "file:///C:/Users/dell/Desktop/MD/shopify-cms/apps/standalone/node_modules/vite-plugin-eslint/dist/index.mjs";
var __vite_injected_original_dirname = "C:\\Users\\dell\\Desktop\\MD\\shopify-cms\\apps\\standalone";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    eslintPlugin({
      cache: false
    }),
    Icons({ jsx: "react", compiler: "jsx", autoInstall: true })
  ],
  resolve: {
    preserveSymlinks: true,
    alias: [
      { find: "src", replacement: path.resolve(__vite_injected_original_dirname, "src") },
      { find: "templates", replacement: path.resolve(__vite_injected_original_dirname, "templates") },
      { find: /^~antd/, replacement: "antd" },
      { find: /^~/, replacement: "" }
    ]
  },
  server: {
    watch: {
      usePolling: true
    },
    host: true,
    strictPort: true,
    port: 3580
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxkZWxsXFxcXERlc2t0b3BcXFxcTURcXFxcc2hvcGlmeS1jbXNcXFxcYXBwc1xcXFxzdGFuZGFsb25lXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxkZWxsXFxcXERlc2t0b3BcXFxcTURcXFxcc2hvcGlmeS1jbXNcXFxcYXBwc1xcXFxzdGFuZGFsb25lXFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9Vc2Vycy9kZWxsL0Rlc2t0b3AvTUQvc2hvcGlmeS1jbXMvYXBwcy9zdGFuZGFsb25lL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHJlYWN0IGZyb20gXCJAdml0ZWpzL3BsdWdpbi1yZWFjdFwiO1xuaW1wb3J0IHBhdGggZnJvbSBcInBhdGhcIjtcbmltcG9ydCBJY29ucyBmcm9tIFwidW5wbHVnaW4taWNvbnMvdml0ZVwiO1xuaW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSBcInZpdGVcIjtcbmltcG9ydCBlc2xpbnRQbHVnaW4gZnJvbSBcInZpdGUtcGx1Z2luLWVzbGludFwiO1xuXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgcGx1Z2luczogW1xuICAgIHJlYWN0KCksXG4gICAgZXNsaW50UGx1Z2luKHtcbiAgICAgIGNhY2hlOiBmYWxzZSxcbiAgICB9KSxcbiAgICBJY29ucyh7IGpzeDogXCJyZWFjdFwiLCBjb21waWxlcjogXCJqc3hcIiwgYXV0b0luc3RhbGw6IHRydWUgfSksXG4gIF0sXG4gIHJlc29sdmU6IHtcbiAgICBwcmVzZXJ2ZVN5bWxpbmtzOiB0cnVlLFxuICAgIGFsaWFzOiBbXG4gICAgICB7IGZpbmQ6IFwic3JjXCIsIHJlcGxhY2VtZW50OiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCBcInNyY1wiKSB9LFxuICAgICAgeyBmaW5kOiBcInRlbXBsYXRlc1wiLCByZXBsYWNlbWVudDogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgXCJ0ZW1wbGF0ZXNcIikgfSxcbiAgICAgIHsgZmluZDogL15+YW50ZC8sIHJlcGxhY2VtZW50OiBcImFudGRcIiB9LFxuICAgICAgeyBmaW5kOiAvXn4vLCByZXBsYWNlbWVudDogXCJcIiB9LFxuICAgIF0sXG4gIH0sXG4gIHNlcnZlcjoge1xuICAgIHdhdGNoOiB7XG4gICAgICB1c2VQb2xsaW5nOiB0cnVlLFxuICAgIH0sXG4gICAgaG9zdDogdHJ1ZSwgLy8gbmVlZGVkIGZvciB0aGUgRG9ja2VyIENvbnRhaW5lciBwb3J0IG1hcHBpbmcgdG8gd29ya1xuICAgIHN0cmljdFBvcnQ6IHRydWUsXG4gICAgcG9ydDogMzU4MCwgLy8geW91IGNhbiByZXBsYWNlIHRoaXMgcG9ydCB3aXRoIGFueSBwb3J0XG4gIH0sXG59KTtcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBOFYsT0FBTyxXQUFXO0FBQ2hYLE9BQU8sVUFBVTtBQUNqQixPQUFPLFdBQVc7QUFDbEIsU0FBUyxvQkFBb0I7QUFDN0IsT0FBTyxrQkFBa0I7QUFKekIsSUFBTSxtQ0FBbUM7QUFPekMsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsU0FBUztBQUFBLElBQ1AsTUFBTTtBQUFBLElBQ04sYUFBYTtBQUFBLE1BQ1gsT0FBTztBQUFBLElBQ1QsQ0FBQztBQUFBLElBQ0QsTUFBTSxFQUFFLEtBQUssU0FBUyxVQUFVLE9BQU8sYUFBYSxLQUFLLENBQUM7QUFBQSxFQUM1RDtBQUFBLEVBQ0EsU0FBUztBQUFBLElBQ1Asa0JBQWtCO0FBQUEsSUFDbEIsT0FBTztBQUFBLE1BQ0wsRUFBRSxNQUFNLE9BQU8sYUFBYSxLQUFLLFFBQVEsa0NBQVcsS0FBSyxFQUFFO0FBQUEsTUFDM0QsRUFBRSxNQUFNLGFBQWEsYUFBYSxLQUFLLFFBQVEsa0NBQVcsV0FBVyxFQUFFO0FBQUEsTUFDdkUsRUFBRSxNQUFNLFVBQVUsYUFBYSxPQUFPO0FBQUEsTUFDdEMsRUFBRSxNQUFNLE1BQU0sYUFBYSxHQUFHO0FBQUEsSUFDaEM7QUFBQSxFQUNGO0FBQUEsRUFDQSxRQUFRO0FBQUEsSUFDTixPQUFPO0FBQUEsTUFDTCxZQUFZO0FBQUEsSUFDZDtBQUFBLElBQ0EsTUFBTTtBQUFBLElBQ04sWUFBWTtBQUFBLElBQ1osTUFBTTtBQUFBLEVBQ1I7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
