import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  base: "/sp2-bdiddy/",
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        login: resolve(__dirname, "authentication/index.html"),
        create: resolve(__dirname, "create/index.html"),
        profile: resolve(__dirname, "profile/index.html"),
        listing: resolve(__dirname, "listing/index.html"),
      },
    },
  },
});

