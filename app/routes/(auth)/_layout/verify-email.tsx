import { createFileRoute, Link } from '@tanstack/react-router';
import { MailIcon } from 'lucide-react';

import { Button, buttonVariants } from '~/components/ui/button';

export const Route = createFileRoute('/(auth)/_layout/verify-email')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className='text-center'>
      <div className='mb-1 flex justify-center'>
        <MailIcon className='size-12' />
      </div>
      <h1 className='mb-2 text-2xl font-bold'>Verify Your Email Address</h1>
      <p className='text-muted-foreground'>We have send a verification link to your email address.</p>
      <p className='text-muted-foreground mb-4'>
        Click on the link to verify your email address. You might need to check your spam folder
      </p>
      <div className='flex justify-center gap-4'>
        <Button>Resent Link</Button>
        <Link to='/' className={buttonVariants({ variant: 'outline' })}>
          Back to Website
        </Link>
      </div>
    </div>
  );
}
