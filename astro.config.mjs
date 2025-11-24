// @ts-check
import { defineConfig, fontProviders } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import react from "@astrojs/react";
import vercel from "@astrojs/vercel";

// https://astro.build/config
export default defineConfig({
  integrations: [react()],

  vite: {
      plugins: [tailwindcss()],
	},

  adapter: vercel(),

  experimental: {
      fonts: [
          {
              provider: fontProviders.google(),
              name: "Inter",
              cssVariable: "--font-inter",
          },
          {
              provider: fontProviders.google(),
              name: "Science Gothic",
              cssVariable: "--font-science-gothic",
          },
      ],
	},
});
