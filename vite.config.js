import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import { resolve } from "path";

export default defineConfig({
  plugins: [tailwindcss()],
  base: "/Aesthetic-Movies-App/",
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        moviesPage: resolve(__dirname, "movie-inner-page.html"),
      },
    },
  },
});
