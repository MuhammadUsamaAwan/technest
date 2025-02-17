import { useMemo } from 'react';

import { createFileRoute, Link } from '@tanstack/react-router';
import type { ColumnDef } from '@tanstack/react-table';
import { getUsersSchema } from '~/validations/user';
import { EllipsisIcon } from 'lucide-react';

import { formatDateTime, getInitials } from '~/lib/utils';
import { getUsers } from '~/server/user';
import { DataTableColumnHeader } from '~/components/data-table/data-table-column-header';
import { ServerDataTable } from '~/components/data-table/server-data-table';
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar';
import { Button } from '~/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu';

export const Route = createFileRoute('/admin/_layout/users/')({
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
        id: 'image',
        cell: ({ row }) => (
          <Avatar className='size-8 rounded-full'>
            {row.original.image && <AvatarImage src={row.original.image} alt={row.original.name} />}
            <AvatarFallback className='rounded-full'>{getInitials(row.original.name)}</AvatarFallback>
          </Avatar>
        ),
      },
      {
        accessorKey: 'name',
        header: ({ column }) => <DataTableColumnHeader column={column} title='Name' />,
      },
      {
        accessorKey: 'email',
        header: ({ column }) => <DataTableColumnHeader column={column} title='Email' />,
      },
      {
        accessorKey: 'emailVerified',
        header: ({ column }) => <DataTableColumnHeader column={column} title='Email Verified' />,
        enableColumnFilter: false,
      },
      {
        accessorKey: 'role',
        header: ({ column }) => <DataTableColumnHeader column={column} title='Role' />,
        enableColumnFilter: false,
      },
      {
        accessorKey: 'createdAt',
        header: ({ column }) => <DataTableColumnHeader column={column} title='Created At' />,
        enableColumnFilter: false,
        cell: ({ row }) => formatDateTime(row.original.createdAt),
      },
      {
        accessorKey: 'updatedAt',
        header: ({ column }) => <DataTableColumnHeader column={column} title='Updated At' />,
        enableColumnFilter: false,
        cell: ({ row }) => formatDateTime(row.original.updatedAt),
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
      {
        id: 'actions',
        cell: ({ row }) => (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='ghost'>
                <EllipsisIcon className='size-4' />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='w-24' align='end'>
              <DropdownMenuItem asChild>
                <Link className='inline-block w-full' to='/admin/users/$id' params={{ id: row.original.id }}>
                  Edit
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ),
      },
    ],
    []
  );

  return (
    <div className='space-y-4'>
      <h1 className='text-2xl font-bold'>Manage Users</h1>
      <ServerDataTable columns={columns} data={data} />
    </div>
  );
}
