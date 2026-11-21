/**
 * The outcome of an operation that can fail in an expected way (a field missing, a service that
 * doesn't answer): its value, or its error. An expected failure is never thrown; a thrown error is
 * a bug (see Errors in docs/code-quality.md).
 */
export type Result<T, E> =
	{ readonly ok: true; readonly value: T } | { readonly ok: false; readonly error: E };

/** A success that holds `value`. */
export function ok<T>(value: T): Result<T, never> {
	return { ok: true, value };
}

/** A failure that holds `error`, usually an object with a `code`. */
export function err<E>(error: E): Result<never, E> {
	return { ok: false, error };
}
