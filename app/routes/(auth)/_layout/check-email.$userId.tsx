import { useEffect, useState } from 'react';

import { createFileRoute, Link, redirect } from '@tanstack/react-router';
import { createServerFn } from '@tanstack/start';
import { and, eq } from 'drizzle-orm';
import { MailIcon } from 'lucide-react';
import { toast } from 'sonner';
import { z } from 'zod';

import { db } from '~/db';
import { usersTable } from '~/db/schema';
import { authClient } from '~/lib/auth-client';
import { Button, buttonVariants } from '~/components/ui/button';

export const getEmail = createServerFn()
  .validator(
    z.object({
      userId: z.string(),
    })
  )
  .handler(async ({ data }) => {
    const [user] = await db
      .select({
        email: usersTable.email,
      })
      .from(usersTable)
      .where(and(eq(usersTable.id, data.userId), eq(usersTable.emailVerified, false)));
    return user?.email as string | undefined;
  });

export const Route = createFileRoute('/(auth)/_layout/check-email/$userId')({
  component: RouteComponent,
  loader: async ({ params: { userId } }) => {
    const email = await getEmail({ data: { userId } });
    if (!email) {
      throw redirect({ to: '/login' });
    }
    return email;
  },
});

function RouteComponent() {
  const email = Route.useLoaderData();
  const [timer, setTimer] = useState(30);
  const [isDisabled, setIsDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer(prev => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setIsDisabled(false);
    }
  }, [timer]);

  async function handleResend() {
    setTimer(30);
    setIsDisabled(true);
    setIsLoading(true);
    await authClient
      .sendVerificationEmail({ email })
      .then(() => toast.success('Verification email sent successfully'))
      .catch(() => toast.error('Failed to send verification email, please try again later'))
      .finally(() => setIsLoading(false));
  }

  return (
    <div className='text-center'>
      <div className='mb-1 flex justify-center'>
        <MailIcon className='size-12' />
      </div>
      <h1 className='mb-2 text-2xl font-bold'>Verify Your Email Address</h1>
      <p className='text-muted-foreground'>We have sent a verification link to {email}.</p>
      <p className='text-muted-foreground mb-4'>
        Click on the link to verify your email address. You might need to check your spam folder
      </p>
      <div className='flex justify-center gap-4'>
        <Button isLoading={isLoading} onClick={handleResend} disabled={isDisabled}>
          {isDisabled ? `Resend Link (${timer}s)` : 'Resend Link'}
        </Button>
        <Link to='/' className={buttonVariants({ variant: 'outline' })}>
          Back to Website
        </Link>
      </div>
    </div>
  );
}
