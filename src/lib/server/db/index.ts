import { createClient } from '@libsql/client';
import { drizzle } from 'drizzle-orm/libsql';
import { DATABASE_URL } from '$app/env/private';
import * as schema from './schema.ts';

/** The database of the application: one SQLite file, read through Drizzle. */
export const db = drizzle(createClient({ url: `file:${DATABASE_URL}` }), { schema });
