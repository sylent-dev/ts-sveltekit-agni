/**
 * The line logged for an unexpected error: its route, the name of the error and the frames of its
 * stack, never its message nor its cause, which may quote what a client or a craftsman typed.
 * Never throws: when a hook throws, SvelteKit logs the whole error, message included.
 */
export function unexpectedErrorLine(error: unknown, routeId: string | null): string {
	const route = routeId ?? 'an unknown route';
	try {
		if (!(error instanceof Error)) return `Unexpected ${typeof error} on ${route}`;
		// The stack starts with `name: message`, on as many lines as the message has: the frames are
		// cut by that structure, never recognized by their shape, which a line of the message may have.
		const headerLines = `${error.name}: ${error.message}`.split('\n').length;
		const frames = (error.stack ?? '')
			.split('\n')
			.slice(headerLines)
			.filter((line) => line.trimStart().startsWith('at '))
			.join('\n');
		return `Unexpected ${error.name} on ${route}\n${frames}`;
	} catch {
		return `Unexpected error on ${route}, whose stack couldn't be read`;
	}
}
