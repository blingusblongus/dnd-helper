import { defineConfig } from 'astro/config';
import db from "@astrojs/db";
import vercel from "@astrojs/vercel/serverless";
import react from "@astrojs/react";

import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
    vite: {
        optimizeDeps: {
            exclude: ["astro:db", "oslo"]
        }
    },
    integrations: [db(), react(), tailwind({
        applyBaseStyles: false,
    })],
    output: "server",
    adapter: vercel()
});
