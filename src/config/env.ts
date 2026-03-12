import * as dotenv from 'dotenv';
import { z } from 'zod';

const selectedEnvName = process.env.ENV_NAME;
const selectedEnvFile = process.env.ENV_FILE || (selectedEnvName ? `.env.${selectedEnvName}` : '.env');

dotenv.config({ path: selectedEnvFile });

const envSchema = z.object({
  ENV_NAME: z.string().default('local'),
  UI_BASE_URL: z.string().url(),
  API_BASE_URL: z.string().url().optional(),
  API_TOKEN: z.string().min(1).optional(),
  USER_EMAIL: z.string().min(1).optional(),
  USER_PASSWORD: z.string().min(1).optional(),
  HEADLESS: z.enum(['true', 'false']).default('true')
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error('Environment validation failed:', parsed.error.flatten().fieldErrors);
  throw new Error('Environment variables validation failed');
}

export const env = parsed.data;
export type Environment = typeof env;



