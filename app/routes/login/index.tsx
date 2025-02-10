import { createFileRoute } from '@tanstack/react-router';
import { CpuIcon } from 'lucide-react';

import { Image } from '~/components/image';
import LoginImage from '~/assets/images/login.jpg?w=786;1080;1400;2160&format=avif&as=picture';

import { LoginForm } from './-components/login-form';

export const Route = createFileRoute('/login/')({
  component: Login,
});

function Login() {
  console.log(LoginImage);

  return (
    <div className='grid min-h-svh lg:grid-cols-2'>
      <div className='flex flex-col gap-4 p-6 md:p-10'>
        <div className='flex justify-center gap-2 md:justify-start'>
          <a href='#' className='flex items-center gap-2 font-medium'>
            <div className='bg-primary text-primary-foreground flex h-6 w-6 items-center justify-center rounded-md'>
              <CpuIcon className='size-4' />
            </div>
            TechNest
          </a>
        </div>
        <div className='flex flex-1 items-center justify-center'>
          <div className='w-full max-w-xs'>
            <LoginForm />
          </div>
        </div>
      </div>
      <Image meta={LoginImage} alt='TechNest' containerClassName='hidden max-h-screen lg:block' sizes='50vw' />
    </div>
  );
}
