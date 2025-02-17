import { adminClient } from 'better-auth/client/plugins';
import { createAuthClient } from 'better-auth/react';

import { clientEnv } from '~/config/clientEnv';

export const authClient = createAuthClient({
  baseURL: clientEnv.VITE_APP_URL,
  plugins: [adminClient()],
});
