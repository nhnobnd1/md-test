// vite.config.ts
import react from "file:///E:/ABC%20Soft/shopify/shopify-cms/node_modules/@vitejs/plugin-react/dist/index.mjs";
import path from "path";
import Icons from "file:///E:/ABC%20Soft/shopify/shopify-cms/node_modules/unplugin-icons/dist/vite.mjs";
import { defineConfig } from "file:///E:/ABC%20Soft/shopify/shopify-cms/node_modules/vite/dist/node/index.js";
import eslintPlugin from "file:///E:/ABC%20Soft/shopify/shopify-cms/apps/standalone/node_modules/vite-plugin-eslint/dist/index.mjs";
var __vite_injected_original_dirname = "E:\\ABC Soft\\shopify\\shopify-cms\\apps\\standalone";
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
      { find: /^~antd/, replacement: "antd" }
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJFOlxcXFxBQkMgU29mdFxcXFxzaG9waWZ5XFxcXHNob3BpZnktY21zXFxcXGFwcHNcXFxcc3RhbmRhbG9uZVwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRTpcXFxcQUJDIFNvZnRcXFxcc2hvcGlmeVxcXFxzaG9waWZ5LWNtc1xcXFxhcHBzXFxcXHN0YW5kYWxvbmVcXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0U6L0FCQyUyMFNvZnQvc2hvcGlmeS9zaG9waWZ5LWNtcy9hcHBzL3N0YW5kYWxvbmUvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgcmVhY3QgZnJvbSBcIkB2aXRlanMvcGx1Z2luLXJlYWN0XCI7XG5pbXBvcnQgcGF0aCBmcm9tIFwicGF0aFwiO1xuaW1wb3J0IEljb25zIGZyb20gXCJ1bnBsdWdpbi1pY29ucy92aXRlXCI7XG5pbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tIFwidml0ZVwiO1xuaW1wb3J0IGVzbGludFBsdWdpbiBmcm9tIFwidml0ZS1wbHVnaW4tZXNsaW50XCI7XG5cbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICBwbHVnaW5zOiBbXG4gICAgcmVhY3QoKSxcbiAgICBlc2xpbnRQbHVnaW4oe1xuICAgICAgY2FjaGU6IGZhbHNlLFxuICAgIH0pLFxuICAgIEljb25zKHsganN4OiBcInJlYWN0XCIsIGNvbXBpbGVyOiBcImpzeFwiLCBhdXRvSW5zdGFsbDogdHJ1ZSB9KSxcbiAgXSxcbiAgcmVzb2x2ZToge1xuICAgIHByZXNlcnZlU3ltbGlua3M6IHRydWUsXG4gICAgYWxpYXM6IFtcbiAgICAgIHsgZmluZDogXCJzcmNcIiwgcmVwbGFjZW1lbnQ6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsIFwic3JjXCIpIH0sXG4gICAgICB7IGZpbmQ6IFwidGVtcGxhdGVzXCIsIHJlcGxhY2VtZW50OiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCBcInRlbXBsYXRlc1wiKSB9LFxuICAgICAgeyBmaW5kOiAvXn5hbnRkLywgcmVwbGFjZW1lbnQ6IFwiYW50ZFwiIH0sXG4gICAgXSxcbiAgfSxcbiAgc2VydmVyOiB7XG4gICAgd2F0Y2g6IHtcbiAgICAgIHVzZVBvbGxpbmc6IHRydWUsXG4gICAgfSxcbiAgICBob3N0OiB0cnVlLCAvLyBuZWVkZWQgZm9yIHRoZSBEb2NrZXIgQ29udGFpbmVyIHBvcnQgbWFwcGluZyB0byB3b3JrXG4gICAgc3RyaWN0UG9ydDogdHJ1ZSxcbiAgICBwb3J0OiAzNTgwLCAvLyB5b3UgY2FuIHJlcGxhY2UgdGhpcyBwb3J0IHdpdGggYW55IHBvcnRcbiAgfSxcbn0pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUE2VSxPQUFPLFdBQVc7QUFDL1YsT0FBTyxVQUFVO0FBQ2pCLE9BQU8sV0FBVztBQUNsQixTQUFTLG9CQUFvQjtBQUM3QixPQUFPLGtCQUFrQjtBQUp6QixJQUFNLG1DQUFtQztBQU96QyxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTO0FBQUEsSUFDUCxNQUFNO0FBQUEsSUFDTixhQUFhO0FBQUEsTUFDWCxPQUFPO0FBQUEsSUFDVCxDQUFDO0FBQUEsSUFDRCxNQUFNLEVBQUUsS0FBSyxTQUFTLFVBQVUsT0FBTyxhQUFhLEtBQUssQ0FBQztBQUFBLEVBQzVEO0FBQUEsRUFDQSxTQUFTO0FBQUEsSUFDUCxrQkFBa0I7QUFBQSxJQUNsQixPQUFPO0FBQUEsTUFDTCxFQUFFLE1BQU0sT0FBTyxhQUFhLEtBQUssUUFBUSxrQ0FBVyxLQUFLLEVBQUU7QUFBQSxNQUMzRCxFQUFFLE1BQU0sYUFBYSxhQUFhLEtBQUssUUFBUSxrQ0FBVyxXQUFXLEVBQUU7QUFBQSxNQUN2RSxFQUFFLE1BQU0sVUFBVSxhQUFhLE9BQU87QUFBQSxJQUN4QztBQUFBLEVBQ0Y7QUFBQSxFQUNBLFFBQVE7QUFBQSxJQUNOLE9BQU87QUFBQSxNQUNMLFlBQVk7QUFBQSxJQUNkO0FBQUEsSUFDQSxNQUFNO0FBQUEsSUFDTixZQUFZO0FBQUEsSUFDWixNQUFNO0FBQUEsRUFDUjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
