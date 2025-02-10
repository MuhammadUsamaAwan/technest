import { z } from 'zod';

const serverEnvSchema = z.object({
  DATABASE_URL: z.string().url(),
});

type ServerEnv = z.infer<typeof serverEnvSchema>;

export let serverEnv: ServerEnv;

try {
  serverEnv = serverEnvSchema.parse(process.env);
} catch (error) {
  console.error('❌ Invalid server env:', error);
  process.exit(1);
}
