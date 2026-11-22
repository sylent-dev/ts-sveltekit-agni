import type { HandleServerError } from '@sveltejs/kit/hooks';
import { unexpectedErrorLine } from '#lib/server/unexpected-error.ts';

/**
 * Logs the unexpected errors without anything personal (`unexpectedErrorLine`). The page then shows
 * its own French text (`+error.svelte`), never the message of the error.
 */
export const handleError: HandleServerError = ({ kind, error, event }) => {
	if (kind === 'unknown') console.error(unexpectedErrorLine(error, event.route.id));
};
