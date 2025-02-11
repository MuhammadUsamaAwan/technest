import { useForm } from '@tanstack/react-form';
import { createFileRoute, Link, useNavigate } from '@tanstack/react-router';
import { CircleAlert } from 'lucide-react';
import { toast } from 'sonner';
import { z } from 'zod';

import { authClient } from '~/lib/auth-client';
import { Button, buttonVariants } from '~/components/ui/button';
import { FieldInfo } from '~/components/ui/form';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';

const forgotPasswordSearchSchema = z.object({
  token: z.string().min(1).optional(),
  error: z.string().min(1).optional(),
});

const forgotPasswordSchema = z
  .object({
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

export const Route = createFileRoute('/(auth)/_layout/reset-password')({
  component: RouteComponent,
  validateSearch: search => forgotPasswordSearchSchema.parse(search),
});

function RouteComponent() {
  const { token, error } = Route.useSearch();
  const navigate = useNavigate();

  const form = useForm({
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
    onSubmit: async ({ value }) => {
      const { error } = await authClient.resetPassword({
        newPassword: value.password,
        token,
      });
      if (error) {
        toast.error(error.message ?? 'Unable to reset password, please try again later');
      } else {
        navigate({ to: '/reset-password-success', replace: true });
      }
    },
    validators: {
      onChange: forgotPasswordSchema,
    },
  });

  if (error || !token) {
    return <ErrorComponent />;
  }

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
          <h1 className='text-2xl font-bold'>Reset your password</h1>
          <p className='text-muted-foreground text-sm text-balance'>Enter new password to reset your password</p>
        </div>
        <div className='grid gap-6'>
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
                Reset
              </Button>
            )}
          </form.Subscribe>
        </div>
      </form>
    </div>
  );
}

function ErrorComponent() {
  return (
    <div className='text-center'>
      <div className='mb-1 flex justify-center'>
        <CircleAlert className='size-12' />
      </div>
      <h1 className='mb-2 text-2xl font-bold'>Invalid Reset Password Link</h1>
      <p className='text-muted-foreground mb-4'>
        The reset password link you are trying to use is invalid or has expired.
      </p>
      <div className='flex justify-center gap-4'>
        <Link to='/login' className={buttonVariants()}>
          Login
        </Link>
        <Link to='/' className={buttonVariants({ variant: 'outline' })}>
          Back to Home
        </Link>
      </div>
    </div>
  );
}
