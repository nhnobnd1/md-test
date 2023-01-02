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
      { find: "/src", replacement: path.resolve(__vite_injected_original_dirname, "src") },
      { find: "templates", replacement: path.resolve(__vite_injected_original_dirname, "templates") },
      { find: /^~antd/, replacement: "antd" }
    ]
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxkZWxsXFxcXERlc2t0b3BcXFxcTURcXFxcc2hvcGlmeS1jbXNcXFxcYXBwc1xcXFxzdGFuZGFsb25lXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxkZWxsXFxcXERlc2t0b3BcXFxcTURcXFxcc2hvcGlmeS1jbXNcXFxcYXBwc1xcXFxzdGFuZGFsb25lXFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9Vc2Vycy9kZWxsL0Rlc2t0b3AvTUQvc2hvcGlmeS1jbXMvYXBwcy9zdGFuZGFsb25lL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHJlYWN0IGZyb20gXCJAdml0ZWpzL3BsdWdpbi1yZWFjdFwiO1xuaW1wb3J0IHBhdGggZnJvbSBcInBhdGhcIjtcbmltcG9ydCBJY29ucyBmcm9tIFwidW5wbHVnaW4taWNvbnMvdml0ZVwiO1xuaW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSBcInZpdGVcIjtcbmltcG9ydCBlc2xpbnRQbHVnaW4gZnJvbSBcInZpdGUtcGx1Z2luLWVzbGludFwiO1xuXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgcGx1Z2luczogW1xuICAgIHJlYWN0KCksXG4gICAgZXNsaW50UGx1Z2luKHtcbiAgICAgIGNhY2hlOiBmYWxzZSxcbiAgICB9KSxcbiAgICBJY29ucyh7IGpzeDogXCJyZWFjdFwiLCBjb21waWxlcjogXCJqc3hcIiwgYXV0b0luc3RhbGw6IHRydWUgfSksXG4gIF0sXG4gIHJlc29sdmU6IHtcbiAgICBwcmVzZXJ2ZVN5bWxpbmtzOiB0cnVlLFxuICAgIGFsaWFzOiBbXG4gICAgICB7IGZpbmQ6IFwic3JjXCIsIHJlcGxhY2VtZW50OiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCBcInNyY1wiKSB9LFxuICAgICAgeyBmaW5kOiBcIi9zcmNcIiwgcmVwbGFjZW1lbnQ6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsIFwic3JjXCIpIH0sXG4gICAgICB7IGZpbmQ6IFwidGVtcGxhdGVzXCIsIHJlcGxhY2VtZW50OiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCBcInRlbXBsYXRlc1wiKSB9LFxuICAgICAgeyBmaW5kOiAvXn5hbnRkLywgcmVwbGFjZW1lbnQ6IFwiYW50ZFwiIH0sXG4gICAgXSxcbiAgfSxcbn0pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUE4VixPQUFPLFdBQVc7QUFDaFgsT0FBTyxVQUFVO0FBQ2pCLE9BQU8sV0FBVztBQUNsQixTQUFTLG9CQUFvQjtBQUM3QixPQUFPLGtCQUFrQjtBQUp6QixJQUFNLG1DQUFtQztBQU96QyxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTO0FBQUEsSUFDUCxNQUFNO0FBQUEsSUFDTixhQUFhO0FBQUEsTUFDWCxPQUFPO0FBQUEsSUFDVCxDQUFDO0FBQUEsSUFDRCxNQUFNLEVBQUUsS0FBSyxTQUFTLFVBQVUsT0FBTyxhQUFhLEtBQUssQ0FBQztBQUFBLEVBQzVEO0FBQUEsRUFDQSxTQUFTO0FBQUEsSUFDUCxrQkFBa0I7QUFBQSxJQUNsQixPQUFPO0FBQUEsTUFDTCxFQUFFLE1BQU0sT0FBTyxhQUFhLEtBQUssUUFBUSxrQ0FBVyxLQUFLLEVBQUU7QUFBQSxNQUMzRCxFQUFFLE1BQU0sUUFBUSxhQUFhLEtBQUssUUFBUSxrQ0FBVyxLQUFLLEVBQUU7QUFBQSxNQUM1RCxFQUFFLE1BQU0sYUFBYSxhQUFhLEtBQUssUUFBUSxrQ0FBVyxXQUFXLEVBQUU7QUFBQSxNQUN2RSxFQUFFLE1BQU0sVUFBVSxhQUFhLE9BQU87QUFBQSxJQUN4QztBQUFBLEVBQ0Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
