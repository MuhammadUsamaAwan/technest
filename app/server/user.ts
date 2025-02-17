import { createServerFn } from '@tanstack/start';
import { getUsersSchema, updateUsersSchema } from '~/validations/user';
import { and, asc, count, desc, eq, ilike } from 'drizzle-orm';
import { z } from 'zod';

import { db } from '~/db';
import { sessionsTable, usersTable } from '~/db/schema';
import { jsonAggBuildObject } from '~/db/utils';

export const getUsers = createServerFn()
  .validator(getUsersSchema)
  .handler(async ({ data }) => {
    const whereConditions = and(data.filterBy && data.q ? ilike(usersTable[data.filterBy], `%${data.q}%`) : undefined);
    const sortDirection = data.sortDirection === 'asc' ? asc : desc;
    const sort = sortDirection(usersTable[data.sortBy ?? 'createdAt']);
    const dataResultPromise = db
      .select()
      .from(usersTable)
      .where(whereConditions)
      .limit(data.pageSize)
      .offset(data.pageIndex * data.pageSize)
      .orderBy(sort);
    const countResultPromise = db.select({ count: count() }).from(usersTable).where(whereConditions);
    const [dataResult, countResult] = await Promise.all([dataResultPromise, countResultPromise]);
    return {
      data: dataResult,
      rowCount: countResult[0].count,
    };
  });

export const getUsersById = createServerFn()
  .validator(z.object({ id: z.string().nonempty() }))
  .handler(async ({ data }) => {
    const [result] = await db
      .select({
        id: usersTable.id,
        name: usersTable.name,
        email: usersTable.email,
        emailVerified: usersTable.emailVerified,
        image: usersTable.image,
        createdAt: usersTable.createdAt,
        updatedAt: usersTable.updatedAt,
        role: usersTable.role,
        banned: usersTable.banned,
        banReason: usersTable.banReason,
        banExpires: usersTable.banExpires,
        sessions: jsonAggBuildObject(
          {
            id: sessionsTable.id,
            expiresAt: sessionsTable.expiresAt,
            createdAt: sessionsTable.createdAt,
            updatedAt: sessionsTable.updatedAt,
            ipAddress: sessionsTable.ipAddress,
            userAgent: sessionsTable.userAgent,
            token: sessionsTable.token,
          },
          {
            notNullColumn: 'id',
          }
        ),
      })
      .from(usersTable)
      .where(eq(usersTable.id, data.id))
      .leftJoin(sessionsTable, eq(usersTable.id, sessionsTable.userId))
      .groupBy(usersTable.id);
    return result;
  });

export const updateUser = createServerFn()
  .validator(updateUsersSchema)
  .handler(async ({ data }) => {
    await db.update(usersTable).set(data).where(eq(usersTable.id, data.id));
  });
