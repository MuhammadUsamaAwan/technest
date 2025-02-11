import { createFileRoute, Link, Outlet, redirect } from '@tanstack/react-router';
import { CpuIcon } from 'lucide-react';

import { Image } from '~/components/ui/image';
import LoginImage from '~/assets/images/login.jpg?w=786;1080;1400;2160&format=avif&as=picture';

export const Route = createFileRoute('/(auth)/_layout')({
  component: RouteComponent,
  beforeLoad: ({ context }) => {
    if (context.session) {
      throw redirect({ to: '/' });
    }
  },
});

function RouteComponent() {
  return (
    <div className='grid min-h-svh lg:grid-cols-2'>
      <div className='flex flex-col gap-4 p-6 md:p-10'>
        <div className='flex justify-center gap-2 md:justify-start'>
          <Link to='/' className='flex items-center gap-2 font-medium'>
            <div className='bg-primary text-primary-foreground flex h-6 w-6 items-center justify-center rounded-md'>
              <CpuIcon className='size-4' />
            </div>
            TechNest
          </Link>
        </div>
        <div className='flex flex-1 items-center justify-center'>
          <Outlet />
        </div>
      </div>
      <Image
        meta={LoginImage}
        alt='TechNest'
        containerClassName='relative hidden lg:block'
        imageClassName='absolute inset-0 size-full brightness-50'
        sizes='50vw'
        loading='eager'
      />
    </div>
  );
}
