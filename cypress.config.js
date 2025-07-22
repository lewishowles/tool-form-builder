import { defineConfig } from "cypress";
import viteConfig from "./vite.config";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
	fixturesFolder: "",
	screenshotOnRunFailure: false,
	video: false,
	viewportWidth: 1440,
	viewPortHeight: 900,

	e2e: {
		specPattern: "cypress/e2e/**/*.{cy,spec}.{js,jsx,ts,tsx}",
		baseUrl: "http://localhost:4173",
		supportFile: "test/cypress/support/commands.js",
	},

	component: {
		specPattern: "src/components/**/*.cy.js",
		indexHtmlFile: "test/cypress/support/component-index.html",
		supportFile: "test/cypress/support/component.js",
		devServer: {
			framework: "vue",
			bundler: "vite",
			viteConfig: {
				...viteConfig,
				plugins: [vue()],
			},
		},
		viewportWidth: 1000,
		viewPortHeight: 1000,
	},
});
