import { messages } from './messages.ts';

/**
 * The text of the error page for a status: what the craftsman can do about it. « Réessayez » only
 * where trying again may help (a fault of the server), never for a page that doesn't exist or isn't
 * theirs.
 */
export function errorText(status: number): string {
	if (status === 404) return messages.error.notFound;
	if (status === 401 || status === 403) return messages.error.forbidden;
	if (status >= 400 && status < 500) return messages.error.badRequest;
	return messages.error.unexpected;
}
