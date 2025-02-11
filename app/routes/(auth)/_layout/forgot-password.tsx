import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(auth)/_layout/forgot-password')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Forgot Password</div>
}
