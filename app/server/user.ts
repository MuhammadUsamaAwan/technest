import { createServerFn } from '@tanstack/start';
import { getUsersSchema } from '~/validations/user';
import { and, asc, count, desc, ilike } from 'drizzle-orm';

import { db } from '~/db';
import { usersTable } from '~/db/schema';

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
