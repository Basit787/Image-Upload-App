import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import imagemin from "vite-plugin-imagemin";
import compression from "vite-plugin-compression";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), imagemin(), compression()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
