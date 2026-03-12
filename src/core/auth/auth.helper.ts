import { Page } from '@playwright/test';
import { env } from '../../config/env';
import { LoginPage } from '../../pages/auth/LoginPage';

export class AuthHelper {
  private readonly page: Page;
  private readonly loginPage: LoginPage;

  constructor(page: Page) {
    this.page = page;
    this.loginPage = new LoginPage(page);
  }

  async loginUI(username = env.USER_EMAIL, password = env.USER_PASSWORD): Promise<void> {
    if (!username || !password) {
      throw new Error('USER_EMAIL and USER_PASSWORD are required for UI authentication.');
    }

    await this.loginPage.goto();
    await this.loginPage.login(username, password);
  }

  buildBearerHeader(token = env.API_TOKEN): Record<string, string> {
    return {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    };
  }

  async setLocalAuthToken(token = env.API_TOKEN): Promise<void> {
    await this.page.addInitScript((value) => {
      window.localStorage.setItem('auth_token', value);
    }, token);
  }
}


