import { defineConfig } from 'astro/config';

import db from "@astrojs/db";

// https://astro.build/config
export default defineConfig({
    vite: {
        optimizeDeps: {
            exclude: ["astro:db", "oslo"],
        }
    },
    integrations: [db()]
});
