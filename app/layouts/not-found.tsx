import { Link } from '@tanstack/react-router';

import { buttonVariants } from '~/components/ui/button';

export function NotFound() {
  return (
    <div className='flex h-dvh flex-col items-center justify-center'>
      <h1 className='mb-2 text-4xl font-bold'>404 Not Found</h1>
      <p className='text-muted-foreground mb-4'>Looks like you&apos;ve ventured into the unknown digital realm.</p>
      <Link to='/' className={buttonVariants({ size: 'lg' })}>
        Return to Website
      </Link>
    </div>
  );
}
