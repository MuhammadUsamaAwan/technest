import React from 'react';

import { Link, useLocation } from '@tanstack/react-router';

import { unslugify } from '~/lib/utils';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '~/components/ui/breadcrumb';

export function AppBreadcrumbs() {
  const { pathname } = useLocation();
  const breadcrumbs = pathname
    .split('/')
    .filter(segment => segment !== '')
    .map((segment, index, array) => ({
      title: unslugify(segment),
      to: `/${array.slice(0, index + 1).join('/')}`,
    }));

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {breadcrumbs.map((breadcrumb, index) => (
          <React.Fragment key={breadcrumb.title}>
            <BreadcrumbItem>
              {breadcrumb.to === pathname ? (
                <BreadcrumbPage>{breadcrumb.title}</BreadcrumbPage>
              ) : (
                <BreadcrumbLink className='hidden sm:block' asChild>
                  <Link to={breadcrumb.to}>{breadcrumb.title}</Link>
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
            {index < breadcrumbs.length - 1 && <BreadcrumbSeparator className='hidden sm:block' />}
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
