import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';

export const Route = createFileRoute('/')({
  component: RouteComponent,
});

function RouteComponent() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h1>Home</h1>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
