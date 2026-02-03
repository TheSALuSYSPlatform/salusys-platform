import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";
import { SITE } from "./src/config";

const isGitHubPages = process.env.GITHUB_ACTIONS === "true";

export default defineConfig({
  site: isGitHubPages
    ? "https://stephenpowell.github.io"   // <-- replace with exact owner
    : "https://thesalusysplatform.com",
  base: isGitHubPages ? "/salusys-platform" : "/",
  // ...
});
  integrations: [
    sitemap({
      filter: (page) => SITE.showArchives || !page.endsWith("/archives"),
    }),
  ],

  vite: {
    // @ts-ignore - Vite plugin type mismatch in CI
    plugins: [tailwindcss()],
    optimizeDeps: {
      exclude: ["@resvg/resvg-js"],
    },
  },
});

