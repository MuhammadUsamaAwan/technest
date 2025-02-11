import { createTransport } from 'nodemailer';

import { serverEnv } from '~/config/serverEnv';

export const transporter = createTransport({
  host: serverEnv.SMTP_HOST,
  port: Number(serverEnv.SMTP_PORT),
  auth: {
    user: serverEnv.SMTP_USER,
    pass: serverEnv.SMTP_PASSWORD,
  },
});
