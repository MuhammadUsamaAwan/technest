import { useLocation, useNavigate } from '@tanstack/react-router';
import { flexRender, getCoreRowModel, useReactTable, type ColumnDef } from '@tanstack/react-table';

import { DEFAULT_PAGE_SIZE } from '~/config/constants';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '~/components/ui/table';

import { DataTableFilters } from './data-table-filters';
import { DataTablePagination } from './data-table-pagination';

type DataTableProps<TData, TValue> = {
  columns: ColumnDef<TData, TValue>[];
  data: { data: TData[]; rowCount: number };
};

export function DataTable<TData, TValue>({ columns, data }: DataTableProps<TData, TValue>) {
  const navigate = useNavigate();
  const { search } = useLocation();

  const table = useReactTable({
    data: data.data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    rowCount: data.rowCount,
    state: {
      pagination: {
        pageIndex: search.pageIndex ?? 0,
        pageSize: search.pageSize ?? DEFAULT_PAGE_SIZE,
      },
    },
    onPaginationChange: updater => {
      const pagination = typeof updater === 'function' ? updater(table.getState().pagination) : updater;
      navigate({
        search: {
          ...search,
          // @ts-expect-error fix later
          pageIndex: pagination.pageIndex,
          pageSize: pagination.pageSize,
        },
      });
    },
  });

  return (
    <div className='space-y-4'>
      <DataTableFilters table={table} />
      <div className='rounded-md border'>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map(header => {
                  return (
                    <TableHead key={header.id} colSpan={header.colSpan}>
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map(row => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map(cell => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={table.getAllColumns().length} className='h-24 text-center'>
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination table={table} />
    </div>
  );
}
