import { defineEnvVars } from '@sveltejs/kit/env';
import * as z from 'zod';

// The environment variables of the server, checked when the application starts. Their names are
// listed in .env.example, without their values.
export const variables = defineEnvVars({
	DATABASE_URL: {
		description: 'The path of the SQLite file (e.g. local.db).',
		schema: z.string().min(1)
	}
});
