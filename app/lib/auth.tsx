import { render } from '@react-email/components';
import EmailVerification from '~/emails/email-verification';
import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { admin } from 'better-auth/plugins';

import { serverEnv } from '~/config/serverEnv';
import { db } from '~/db';
import { accountsTable, sessionsTable, usersTable, verificationsTable } from '~/db/schema';

import { transporter } from './send-email';

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
  },
  emailVerification: {
    sendVerificationEmail: async ({ user, url }) => {
      const _url = new URL(url);
      _url.searchParams.set('callbackURL', '/verify-email');
      const html = await render(<EmailVerification username={user.name} emailVerificationLink={_url.toString()} />);
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
});
