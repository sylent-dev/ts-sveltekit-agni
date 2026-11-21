import type { HandleServerError } from '@sveltejs/kit/hooks';

/**
 * Logs the unexpected errors, without anything that could hold personal data: a message or a
 * value may quote what a client or a craftsman typed, so only the route, the kind, the name of the
 * error and the frames of its stack are written. The page then shows its own French text
 * (`+error.svelte`), never the message of the error.
 */
export const handleError: HandleServerError = ({ kind, error, event }) => {
	if (kind !== 'unknown') return;
	const name = error instanceof Error ? error.name : typeof error;
	const frames =
		error instanceof Error && error.stack !== undefined
			? error.stack
					.split('\n')
					.filter((line) => line.trimStart().startsWith('at '))
					.join('\n')
			: '';
	console.error(`Unexpected ${name} on ${event.route.id ?? 'an unknown route'}\n${frames}`);
};
