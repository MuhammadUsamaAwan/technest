import { createAuthClient } from 'better-auth/react';

import { clientEnv } from '~/config/clientEnv';

export const authClient = createAuthClient({
  baseURL: clientEnv.VITE_APP_URL,
});
