/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as IndexImport } from './routes/index'
import { Route as AdminLayoutImport } from './routes/admin/_layout'
import { Route as authLayoutImport } from './routes/(auth)/_layout'
import { Route as AdminLayoutIndexImport } from './routes/admin/_layout/index'
import { Route as authLayoutVerifyEmailImport } from './routes/(auth)/_layout/verify-email'
import { Route as authLayoutSignupImport } from './routes/(auth)/_layout/signup'
import { Route as authLayoutResetPasswordSuccessImport } from './routes/(auth)/_layout/reset-password-success'
import { Route as authLayoutResetPasswordImport } from './routes/(auth)/_layout/reset-password'
import { Route as authLayoutLoginImport } from './routes/(auth)/_layout/login'
import { Route as AdminLayoutUsersIndexImport } from './routes/admin/_layout/users.index'
import { Route as authLayoutForgotPasswordIndexImport } from './routes/(auth)/_layout/forgot-password.index'
import { Route as AdminLayoutUsersIdImport } from './routes/admin/_layout/users.$id'
import { Route as authLayoutForgotPasswordEmailImport } from './routes/(auth)/_layout/forgot-password.$email'
import { Route as authLayoutCheckEmailUserIdImport } from './routes/(auth)/_layout/check-email.$userId'

// Create Virtual Routes

const AdminImport = createFileRoute('/admin')()
const authImport = createFileRoute('/(auth)')()

// Create/Update Routes

const AdminRoute = AdminImport.update({
  id: '/admin',
  path: '/admin',
  getParentRoute: () => rootRoute,
} as any)

const authRoute = authImport.update({
  id: '/(auth)',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const AdminLayoutRoute = AdminLayoutImport.update({
  id: '/_layout',
  getParentRoute: () => AdminRoute,
} as any)

const authLayoutRoute = authLayoutImport.update({
  id: '/_layout',
  getParentRoute: () => authRoute,
} as any)

const AdminLayoutIndexRoute = AdminLayoutIndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => AdminLayoutRoute,
} as any)

const authLayoutVerifyEmailRoute = authLayoutVerifyEmailImport.update({
  id: '/verify-email',
  path: '/verify-email',
  getParentRoute: () => authLayoutRoute,
} as any)

const authLayoutSignupRoute = authLayoutSignupImport.update({
  id: '/signup',
  path: '/signup',
  getParentRoute: () => authLayoutRoute,
} as any)

const authLayoutResetPasswordSuccessRoute =
  authLayoutResetPasswordSuccessImport.update({
    id: '/reset-password-success',
    path: '/reset-password-success',
    getParentRoute: () => authLayoutRoute,
  } as any)

const authLayoutResetPasswordRoute = authLayoutResetPasswordImport.update({
  id: '/reset-password',
  path: '/reset-password',
  getParentRoute: () => authLayoutRoute,
} as any)

const authLayoutLoginRoute = authLayoutLoginImport.update({
  id: '/login',
  path: '/login',
  getParentRoute: () => authLayoutRoute,
} as any)

const AdminLayoutUsersIndexRoute = AdminLayoutUsersIndexImport.update({
  id: '/users/',
  path: '/users/',
  getParentRoute: () => AdminLayoutRoute,
} as any)

const authLayoutForgotPasswordIndexRoute =
  authLayoutForgotPasswordIndexImport.update({
    id: '/forgot-password/',
    path: '/forgot-password/',
    getParentRoute: () => authLayoutRoute,
  } as any)

const AdminLayoutUsersIdRoute = AdminLayoutUsersIdImport.update({
  id: '/users/$id',
  path: '/users/$id',
  getParentRoute: () => AdminLayoutRoute,
} as any)

const authLayoutForgotPasswordEmailRoute =
  authLayoutForgotPasswordEmailImport.update({
    id: '/forgot-password/$email',
    path: '/forgot-password/$email',
    getParentRoute: () => authLayoutRoute,
  } as any)

const authLayoutCheckEmailUserIdRoute = authLayoutCheckEmailUserIdImport.update(
  {
    id: '/check-email/$userId',
    path: '/check-email/$userId',
    getParentRoute: () => authLayoutRoute,
  } as any,
)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/(auth)': {
      id: '/(auth)'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof authImport
      parentRoute: typeof rootRoute
    }
    '/(auth)/_layout': {
      id: '/(auth)/_layout'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof authLayoutImport
      parentRoute: typeof authRoute
    }
    '/admin': {
      id: '/admin'
      path: '/admin'
      fullPath: '/admin'
      preLoaderRoute: typeof AdminImport
      parentRoute: typeof rootRoute
    }
    '/admin/_layout': {
      id: '/admin/_layout'
      path: '/admin'
      fullPath: '/admin'
      preLoaderRoute: typeof AdminLayoutImport
      parentRoute: typeof AdminRoute
    }
    '/(auth)/_layout/login': {
      id: '/(auth)/_layout/login'
      path: '/login'
      fullPath: '/login'
      preLoaderRoute: typeof authLayoutLoginImport
      parentRoute: typeof authLayoutImport
    }
    '/(auth)/_layout/reset-password': {
      id: '/(auth)/_layout/reset-password'
      path: '/reset-password'
      fullPath: '/reset-password'
      preLoaderRoute: typeof authLayoutResetPasswordImport
      parentRoute: typeof authLayoutImport
    }
    '/(auth)/_layout/reset-password-success': {
      id: '/(auth)/_layout/reset-password-success'
      path: '/reset-password-success'
      fullPath: '/reset-password-success'
      preLoaderRoute: typeof authLayoutResetPasswordSuccessImport
      parentRoute: typeof authLayoutImport
    }
    '/(auth)/_layout/signup': {
      id: '/(auth)/_layout/signup'
      path: '/signup'
      fullPath: '/signup'
      preLoaderRoute: typeof authLayoutSignupImport
      parentRoute: typeof authLayoutImport
    }
    '/(auth)/_layout/verify-email': {
      id: '/(auth)/_layout/verify-email'
      path: '/verify-email'
      fullPath: '/verify-email'
      preLoaderRoute: typeof authLayoutVerifyEmailImport
      parentRoute: typeof authLayoutImport
    }
    '/admin/_layout/': {
      id: '/admin/_layout/'
      path: '/'
      fullPath: '/admin/'
      preLoaderRoute: typeof AdminLayoutIndexImport
      parentRoute: typeof AdminLayoutImport
    }
    '/(auth)/_layout/check-email/$userId': {
      id: '/(auth)/_layout/check-email/$userId'
      path: '/check-email/$userId'
      fullPath: '/check-email/$userId'
      preLoaderRoute: typeof authLayoutCheckEmailUserIdImport
      parentRoute: typeof authLayoutImport
    }
    '/(auth)/_layout/forgot-password/$email': {
      id: '/(auth)/_layout/forgot-password/$email'
      path: '/forgot-password/$email'
      fullPath: '/forgot-password/$email'
      preLoaderRoute: typeof authLayoutForgotPasswordEmailImport
      parentRoute: typeof authLayoutImport
    }
    '/admin/_layout/users/$id': {
      id: '/admin/_layout/users/$id'
      path: '/users/$id'
      fullPath: '/admin/users/$id'
      preLoaderRoute: typeof AdminLayoutUsersIdImport
      parentRoute: typeof AdminLayoutImport
    }
    '/(auth)/_layout/forgot-password/': {
      id: '/(auth)/_layout/forgot-password/'
      path: '/forgot-password'
      fullPath: '/forgot-password'
      preLoaderRoute: typeof authLayoutForgotPasswordIndexImport
      parentRoute: typeof authLayoutImport
    }
    '/admin/_layout/users/': {
      id: '/admin/_layout/users/'
      path: '/users'
      fullPath: '/admin/users'
      preLoaderRoute: typeof AdminLayoutUsersIndexImport
      parentRoute: typeof AdminLayoutImport
    }
  }
}

// Create and export the route tree

interface authLayoutRouteChildren {
  authLayoutLoginRoute: typeof authLayoutLoginRoute
  authLayoutResetPasswordRoute: typeof authLayoutResetPasswordRoute
  authLayoutResetPasswordSuccessRoute: typeof authLayoutResetPasswordSuccessRoute
  authLayoutSignupRoute: typeof authLayoutSignupRoute
  authLayoutVerifyEmailRoute: typeof authLayoutVerifyEmailRoute
  authLayoutCheckEmailUserIdRoute: typeof authLayoutCheckEmailUserIdRoute
  authLayoutForgotPasswordEmailRoute: typeof authLayoutForgotPasswordEmailRoute
  authLayoutForgotPasswordIndexRoute: typeof authLayoutForgotPasswordIndexRoute
}

const authLayoutRouteChildren: authLayoutRouteChildren = {
  authLayoutLoginRoute: authLayoutLoginRoute,
  authLayoutResetPasswordRoute: authLayoutResetPasswordRoute,
  authLayoutResetPasswordSuccessRoute: authLayoutResetPasswordSuccessRoute,
  authLayoutSignupRoute: authLayoutSignupRoute,
  authLayoutVerifyEmailRoute: authLayoutVerifyEmailRoute,
  authLayoutCheckEmailUserIdRoute: authLayoutCheckEmailUserIdRoute,
  authLayoutForgotPasswordEmailRoute: authLayoutForgotPasswordEmailRoute,
  authLayoutForgotPasswordIndexRoute: authLayoutForgotPasswordIndexRoute,
}

const authLayoutRouteWithChildren = authLayoutRoute._addFileChildren(
  authLayoutRouteChildren,
)

interface authRouteChildren {
  authLayoutRoute: typeof authLayoutRouteWithChildren
}

const authRouteChildren: authRouteChildren = {
  authLayoutRoute: authLayoutRouteWithChildren,
}

const authRouteWithChildren = authRoute._addFileChildren(authRouteChildren)

interface AdminLayoutRouteChildren {
  AdminLayoutIndexRoute: typeof AdminLayoutIndexRoute
  AdminLayoutUsersIdRoute: typeof AdminLayoutUsersIdRoute
  AdminLayoutUsersIndexRoute: typeof AdminLayoutUsersIndexRoute
}

const AdminLayoutRouteChildren: AdminLayoutRouteChildren = {
  AdminLayoutIndexRoute: AdminLayoutIndexRoute,
  AdminLayoutUsersIdRoute: AdminLayoutUsersIdRoute,
  AdminLayoutUsersIndexRoute: AdminLayoutUsersIndexRoute,
}

const AdminLayoutRouteWithChildren = AdminLayoutRoute._addFileChildren(
  AdminLayoutRouteChildren,
)

interface AdminRouteChildren {
  AdminLayoutRoute: typeof AdminLayoutRouteWithChildren
}

const AdminRouteChildren: AdminRouteChildren = {
  AdminLayoutRoute: AdminLayoutRouteWithChildren,
}

const AdminRouteWithChildren = AdminRoute._addFileChildren(AdminRouteChildren)

export interface FileRoutesByFullPath {
  '/': typeof authLayoutRouteWithChildren
  '/admin': typeof AdminLayoutRouteWithChildren
  '/login': typeof authLayoutLoginRoute
  '/reset-password': typeof authLayoutResetPasswordRoute
  '/reset-password-success': typeof authLayoutResetPasswordSuccessRoute
  '/signup': typeof authLayoutSignupRoute
  '/verify-email': typeof authLayoutVerifyEmailRoute
  '/admin/': typeof AdminLayoutIndexRoute
  '/check-email/$userId': typeof authLayoutCheckEmailUserIdRoute
  '/forgot-password/$email': typeof authLayoutForgotPasswordEmailRoute
  '/admin/users/$id': typeof AdminLayoutUsersIdRoute
  '/forgot-password': typeof authLayoutForgotPasswordIndexRoute
  '/admin/users': typeof AdminLayoutUsersIndexRoute
}

export interface FileRoutesByTo {
  '/': typeof authLayoutRouteWithChildren
  '/admin': typeof AdminLayoutIndexRoute
  '/login': typeof authLayoutLoginRoute
  '/reset-password': typeof authLayoutResetPasswordRoute
  '/reset-password-success': typeof authLayoutResetPasswordSuccessRoute
  '/signup': typeof authLayoutSignupRoute
  '/verify-email': typeof authLayoutVerifyEmailRoute
  '/check-email/$userId': typeof authLayoutCheckEmailUserIdRoute
  '/forgot-password/$email': typeof authLayoutForgotPasswordEmailRoute
  '/admin/users/$id': typeof AdminLayoutUsersIdRoute
  '/forgot-password': typeof authLayoutForgotPasswordIndexRoute
  '/admin/users': typeof AdminLayoutUsersIndexRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/(auth)': typeof authRouteWithChildren
  '/(auth)/_layout': typeof authLayoutRouteWithChildren
  '/admin': typeof AdminRouteWithChildren
  '/admin/_layout': typeof AdminLayoutRouteWithChildren
  '/(auth)/_layout/login': typeof authLayoutLoginRoute
  '/(auth)/_layout/reset-password': typeof authLayoutResetPasswordRoute
  '/(auth)/_layout/reset-password-success': typeof authLayoutResetPasswordSuccessRoute
  '/(auth)/_layout/signup': typeof authLayoutSignupRoute
  '/(auth)/_layout/verify-email': typeof authLayoutVerifyEmailRoute
  '/admin/_layout/': typeof AdminLayoutIndexRoute
  '/(auth)/_layout/check-email/$userId': typeof authLayoutCheckEmailUserIdRoute
  '/(auth)/_layout/forgot-password/$email': typeof authLayoutForgotPasswordEmailRoute
  '/admin/_layout/users/$id': typeof AdminLayoutUsersIdRoute
  '/(auth)/_layout/forgot-password/': typeof authLayoutForgotPasswordIndexRoute
  '/admin/_layout/users/': typeof AdminLayoutUsersIndexRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/'
    | '/admin'
    | '/login'
    | '/reset-password'
    | '/reset-password-success'
    | '/signup'
    | '/verify-email'
    | '/admin/'
    | '/check-email/$userId'
    | '/forgot-password/$email'
    | '/admin/users/$id'
    | '/forgot-password'
    | '/admin/users'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/'
    | '/admin'
    | '/login'
    | '/reset-password'
    | '/reset-password-success'
    | '/signup'
    | '/verify-email'
    | '/check-email/$userId'
    | '/forgot-password/$email'
    | '/admin/users/$id'
    | '/forgot-password'
    | '/admin/users'
  id:
    | '__root__'
    | '/'
    | '/(auth)'
    | '/(auth)/_layout'
    | '/admin'
    | '/admin/_layout'
    | '/(auth)/_layout/login'
    | '/(auth)/_layout/reset-password'
    | '/(auth)/_layout/reset-password-success'
    | '/(auth)/_layout/signup'
    | '/(auth)/_layout/verify-email'
    | '/admin/_layout/'
    | '/(auth)/_layout/check-email/$userId'
    | '/(auth)/_layout/forgot-password/$email'
    | '/admin/_layout/users/$id'
    | '/(auth)/_layout/forgot-password/'
    | '/admin/_layout/users/'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  authRoute: typeof authRouteWithChildren
  AdminRoute: typeof AdminRouteWithChildren
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  authRoute: authRouteWithChildren,
  AdminRoute: AdminRouteWithChildren,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/(auth)",
        "/admin"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/(auth)": {
      "filePath": "(auth)",
      "children": [
        "/(auth)/_layout"
      ]
    },
    "/(auth)/_layout": {
      "filePath": "(auth)/_layout.tsx",
      "parent": "/(auth)",
      "children": [
        "/(auth)/_layout/login",
        "/(auth)/_layout/reset-password",
        "/(auth)/_layout/reset-password-success",
        "/(auth)/_layout/signup",
        "/(auth)/_layout/verify-email",
        "/(auth)/_layout/check-email/$userId",
        "/(auth)/_layout/forgot-password/$email",
        "/(auth)/_layout/forgot-password/"
      ]
    },
    "/admin": {
      "filePath": "admin",
      "children": [
        "/admin/_layout"
      ]
    },
    "/admin/_layout": {
      "filePath": "admin/_layout.tsx",
      "parent": "/admin",
      "children": [
        "/admin/_layout/",
        "/admin/_layout/users/$id",
        "/admin/_layout/users/"
      ]
    },
    "/(auth)/_layout/login": {
      "filePath": "(auth)/_layout/login.tsx",
      "parent": "/(auth)/_layout"
    },
    "/(auth)/_layout/reset-password": {
      "filePath": "(auth)/_layout/reset-password.tsx",
      "parent": "/(auth)/_layout"
    },
    "/(auth)/_layout/reset-password-success": {
      "filePath": "(auth)/_layout/reset-password-success.tsx",
      "parent": "/(auth)/_layout"
    },
    "/(auth)/_layout/signup": {
      "filePath": "(auth)/_layout/signup.tsx",
      "parent": "/(auth)/_layout"
    },
    "/(auth)/_layout/verify-email": {
      "filePath": "(auth)/_layout/verify-email.tsx",
      "parent": "/(auth)/_layout"
    },
    "/admin/_layout/": {
      "filePath": "admin/_layout/index.tsx",
      "parent": "/admin/_layout"
    },
    "/(auth)/_layout/check-email/$userId": {
      "filePath": "(auth)/_layout/check-email.$userId.tsx",
      "parent": "/(auth)/_layout"
    },
    "/(auth)/_layout/forgot-password/$email": {
      "filePath": "(auth)/_layout/forgot-password.$email.tsx",
      "parent": "/(auth)/_layout"
    },
    "/admin/_layout/users/$id": {
      "filePath": "admin/_layout/users.$id.tsx",
      "parent": "/admin/_layout"
    },
    "/(auth)/_layout/forgot-password/": {
      "filePath": "(auth)/_layout/forgot-password.index.tsx",
      "parent": "/(auth)/_layout"
    },
    "/admin/_layout/users/": {
      "filePath": "admin/_layout/users.index.tsx",
      "parent": "/admin/_layout"
    }
  }
}
ROUTE_MANIFEST_END */
