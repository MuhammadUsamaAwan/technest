import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/admin/_layout')({
  component: RouteComponent,
  beforeLoad: ({ context }) => {
    if (!context.session || context.session.user.role !== 'admin') {
      throw redirect({ to: '/' });
    }
  },
});

function RouteComponent() {
  return (
    <div>
      <div>NAVIGATION</div>
      <Outlet />
    </div>
  );
}
