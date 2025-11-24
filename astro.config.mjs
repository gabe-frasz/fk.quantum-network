// @ts-check
import { defineConfig, fontProviders } from "astro/config";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
	integrations: [sitemap(), react()],

	vite: {
		plugins: [tailwindcss()],
	},

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
