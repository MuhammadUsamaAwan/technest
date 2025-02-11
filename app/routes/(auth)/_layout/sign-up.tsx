import { useForm } from '@tanstack/react-form';
import { createFileRoute, Link, useNavigate } from '@tanstack/react-router';
import { z } from 'zod';

import { authClient } from '~/lib/auth-client';
import { Button } from '~/components/ui/button';
import { FieldInfo } from '~/components/ui/form';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';

export const Route = createFileRoute('/(auth)/_layout/sign-up')({
  component: RouteComponent,
});

const loginSchema = z
  .object({
    name: z
      .string({ required_error: 'Name is required' })
      .min(6, { message: 'Name must be at least 6 characters' })
      .max(40, { message: 'Name must be at most 40 characters' }),
    email: z.string({ required_error: 'Email is required' }).email({ message: 'Invalid email' }),
    password: z
      .string({ required_error: 'Password is required' })
      .min(8, { message: 'Password must be at least 8 characters' })
      .max(40, { message: 'Password must be at most 40 characters' }),
    confirmPassword: z
      .string({ required_error: 'Password is required' })
      .min(8, { message: 'Password must be at least 8 characters' })
      .max(40, { message: 'Password must be at most 40 characters' }),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

function RouteComponent() {
  const navigate = useNavigate();

  const form = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    onSubmit: async ({ value }) => {
      const { data, error } = await authClient.signUp.email({
        email: value.email,
        password: value.password,
        name: value.name,
      });
      if (error) {
        alert(error.message);
        return;
      }
      if (data && !data.token && data.user.emailVerified !== true) {
        navigate({ to: '/verify-email' });
      }
    },
    validators: {
      onChange: loginSchema,
    },
  });

  return (
    <div className='w-full max-w-xs'>
      <form
        onSubmit={e => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
        className='flex flex-col gap-6'
      >
        <div className='flex flex-col items-center gap-2 text-center'>
          <h1 className='text-2xl font-bold'>Register your account</h1>
          <p className='text-muted-foreground text-sm text-balance'>
            Enter your details below to register your account
          </p>
        </div>
        <div className='grid gap-6'>
          <form.Field name='name'>
            {field => (
              <div className='grid gap-2'>
                <Label htmlFor={field.name}>Name</Label>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onChange={e => field.handleChange(e.target.value)}
                  placeholder='Your Name'
                />
                <FieldInfo field={field} />
              </div>
            )}
          </form.Field>
          <form.Field name='email'>
            {field => (
              <div className='grid gap-2'>
                <Label htmlFor={field.name}>Email</Label>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onChange={e => field.handleChange(e.target.value)}
                  placeholder='Your Email'
                />
                <FieldInfo field={field} />
              </div>
            )}
          </form.Field>
          <form.Field name='password'>
            {field => (
              <div className='grid gap-2'>
                <Label htmlFor={field.name}>Password</Label>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onChange={e => field.handleChange(e.target.value)}
                  type='password'
                  placeholder='Your Password'
                />
                <FieldInfo field={field} />
              </div>
            )}
          </form.Field>
          <form.Field name='confirmPassword'>
            {field => (
              <div className='grid gap-2'>
                <Label htmlFor={field.name}>Confirm Password</Label>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onChange={e => field.handleChange(e.target.value)}
                  type='password'
                  placeholder='Your Password'
                />
                <FieldInfo field={field} />
              </div>
            )}
          </form.Field>
          <form.Subscribe selector={state => [state.canSubmit, state.isSubmitting]}>
            {([canSubmit, isSubmitting]) => (
              <Button isLoading={isSubmitting} disabled={!canSubmit} type='submit' className='w-full'>
                Sign up
              </Button>
            )}
          </form.Subscribe>
          <div className='after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t'>
            <span className='bg-background text-muted-foreground relative z-10 px-2'>Or continue with</span>
          </div>
          <Button
            type='button'
            onClick={async () => {
              await authClient.signIn.social({
                provider: 'google',
                callbackURL: '/',
              });
            }}
            variant='outline'
            className='w-full'
          >
            <svg xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='xMidYMid' viewBox='0 0 256 262'>
              <path
                fill='#4285F4'
                d='M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027'
              ></path>
              <path
                fill='#34A853'
                d='M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1'
              ></path>
              <path
                fill='#FBBC05'
                d='M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782'
              ></path>
              <path
                fill='#EB4335'
                d='M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251'
              ></path>
            </svg>
            Sign up with Google
          </Button>
        </div>
        <div className='text-center text-sm'>
          Already have an account?{' '}
          <Link to='/login' className='underline underline-offset-4'>
            Login
          </Link>
        </div>
      </form>
    </div>
  );
}
