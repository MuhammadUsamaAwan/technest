import { useState } from 'react';

import { createFileRoute } from '@tanstack/react-router';
import { createServerFn } from '@tanstack/start';

import { clientEnv } from '~/config/clientEnv';
import { serverEnv } from '~/config/serverEnv';

const getDatabaseUrl = createServerFn().handler(async () => {
  return serverEnv.DATABASE_URL;
});

export const Route = createFileRoute('/')({
  component: RouteComponent,
  loader: async () => await getDatabaseUrl(),
});

function RouteComponent() {
  const [count, setCount] = useState(0);
  const state = Route.useLoaderData();

  console.log(process.env.DATABASE_URL);
  console.log(getDatabaseUrl);

  return (
    <div>
      <h1 className='text-3xl font-bold'>Home</h1>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <div>{clientEnv.VITE_APP_URL}</div>
      <div>{state}</div>
    </div>
  );
}
