import { z } from 'zod';

const serverEnvSchema = z.object({
  DATABASE_URL: z.string().url(),
  BETTER_AUTH_SECRET: z.string().min(1),
  BETTER_AUTH_URL: z.string().min(1),
  GOOGLE_CLIENT_ID: z.string().min(1),
  GOOGLE_CLIENT_SECRET: z.string().min(1),
  SMTP_HOST: z.string().min(1),
  SMTP_PORT: z.string().min(1),
  SMTP_USER: z.string().min(1),
  SMTP_PASSWORD: z.string().min(1),
  EMAIL_FROM: z.string().min(1),
});

type ServerEnv = z.infer<typeof serverEnvSchema>;

export let serverEnv: ServerEnv;

try {
  serverEnv = serverEnvSchema.parse(process.env);
} catch (error) {
  console.error('❌ Invalid server env:', error);
  process.exit(1);
}
