import { useEffect } from 'react';

import { createFileRoute, Link } from '@tanstack/react-router';
import { CheckCircle2Icon, CircleAlert } from 'lucide-react';
import { z } from 'zod';

import { authClient } from '~/lib/auth-client';
import { buttonVariants } from '~/components/ui/button';

const verifyEmailSearchSchema = z.object({
  token: z.string().min(1).optional(),
  callbackURL: z.string().min(1).optional(),
  error: z.string().min(1).optional(),
});

export const Route = createFileRoute('/(auth)/_layout/verify-email')({
  component: RouteComponent,
  validateSearch: search => verifyEmailSearchSchema.parse(search),
  errorComponent: ErrorComponent,
});

function RouteComponent() {
  const { token, callbackURL, error } = Route.useSearch();

  useEffect(() => {
    async function verifyEmail() {
      if (!token || !callbackURL) return;
      await authClient.verifyEmail({
        query: {
          token,
          callbackURL,
        },
      });
    }
    verifyEmail();
  }, [callbackURL, token]);

  if (error) {
    return <ErrorComponent />;
  }

  return <SuccessComponent />;
}

function ErrorComponent() {
  return (
    <div className='text-center'>
      <div className='mb-1 flex justify-center'>
        <CircleAlert className='size-12' />
      </div>
      <h1 className='mb-2 text-2xl font-bold'>Invalid Email Verification Link</h1>
      <p className='text-muted-foreground mb-4'>
        The email verification link you are trying to use is invalid or has expired.
      </p>
      <div className='flex justify-center gap-4'>
        <Link to='/login' className={buttonVariants()}>
          Login
        </Link>
        <Link to='/' className={buttonVariants({ variant: 'outline' })}>
          Back to Website
        </Link>
      </div>
    </div>
  );
}

function SuccessComponent() {
  return (
    <div className='text-center'>
      <div className='mb-1 flex justify-center'>
        <CheckCircle2Icon className='size-12' />
      </div>
      <h1 className='mb-2 text-2xl font-bold'>Email Verified Successfully</h1>
      <p className='text-muted-foreground mb-4'>
        Your email has been verified successfully. You can now proceed to login.
      </p>
      <div className='flex justify-center gap-4'>
        <Link to='/login' className={buttonVariants()}>
          Login
        </Link>
        <Link to='/' className={buttonVariants({ variant: 'outline' })}>
          Back to Website
        </Link>
      </div>
    </div>
  );
}
