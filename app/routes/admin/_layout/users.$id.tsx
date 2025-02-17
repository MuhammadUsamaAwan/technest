import { useMemo } from 'react';

import { useForm, useStore } from '@tanstack/react-form';
import { createFileRoute, useNavigate, useRouter } from '@tanstack/react-router';
import type { ColumnDef } from '@tanstack/react-table';
import { updateUsersSchema } from '~/validations/user';
import { EllipsisIcon } from 'lucide-react';
import { toast } from 'sonner';

import { DEFAULT_PAGE_SIZE } from '~/config/constants';
import { authClient } from '~/lib/auth-client';
import { formatDateTime } from '~/lib/utils';
import { getUsersById, updateUser } from '~/server/user';
import { DataTable } from '~/components/data-table/data-table';
import { Button } from '~/components/ui/button';
import { Checkbox } from '~/components/ui/checkbox';
import DatePicker from '~/components/ui/date-picker';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu';
import { FieldInfo } from '~/components/ui/form';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select';

export const Route = createFileRoute('/admin/_layout/users/$id')({
  component: RouteComponent,
  loader: ({ params }) => getUsersById({ data: { id: params.id } }),
});

function RouteComponent() {
  const data = Route.useLoaderData();
  const navigate = useNavigate();
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      id: data.id,
      name: data.name,
      email: data.email,
      role: data.role ?? undefined,
      banned: data.banned ?? undefined,
      banReason: data.banReason ?? undefined,
      banExpires: data.banExpires ?? undefined,
    },
    onSubmit: async ({ value }) => {
      updateUser({
        data: {
          ...value,
          banReason: value.banned ? value.banReason : undefined,
          banExpires: value.banned ? value.banExpires : undefined,
        },
      })
        .then(() => {
          toast.success('User updated successfully');
          navigate({ to: '/admin/users', search: { pageIndex: 0, pageSize: DEFAULT_PAGE_SIZE } });
        })
        .catch(() => toast.error('Failed to update user. Please try again.'));
    },
    validators: {
      onChange: updateUsersSchema,
    },
  });

  const banned = useStore(form.store, state => state.values.banned);

  const columns: ColumnDef<(typeof data)['sessions'][number]>[] = useMemo(
    () => [
      {
        accessorKey: 'createdAt',
        header: 'Created At',
        cell: ({ row }) => formatDateTime(row.original.createdAt),
      },
      {
        accessorKey: 'updatedAt',
        header: 'Updated At',
        cell: ({ row }) => formatDateTime(row.original.updatedAt),
      },
      {
        accessorKey: 'expiresAt',
        header: 'Expires At',
        cell: ({ row }) => formatDateTime(row.original.expiresAt),
      },
      {
        accessorKey: 'ipAddress',
        header: 'IP Address',
      },
      {
        accessorKey: 'userAgent',
        header: 'User Agent',
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
              <DropdownMenuItem
                onClick={async () => {
                  const revokedSession = await authClient.admin.revokeUserSession({
                    sessionToken: row.original.token,
                  });
                  if (revokedSession.error) {
                    toast.error(revokedSession.error.message);
                  } else {
                    toast.success('Session revoked successfully. This might take few minutes to reflect.');
                    router.invalidate();
                  }
                }}
              >
                Revoke Session
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ),
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  console.log(data.sessions);

  return (
    <div className='space-y-6'>
      <h1 className='text-2xl font-bold'>Update User</h1>
      <form
        onSubmit={e => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        <div className='mb-6 grid grid-cols-1 gap-6 sm:grid-cols-3'>
          <form.Field name='name'>
            {field => (
              <div className='mb-auto grid gap-2'>
                <Label htmlFor={field.name} withAsterisk>
                  Name
                </Label>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onChange={e => field.handleChange(e.target.value)}
                  placeholder='Enter Name'
                />
                <FieldInfo field={field} />
              </div>
            )}
          </form.Field>
          <form.Field name='email'>
            {field => (
              <div className='mb-auto grid gap-2'>
                <Label htmlFor={field.name} withAsterisk>
                  Email
                </Label>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onChange={e => field.handleChange(e.target.value)}
                  type='email'
                  placeholder='Enter Email'
                />
                <FieldInfo field={field} />
              </div>
            )}
          </form.Field>
          <form.Field name='role'>
            {field => (
              <div className='mb-auto grid gap-2'>
                <Label htmlFor={field.name} withAsterisk>
                  Role
                </Label>
                <Select name={field.name} value={field.state.value} onValueChange={val => field.handleChange(val)}>
                  <SelectTrigger id={field.name}>
                    <SelectValue placeholder='Select Role' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='user'>User</SelectItem>
                    <SelectItem value='admin'>Admin</SelectItem>
                  </SelectContent>
                </Select>
                <FieldInfo field={field} />
              </div>
            )}
          </form.Field>
          <form.Field name='banned'>
            {field => (
              <div className='flex h-[58px] items-center gap-2'>
                <Checkbox
                  id={field.name}
                  checked={field.state.value}
                  onCheckedChange={val => field.handleChange(val as boolean)}
                />
                <Label htmlFor={field.name}>Banned</Label>
              </div>
            )}
          </form.Field>
          {banned && (
            <>
              <form.Field name='banReason'>
                {field => (
                  <div className='mb-auto grid gap-2'>
                    <Label htmlFor={field.name}>Ban Reason</Label>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onChange={e => field.handleChange(e.target.value)}
                      placeholder='Enter Ban Reason'
                    />
                    <FieldInfo field={field} />
                  </div>
                )}
              </form.Field>
              <form.Field name='banExpires'>
                {field => (
                  <div className='mb-auto grid gap-2'>
                    <Label htmlFor={field.name}>Ban Expires</Label>
                    <DatePicker value={field.state.value} onChange={val => field.handleChange(val)} disablePast />
                    <FieldInfo field={field} />
                  </div>
                )}
              </form.Field>
            </>
          )}
        </div>
        <div className='flex justify-end'>
          <form.Subscribe selector={state => [state.canSubmit, state.isSubmitting]}>
            {([canSubmit, isSubmitting]) => (
              <Button isLoading={isSubmitting} disabled={!canSubmit} type='submit'>
                Update
              </Button>
            )}
          </form.Subscribe>
        </div>
      </form>
      <h2 className='text-2xl font-bold'>Sessions</h2>
      <DataTable columns={columns} data={data.sessions} />
    </div>
  );
}
