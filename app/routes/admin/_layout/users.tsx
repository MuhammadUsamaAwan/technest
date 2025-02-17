import { useMemo } from 'react';

import { createFileRoute } from '@tanstack/react-router';
import type { ColumnDef } from '@tanstack/react-table';
import { getUsersSchema } from '~/validations/user';

import { formatDate } from '~/lib/utils';
import { getUsers } from '~/server/user';
import { DataTable } from '~/components/data-table';
import { DataTableColumnHeader } from '~/components/data-table/data-table-column-header';

export const Route = createFileRoute('/admin/_layout/users')({
  component: RouteComponent,
  validateSearch: search => getUsersSchema.parse(search),
  loaderDeps: ({ search }) => search,
  loader: ({ deps }) => getUsers({ data: deps }),
});

function RouteComponent() {
  const data = Route.useLoaderData();

  const columns: ColumnDef<(typeof data)['data'][number]>[] = useMemo(
    () => [
      {
        accessorKey: 'name',
        header: ({ column }) => <DataTableColumnHeader column={column} title='Name' />,
      },
      {
        accessorKey: 'email',
        header: ({ column }) => <DataTableColumnHeader column={column} title='Description' />,
      },
      {
        accessorKey: 'emailVerified',
        header: ({ column }) => <DataTableColumnHeader column={column} title='Price' />,
        enableColumnFilter: false,
      },
      {
        accessorKey: 'createdAt',
        header: ({ column }) => <DataTableColumnHeader column={column} title='Category' />,
        enableColumnFilter: false,
        cell: ({ row }) => formatDate(row.original.createdAt),
      },
      {
        accessorKey: 'updatedAt',
        header: ({ column }) => <DataTableColumnHeader column={column} title='Updated At' />,
        enableColumnFilter: false,
        cell: ({ row }) => formatDate(row.original.updatedAt),
      },
      {
        accessorKey: 'role',
        header: ({ column }) => <DataTableColumnHeader column={column} title='Role' />,
        enableColumnFilter: false,
      },
      {
        accessorKey: 'banned',
        header: ({ column }) => <DataTableColumnHeader column={column} title='Banned' />,
        enableColumnFilter: false,
      },
      {
        accessorKey: 'banReason',
        header: ({ column }) => <DataTableColumnHeader column={column} title='Ban Reason' />,
        enableColumnFilter: false,
      },
      {
        accessorKey: 'banExpires',
        header: ({ column }) => <DataTableColumnHeader column={column} title='Ban Expires' />,
        enableColumnFilter: false,
      },
    ],
    []
  );

  return (
    <div>
      <h1 className='mb-4 text-2xl font-bold'>Manage Users</h1>
      <DataTable columns={columns} data={data} />
    </div>
  );
}
