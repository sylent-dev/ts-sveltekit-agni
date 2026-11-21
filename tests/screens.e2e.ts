import { expect, test } from '@playwright/test';

/** A screen of the application, as a craftsman opens it. */
interface Screen {
	path: string;
	/** The errors of the console this screen writes on purpose, compared whole. */
	expectedErrors: string[];
}

// Every screen, added here when it is built, with the data it needs.
const SCREENS: Screen[] = [
	{ path: '/', expectedErrors: [] },
	// The error page: Chromium reports the 404 of the page itself in the console.
	{
		path: '/a-page-that-does-not-exist',
		expectedErrors: [
			'Failed to load resource: the server responded with a status of 404 (Not Found)'
		]
	}
];

for (const { path, expectedErrors } of SCREENS) {
	test(`${path} fits the width of the screen, has a French title and logs no error`, async ({
		page
	}) => {
		const errors: string[] = [];
		page.on('pageerror', (error) => errors.push(error.message));
		page.on('console', (message) => {
			if (message.type() === 'error') errors.push(message.text());
		});

		await page.goto(path);
		await page.evaluate(() => {
			window.scrollTo(0, document.body.scrollHeight);
		});

		// Soft: one report shows every fault of the screen at once.
		// A block wider than the screen lets a phone widen the whole page to show it.
		const overflow = await page.evaluate(
			() => document.documentElement.scrollWidth - document.documentElement.clientWidth
		);
		expect.soft(overflow).toBe(0);
		await expect.soft(page.locator('html')).toHaveAttribute('lang', 'fr');
		await expect.soft(page).toHaveTitle(/\S/);
		expect.soft(errors).toEqual(expectedErrors);
	});
}
