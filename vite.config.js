import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  base: "/sp2-bdiddy/",
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        login: resolve(__dirname, "/authentication/"),
        create: resolve(__dirname, "/create/"),
        profile: resolve(__dirname, "/profile/"),
        listing: resolve(__dirname, "/listing/"),
      },
    },
  },
});
