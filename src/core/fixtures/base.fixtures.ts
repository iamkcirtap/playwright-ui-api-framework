import { APIRequestContext, Page, request, test as base } from '@playwright/test';
import { BaseAPI } from '../../api/clients/BaseAPI';
import { env } from '../../config/env';
import { AuthHelper } from '../auth/auth.helper';
import { LoginPage } from '../../pages/auth/LoginPage';

type FrameworkFixtures = {
  apiContext: APIRequestContext;
  apiClient: BaseAPI;
  loginPage: LoginPage;
  authHelper: AuthHelper;
  authenticatedPage: Page;
};

export const test = base.extend<FrameworkFixtures>({
  apiContext: async ({}, use) => {
    const apiContext = await request.newContext({
      baseURL: env.API_BASE_URL,
      extraHTTPHeaders: {
        Authorization: `Bearer ${env.API_TOKEN}`,
        'Content-Type': 'application/json'
      }
    });

    await use(apiContext);
    await apiContext.dispose();
  },

  apiClient: async ({ apiContext }, use) => {
    await use(new BaseAPI(apiContext));
  },

  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  authHelper: async ({ page }, use) => {
    await use(new AuthHelper(page));
  },

  authenticatedPage: async ({ page, authHelper }, use) => {
    if (env.USER_EMAIL && env.USER_PASSWORD) {
      await authHelper.loginUI(env.USER_EMAIL, env.USER_PASSWORD);
    }

    await use(page);
  }
});

export { expect } from '@playwright/test';
