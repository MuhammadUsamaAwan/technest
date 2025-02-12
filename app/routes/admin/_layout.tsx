import { createFileRoute, Link, Outlet, redirect } from '@tanstack/react-router';
import { AppBreadcrumbs } from '~/layouts/app-breadcrumbs';
import { AppSidebar } from '~/layouts/app-sidebar';

import { buttonVariants } from '~/components/ui/button';
import { Separator } from '~/components/ui/separator';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '~/components/ui/sidebar';

export const Route = createFileRoute('/admin/_layout')({
  component: RouteComponent,
  loader: ({ context }) => {
    if (!context.session || context.session.user.role !== 'admin') {
      throw redirect({ to: '/' });
    }
    return context.session;
  },
});

function RouteComponent() {
  const { user } = Route.useLoaderData();

  return (
    <SidebarProvider>
      <AppSidebar user={user} />
      <SidebarInset>
        <header className='flex h-16 shrink-0 items-center justify-between gap-2 border-b px-4'>
          <div className='flex items-center gap-2'>
            <SidebarTrigger className='-ml-1' />
            <Separator orientation='vertical' className='mr-2 h-4' />
            <AppBreadcrumbs />
          </div>
          <Link to='/' className={buttonVariants({ variant: 'outline' })}>
            Back to Site
          </Link>
        </header>
        <div className='flex flex-1 flex-col gap-4 p-4'>
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
