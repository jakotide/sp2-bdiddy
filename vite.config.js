import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  base: "/sp2-bdiddy/",
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        login: resolve(__dirname, "pages/login.html"),
        create: resolve(__dirname, "pages/create.html"),
        profile: resolve(__dirname, "pages/profile.html"),
        listing: resolve(__dirname, "pages/listing.html"),
      },
    },
  },
});
