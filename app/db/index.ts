import { drizzle } from 'drizzle-orm/node-postgres';

import { serverEnv } from '~/config/serverEnv';

export const db = drizzle(serverEnv.DATABASE_URL);
