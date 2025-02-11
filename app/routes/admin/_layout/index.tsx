import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/admin/_layout/')({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Only admin can view this area</div>;
}
