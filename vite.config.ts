import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.svg", "robots.txt"],
      manifest: {
        name: "Solyo",
        short_name: "Solyo",
        description: "Capture and reflect on your travel memories",
        theme_color: "#ffffff",
        icons: [
          {
            src: "/solyo-icon.svg",
            sizes: "192x192",
            type: "image/svg+xml",
          },
          {
            src: "/solyo-icon.svg",
            sizes: "512x512",
            type: "image/svg+xml",
          },
        ],
      },
    }),
  ],
  base: "./",
  optimizeDeps: {
    include: ["jspdf"],
  },
});
