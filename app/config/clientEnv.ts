import { z } from 'zod';

const clientEnvSchema = z.object({
  VITE_APP_URL: z.string().url(),
});

type ClientEnv = z.infer<typeof clientEnvSchema>;

export let clientEnv: ClientEnv;

try {
  clientEnv = clientEnvSchema.parse(import.meta.env);
} catch (error) {
  console.error('❌ Invalid client env:', error);
  process.exit(1);
}
