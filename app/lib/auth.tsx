import { render } from '@react-email/components';
import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { admin } from 'better-auth/plugins';

import { serverEnv } from '~/config/serverEnv';
import { db } from '~/db';
import { accountsTable, sessionsTable, usersTable, verificationsTable } from '~/db/schema';
import { transporter } from '~/lib/smtp-transporter';
import EmailVerificationEmail from '~/emails/email-verification-email';
import ForgotPasswordEmail from '~/emails/forgot-password-email';

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: 'pg',
    schema: {
      user: usersTable,
      session: sessionsTable,
      account: accountsTable,
      verification: verificationsTable,
    },
  }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    sendResetPassword: async ({ user, url }) => {
      const html = await render(<ForgotPasswordEmail username={user.name} url={url} />);
      transporter.sendMail({
        to: user.email,
        subject: 'TechNest - Reset your password',
        html,
      });
    },
  },
  emailVerification: {
    sendVerificationEmail: async ({ user, url }) => {
      const _url = new URL(url);
      _url.searchParams.set('callbackURL', '/verify-email');
      const html = await render(<EmailVerificationEmail username={user.name} url={_url.toString()} />);
      transporter.sendMail({
        to: user.email,
        subject: 'TechNest - Verify your email address',
        html,
      });
    },
  },
  socialProviders: {
    google: {
      clientId: serverEnv.GOOGLE_CLIENT_ID,
      clientSecret: serverEnv.GOOGLE_CLIENT_SECRET,
    },
  },
  plugins: [admin()],
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60,
    },
  },
  account: {
    accountLinking: {
      enabled: true,
    },
  },
});
