import { expect, test } from '@playwright/test';

// Every screen of the application, as a craftsman opens it. A screen is added here when it is
// built, with the data it needs.
const SCREENS = ['/'];

for (const path of SCREENS) {
	test(`${path} fits the width of the screen, in French, without an error`, async ({ page }) => {
		const errors: string[] = [];
		page.on('pageerror', (error) => errors.push(error.message));
		page.on('console', (message) => {
			if (message.type() === 'error') errors.push(message.text());
		});

		await page.goto(path);
		await page.evaluate(() => {
			window.scrollTo(0, document.body.scrollHeight);
		});

		// A block wider than the screen lets a phone widen the whole page to show it.
		const overflow = await page.evaluate(
			() => document.documentElement.scrollWidth - document.documentElement.clientWidth
		);
		expect(overflow).toBe(0);
		await expect(page.locator('html')).toHaveAttribute('lang', 'fr');
		await expect(page).toHaveTitle(/\S/);
		expect(errors).toEqual([]);
	});
}
