import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/admin/_layout/posts/')({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Posts</div>;
}
