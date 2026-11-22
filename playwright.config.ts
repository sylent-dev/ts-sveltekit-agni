import { defineConfig, devices } from '@playwright/test';

// The tests in a real browser (tests/*.e2e.ts): the width of every screen on a phone and on a
// computer, then the main path once it exists. They run on the production build, served by
// `vite preview`, built by the web server below: `npm run check` builds only through it, so that a
// check builds once. Install the browser once with `npx playwright install --only-shell chromium`.
export default defineConfig({
	testDir: 'tests',
	testMatch: '**/*.e2e.ts',
	forbidOnly: Boolean(process.env.CI),
	reporter: process.env.CI ? 'github' : 'list',
	webServer: { command: 'npm run build && npm run preview', port: 4173 },
	use: { baseURL: 'http://localhost:4173' },
	projects: [
		// The narrowest phone still common (Android, 360 px), then a computer.
		{ name: 'phone', use: { ...devices['Galaxy S9+'], viewport: { width: 360, height: 740 } } },
		{ name: 'desktop', use: { ...devices['Desktop Chrome'] } }
	]
});
