import { useForm } from '@tanstack/react-form'
import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { Label } from '@radix-ui/react-label'
import { toast } from 'sonner'
import { z } from 'zod'

import { authClient } from '~/lib/auth-client'
import { Button } from '~/components/ui/button'
import { FieldInfo } from '~/components/ui/form'
import { Input } from '~/components/ui/input'

const forgotPasswordSchema = z.object({
  email: z
    .string({ required_error: 'Email is required' })
    .email({ message: 'Invalid email' }),
})

export const Route = createFileRoute('/(auth)/_layout/forgot-password/')({
  component: RouteComponent,
})

function RouteComponent() {
  const navigate = useNavigate()

  const form = useForm({
    defaultValues: {
      email: '',
    },
    onSubmit: async ({ value }) => {
      const { error } = await authClient.forgetPassword({
        email: value.email,
        redirectTo: '/reset-password',
      })
      if (error) {
        toast.error(
          error.message ??
            'Unable to send reset password email, please try again later',
        )
      } else {
        navigate({
          to: '/forgot-password/$email',
          params: { email: value.email },
        })
      }
    },
    validators: {
      onChange: forgotPasswordSchema,
    },
  })

  return (
    <div className="w-full max-w-xs">
      <form
        onSubmit={(e) => {
          e.preventDefault()
          e.stopPropagation()
          form.handleSubmit()
        }}
        className="flex flex-col gap-6"
      >
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold">Forgot your password?</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Enter your email below to receive a link to reset your password
          </p>
        </div>
        <div className="grid gap-6">
          <form.Field name="email">
            {(field) => (
              <div className="grid gap-2">
                <Label htmlFor={field.name}>Email</Label>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="Your Email"
                />
                <FieldInfo field={field} />
              </div>
            )}
          </form.Field>
          <form.Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting]}
          >
            {([canSubmit, isSubmitting]) => (
              <Button
                isLoading={isSubmitting}
                disabled={!canSubmit}
                type="submit"
                className="w-full"
              >
                Submit
              </Button>
            )}
          </form.Subscribe>
        </div>
        <div className="text-center text-sm">
          Remembered your password?{' '}
          <Link to="/login" className="underline underline-offset-4">
            Login
          </Link>
        </div>
      </form>
    </div>
  )
}
