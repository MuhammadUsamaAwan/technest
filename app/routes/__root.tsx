import type { ReactNode } from 'react';

import { createRootRoute, Outlet } from '@tanstack/react-router';
import { Meta, Scripts } from '@tanstack/start';

import globalCss from '~/styles/global.css?url';

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'TechNest - A place for all your tech needs',
      },
      {
        name: 'description',
        content: 'TechNest is a place for all your tech needs. You can find and buy all the latest tech gadgets here.',
      },
    ],
    links: [
      { rel: 'stylesheet', href: globalCss },
      {
        rel: 'icon',
        type: 'image/svg+xml',
        href: '/favicon.svg',
      },
    ],
  }),
  component: RootComponent,
});

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  );
}

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html>
      <head>
        <Meta />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}
