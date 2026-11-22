import { describe, expect, it } from 'vitest';
import { errorText } from './error-text.ts';
import { messages } from './messages.ts';

describe('errorText', () => {
	it('tells a page that does not exist', () => {
		expect(errorText(404)).toBe(messages.error.notFound);
	});

	it('tells a page that is not theirs, without asking to try again', () => {
		expect([errorText(401), errorText(403)]).toEqual([
			messages.error.forbidden,
			messages.error.forbidden
		]);
	});

	it('asks to check what was typed for another fault of the request', () => {
		expect([errorText(400), errorText(422)]).toEqual([
			messages.error.badRequest,
			messages.error.badRequest
		]);
	});

	it('asks to try again only for a fault of the server', () => {
		expect([errorText(500), errorText(503)]).toEqual([
			messages.error.unexpected,
			messages.error.unexpected
		]);
	});
});
