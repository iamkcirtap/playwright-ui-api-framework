import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from '../common/BasePage';

export class LoginPage extends BasePage {
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly signInButton: Locator;
  readonly submitButton: Locator;
  readonly registerLink: Locator;
  readonly forgotPasswordLink: Locator;
  readonly errorMessage: Locator;
  readonly profileMenu: Locator;

  constructor(page: Page) {
    super(page);
    this.emailInput = page.locator('[data-testid="login-email"], #email, input[name="email"]');
    this.passwordInput = page.locator('[data-testid="login-password"], #password, input[name="password"]');
    this.signInButton = page.locator('[data-testid="login-submit"], button[type="submit"]');
    this.submitButton = this.signInButton;
    this.registerLink = page.locator('[data-testid="register-link"], a[href*="register"]');
    this.forgotPasswordLink = page.locator('[data-testid="forgot-password-link"], a[href*="forgot"]');
    this.errorMessage = page.locator('[data-testid="auth-error"], .error-message, .alert-error');
    this.profileMenu = page.locator('[data-testid="profile-menu"], .profile-menu, .account-menu');
  }

  async goto(): Promise<void> {
    await super.goto('/login');
  }

  async fillCredentials(email: string, password: string): Promise<void> {
    await this.fill(this.emailInput, email);
    await this.fill(this.passwordInput, password);
  }

  async clickSignIn(): Promise<void> {
    await this.click(this.signInButton);
  }

  async login(email: string, password: string): Promise<void> {
    await this.fillCredentials(email, password);
    await this.clickSignIn();
  }

  async goToRegister(): Promise<void> {
    await this.click(this.registerLink);
  }

  async goToForgotPassword(): Promise<void> {
    await this.click(this.forgotPasswordLink);
  }

  async assertLoaded(): Promise<void> {
    await expect(this.emailInput).toBeVisible();
    await expect(this.passwordInput).toBeVisible();
    await expect(this.signInButton).toBeVisible();
  }

  async assertLoginErrorContains(text: string): Promise<void> {
    await expect(this.errorMessage).toBeVisible();
    await expect(this.errorMessage).toContainText(text);
  }

  async assertLoggedIn(): Promise<void> {
    await expect(this.profileMenu).toBeVisible();
  }
}
