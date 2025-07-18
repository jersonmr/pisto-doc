// @ts-check
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import tailwindcss from "@tailwindcss/vite";

import netlify from "@astrojs/netlify";

// https://astro.build/config
export default defineConfig({
    // site: "https://docs.pisto.co",
    integrations: [
        starlight({
            title: "Pisto Docs",
            sidebar: [
                {
                    label: "Guides",
                    items: [
                        // Each item here is one entry in the navigation menu.
                        { label: "Example Guide", slug: "guides/example" },
                    ],
                },
                {
                    label: "Reference",
                    autogenerate: { directory: "reference" },
                },
            ],
        }),
    ],

    vite: {
        // @ts-ignore
        plugins: [tailwindcss()],
    },

    adapter: netlify(),
    output: "server",
});
