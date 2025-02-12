import { createServerFn } from '@tanstack/start';
import { getRequestHeaders } from '@tanstack/start/server';
import { and, eq } from 'drizzle-orm';
import { z } from 'zod';

import { db } from '~/db';
import { usersTable } from '~/db/schema';
import { auth } from '~/lib/auth';

export const getUserById = createServerFn()
  .validator(
    z.object({
      userId: z.string(),
    })
  )
  .handler(async ({ data }) => {
    const [user] = await db
      .select({
        email: usersTable.email,
      })
      .from(usersTable)
      .where(and(eq(usersTable.id, data.userId), eq(usersTable.emailVerified, false)));
    return user;
  });

export const getUserByEmail = createServerFn()
  .validator(
    z.object({
      email: z.string().email(),
    })
  )
  .handler(async ({ data }) => {
    const [user] = await db
      .select({
        id: usersTable.id,
      })
      .from(usersTable)
      .where(and(eq(usersTable.email, data.email), eq(usersTable.emailVerified, false)));
    return user;
  });

export const getSession = createServerFn().handler(async () => {
  const headersObject = getRequestHeaders();
  const headers = new Headers();
  Object.entries(headersObject).forEach(([key, value]) => {
    if (value !== undefined) {
      headers.append(key, value);
    }
  });
  const session = await auth.api.getSession({
    headers,
  });
  return session;
});
