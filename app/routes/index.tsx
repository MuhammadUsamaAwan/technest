import { createFileRoute, Link } from '@tanstack/react-router';

import { authClient } from '~/lib/auth-client';
import { Button, buttonVariants } from '~/components/ui/button';

export const Route = createFileRoute('/')({
  component: RouteComponent,
});

function RouteComponent() {
  const { data: session } = authClient.useSession();

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
