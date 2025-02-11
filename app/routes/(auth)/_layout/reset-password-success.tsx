import { createFileRoute, Link } from '@tanstack/react-router';
import { CheckCircle2Icon } from 'lucide-react';

import { buttonVariants } from '~/components/ui/button';

export const Route = createFileRoute('/(auth)/_layout/reset-password-success')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className='text-center'>
      <div className='mb-1 flex justify-center'>
        <CheckCircle2Icon className='size-12' />
      </div>
      <h1 className='mb-2 text-2xl font-bold'>Password Reset Successfully</h1>
      <p className='text-muted-foreground mb-4'>
        Your password has been reset successfully. You can now proceed to login.
      </p>
      <div className='flex justify-center gap-4'>
        <Link to='/login' className={buttonVariants()}>
          Login
        </Link>
        <Link to='/' className={buttonVariants({ variant: 'outline' })}>
          Back to Home
        </Link>
      </div>
    </div>
  );
}
