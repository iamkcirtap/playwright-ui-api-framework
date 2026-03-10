import * as dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config({ path: process.env.ENV_FILE || '.env' });

const envSchema = z.object({
  ENV_NAME: z.string().default('local'),
  UI_BASE_URL: z.string().url(),
  API_BASE_URL: z.string().url(),
  API_TOKEN: z.string().min(1),
  USER_EMAIL: z.string().email().optional(),
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
