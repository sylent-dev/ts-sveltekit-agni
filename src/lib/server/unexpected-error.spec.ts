import { describe, expect, it } from 'vitest';
import { unexpectedErrorLine } from './unexpected-error.ts';

describe('unexpectedErrorLine', () => {
	it('logs the route, the name and the frames of the stack, without the message', () => {
		const error = new TypeError('jean.dupont@example.com is not a function');
		error.stack = [
			'TypeError: jean.dupont@example.com is not a function',
			'    at send (src/lib/server/mail.ts:3:9)',
			'    at load (src/routes/+page.server.ts:7:2)'
		].join('\n');

		expect(unexpectedErrorLine(error, '/clients/[id]')).toBe(
			[
				'Unexpected TypeError on /clients/[id]',
				'    at send (src/lib/server/mail.ts:3:9)',
				'    at load (src/routes/+page.server.ts:7:2)'
			].join('\n')
		);
	});

	it('an error whose message holds a line starting with at logs none of it', () => {
		const error = new Error('Adresse invalide :\n   at 12 rue des Lilas, Jean Dupont');
		error.stack = [
			'Error: Adresse invalide :',
			'   at 12 rue des Lilas, Jean Dupont',
			'    at check (src/lib/server/address.ts:4:11)'
		].join('\n');

		expect(unexpectedErrorLine(error, '/clients/new')).toBe(
			'Unexpected Error on /clients/new\n    at check (src/lib/server/address.ts:4:11)'
		);
	});

	it('an error whose stack cannot be read is logged without throwing', () => {
		const error = new Error('Jean Dupont');
		Object.defineProperty(error, 'stack', {
			get() {
				throw new Error('Jean Dupont');
			}
		});

		expect(unexpectedErrorLine(error, '/')).toBe(
			"Unexpected error on /, whose stack couldn't be read"
		);
	});

	it('a thrown string logs only its type', () => {
		expect(unexpectedErrorLine('jean.dupont@example.com', '/')).toBe('Unexpected string on /');
	});

	it('an error without a route names an unknown route', () => {
		expect(unexpectedErrorLine(42, null)).toBe('Unexpected number on an unknown route');
	});
});
