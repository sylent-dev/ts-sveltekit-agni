import { describe, expect, it } from 'vitest';
import { err, ok, type Result } from './result.ts';

/** Halves an even number, the smallest operation that can fail. */
function half(value: number): Result<number, { code: 'odd' }> {
	return value % 2 === 0 ? ok(value / 2) : err({ code: 'odd' });
}

describe('Result', () => {
	it('holds the value of a success', () => {
		expect(half(4)).toEqual({ ok: true, value: 2 });
	});

	it('holds the error of a failure, without a value', () => {
		expect(half(3)).toEqual({ ok: false, error: { code: 'odd' } });
	});
});
