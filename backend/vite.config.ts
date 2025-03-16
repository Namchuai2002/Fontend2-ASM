import { defineConfig } from "vite";
import { VitePluginNode } from "vite-plugin-node";

export default defineConfig({
  server: {
    port: 5000,
  },
  plugins: [
    ...VitePluginNode({
      adapter: "express",
      appPath: "./src/app.js", // Đường dẫn file chính của server
      exportName: "viteNodeApp",
    }),
  ],
  optimizeDeps: {
    exclude: ["mongoose"],
  },
});
