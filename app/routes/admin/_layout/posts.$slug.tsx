import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/admin/_layout/posts/$slug')({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Post Details</div>;
}
