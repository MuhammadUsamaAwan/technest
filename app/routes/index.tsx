import { createFileRoute, Link } from '@tanstack/react-router';

import { authClient } from '~/lib/auth-client';
import { Button, buttonVariants } from '~/components/ui/button';

export const Route = createFileRoute('/')({
  component: RouteComponent,
  loader: ({ context }) => context.session,
});

function RouteComponent() {
  const session = Route.useLoaderData();

  return (
    <div className='m-20'>
      {session ? (
        <Button
          onClick={async () => {
            await authClient.signOut();
          }}
        >
          Logout
        </Button>
      ) : (
        <Link to='/login' className={buttonVariants()}>
          Login
        </Link>
      )}
    </div>
  );
}
