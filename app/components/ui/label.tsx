import * as React from 'react';

import * as LabelPrimitive from '@radix-ui/react-label';

import { cn } from '~/lib/utils';

type LabelProps = React.ComponentProps<typeof LabelPrimitive.Root> & {
  withAsterisk?: boolean;
};

function Label({ className, children, withAsterisk, ...props }: LabelProps) {
  return (
    <LabelPrimitive.Root
      data-slot='label'
      className={cn(
        'text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50',
        className
      )}
      {...props}
    >
      {children} {withAsterisk && <span className='text-red-500'>*</span>}
    </LabelPrimitive.Root>
  );
}

export { Label };
