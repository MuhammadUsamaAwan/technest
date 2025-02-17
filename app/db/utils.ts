/* eslint-disable @typescript-eslint/no-explicit-any */
import { is, sql, type AnyColumn, type SelectedFields, type SQL } from 'drizzle-orm';
import { PgTimestampString } from 'drizzle-orm/pg-core';
import { type SelectResultFields } from 'drizzle-orm/query-builders/select.types';

export function jsonBuildObject<T extends SelectedFields<any, any>>(shape: T, options: { distinct?: boolean }) {
  const chunks: SQL[] = [];
  Object.entries(shape).forEach(([key, value]) => {
    if (chunks.length > 0) {
      chunks.push(sql.raw(`,`));
    }
    chunks.push(sql.raw(`'${key}',`));
    if (is(value, PgTimestampString)) {
      chunks.push(sql`timezone('UTC', ${value})`);
    } else {
      chunks.push(sql`${value}`);
    }
  });
  return sql<
    SelectResultFields<T>
  >`${options.distinct ? sql.raw('distinct ') : sql.raw('')}coalesce(jsonb_build_object(${sql.join(chunks)}), '{}')`;
}

export function jsonAggBuildObject<T extends SelectedFields<any, any>, Column extends AnyColumn>(
  shape: T,
  options?: {
    orderBy?: { colName: Column; direction: 'ASC' | 'DESC' };
    distinct?: boolean;
    notNullColumn?: keyof T;
  }
) {
  return sql<SelectResultFields<T>[]>`coalesce(jsonb_agg(${jsonBuildObject(shape, { distinct: options?.distinct })}${
    options?.orderBy ? sql`order by ${options.orderBy.colName} ${sql.raw(options.orderBy.direction)}` : undefined
  })${options?.notNullColumn ? sql` filter (where ${shape[options.notNullColumn]} is not null)` : sql.raw('')}, '${sql`[]`}')`;
}
