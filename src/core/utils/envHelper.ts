import { env } from '../../config/env';

export const envConfig = {
  name: env.ENV_NAME,
  uiBaseUrl: env.UI_BASE_URL,
  apiBaseUrl: env.API_BASE_URL,
  apiToken: env.API_TOKEN,
  headless: env.HEADLESS === 'true'
} as const;

export function isCI(): boolean {
  return process.env.CI === 'true';
}
