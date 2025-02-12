import { Link } from '@tanstack/react-router';
import { CpuIcon } from 'lucide-react';

import { cn } from '~/lib/utils';

export function Logo({ className, ...props }: React.ComponentProps<typeof Link>) {
  return (
    <Link className={cn('flex items-center gap-2 font-medium', className)} {...props}>
      <div className='bg-primary text-primary-foreground flex h-6 w-6 items-center justify-center rounded-md'>
        <CpuIcon className='size-4' />
      </div>
      TechNest
    </Link>
  );
}
