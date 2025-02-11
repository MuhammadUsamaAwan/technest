import { useEffect, useState } from 'react';

import { createFileRoute, Link } from '@tanstack/react-router';
import { MailIcon } from 'lucide-react';
import { toast } from 'sonner';

import { authClient } from '~/lib/auth-client';
import { Button, buttonVariants } from '~/components/ui/button';

export const Route = createFileRoute('/(auth)/_layout/forgot-password/$email')({
  component: RouteComponent,
});

function RouteComponent() {
  const { email } = Route.useParams();
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
      .forgetPassword({ email, redirectTo: '/reset-password' })
      .then(() => toast.success('Password reset link sent successfully'))
      .catch(() => toast.error('Failed to send password reset link, please try again later'))
      .finally(() => setIsLoading(false));
  }

  return (
    <div className='text-center'>
      <div className='mb-1 flex justify-center'>
        <MailIcon className='size-12' />
      </div>
      <h1 className='mb-2 text-2xl font-bold'>Check Your Email Address</h1>
      <p className='text-muted-foreground'>We have sent a password reset link to {email}.</p>
      <p className='text-muted-foreground mb-4'>
        Click on the link to reset your password. You might need to check your spam folder
      </p>
      <div className='flex justify-center gap-4'>
        <Button isLoading={isLoading} onClick={handleResend} disabled={isDisabled}>
          {isDisabled ? `Resend Link (${timer}s)` : 'Resend Link'}
        </Button>
        <Link to='/' className={buttonVariants({ variant: 'outline' })}>
          Back to Home
        </Link>
      </div>
    </div>
  );
}
