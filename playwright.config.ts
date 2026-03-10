import { defineConfig, devices } from '@playwright/test';
import { env } from './src/config/env';

export default defineConfig({
    testDir: './tests',
    fullyParallel: true,
    retries: process.env.CI ? 2 : 0,
    workers: process.env.CI ? 4 : undefined,
    forbidOnly: !!process.env.CI,
    timeout: 60_000,
    expect: { timeout: 10_000 },

    reporter: process.env.CI
        ? [['dot'], ['junit', {outputFile: 'test-results/junit.xml'}], ['html', {open: 'never'}]]
        : [['list'], ['html', {open: 'never'}]],


    use: {
        baseURL: env.UI_BASE_URL,
        trace: 'retain-on-failure',
        screenshot: 'only-on-failure',
        video: 'retain-on-failure'
    },

    projects: [
        {
            name: 'ui-chromium',
            testMatch: /tests\/ui\/.*\.spec\.ts/,
            use: { ...devices['Desktop Chrome'] }
            },
        {
            name: 'api',
            testMatch: /tests\/api\/.*\.spec\.ts/,
            use: { baseURL: env.API_BASE_URL }
        }
    ],

    outputDir: 'test-results/artifacts',
});