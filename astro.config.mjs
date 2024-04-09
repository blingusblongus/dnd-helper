import { defineConfig } from 'astro/config';
import db from "@astrojs/db";

import vercel from "@astrojs/vercel/serverless";

// https://astro.build/config
export default defineConfig({
  vite: {
    optimizeDeps: {
      exclude: ["astro:db", "oslo"]
    }
  },
  integrations: [db()],
  output: "server",
  adapter: vercel()
});