import type { ReactNode } from 'react';

import { createRootRoute, Outlet } from '@tanstack/react-router';
import { createServerFn, Meta, Scripts } from '@tanstack/start';
import { getRequestHeaders } from '@tanstack/start/server';
import { NotFound } from '~/layouts/not-found';

import { auth } from '~/lib/auth';
import { Toaster } from '~/components/ui/toast';
import { TooltipProvider } from '~/components/ui/tooltip';
import globalCss from '~/styles/global.css?url';

export const getSession = createServerFn().handler(async () => {
  const headersObject = getRequestHeaders();
  const headers = new Headers();
  Object.entries(headersObject).forEach(([key, value]) => {
    if (value !== undefined) {
      headers.append(key, value);
    }
  });
  const session = await auth.api.getSession({
    headers,
  });
  return session;
});

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
        title: 'TechNest - High-Quality Computer Parts',
      },
      {
        name: 'description',
        content: 'Buy High-Quality Computer Parts Online - Best Deals & Fast Shipping',
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
  notFoundComponent: NotFound,
  beforeLoad: async () => {
    const session = await getSession();
    return { session };
  },
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
    <html lang='en'>
      <head>
        <Meta />
      </head>
      <body>
        <TooltipProvider delayDuration={500}>{children}</TooltipProvider>
        <Toaster />
        <Scripts />
      </body>
    </html>
  );
}
