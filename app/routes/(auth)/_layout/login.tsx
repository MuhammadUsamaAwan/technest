import { useForm } from '@tanstack/react-form';
import { createFileRoute, Link, useNavigate } from '@tanstack/react-router';
import { createServerFn } from '@tanstack/start';
import { and, eq } from 'drizzle-orm';
import { toast } from 'sonner';
import { z } from 'zod';

import { db } from '~/db';
import { usersTable } from '~/db/schema';
import { authClient } from '~/lib/auth-client';
import { Button } from '~/components/ui/button';
import { FieldInfo } from '~/components/ui/form';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';
import { PasswordInput } from '~/components/ui/password-input';

export const getUserId = createServerFn()
  .validator(
    z.object({
      email: z.string().email(),
    })
  )
  .handler(async ({ data }) => {
    const [user] = await db
      .select({
        id: usersTable.id,
      })
      .from(usersTable)
      .where(and(eq(usersTable.email, data.email), eq(usersTable.emailVerified, false)));
    return user?.id;
  });

const loginSchema = z.object({
  email: z.string().email({ message: 'Invalid email' }),
  password: z.string().min(1, { message: 'Password is required' }),
});

export const Route = createFileRoute('/(auth)/_layout/login')({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();

  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    onSubmit: async ({ value }) => {
      const { error } = await authClient.signIn.email({
        email: value.email,
        password: value.password,
        callbackURL: '/',
      });
      if (error) {
        if (error.code === 'EMAIL_NOT_VERIFIED') {
          const userId = await getUserId({ data: { email: value.email } });
          navigate({ to: '/check-email/$userId', params: { userId } });
        } else {
          toast.error(error.message ?? 'Unable to login, please try again later');
        }
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
          <h1 className='text-2xl font-bold'>Login to your account</h1>
          <p className='text-muted-foreground text-sm text-balance'>Enter your email below to login to your account</p>
        </div>
        <div className='grid gap-6'>
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
                <div className='flex items-center'>
                  <Label htmlFor={field.name}>Password</Label>
                  <Link to='/forgot-password' className='ml-auto text-sm underline-offset-4 hover:underline'>
                    Forgot your password?
                  </Link>
                </div>
                <PasswordInput
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onChange={e => field.handleChange(e.target.value)}
                  placeholder='Your Password'
                />
                <FieldInfo field={field} />
              </div>
            )}
          </form.Field>
          <form.Subscribe selector={state => [state.canSubmit, state.isSubmitting]}>
            {([canSubmit, isSubmitting]) => (
              <Button isLoading={isSubmitting} disabled={!canSubmit} type='submit' className='w-full'>
                Login
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
            Login with Google
          </Button>
        </div>
        <div className='text-center text-sm'>
          Don&apos;t have an account?{' '}
          <Link to='/signup' className='underline underline-offset-4'>
            Sign up
          </Link>
        </div>
      </form>
    </div>
  );
}
