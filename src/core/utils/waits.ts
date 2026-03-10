import { Locator, Page, expect } from '@playwright/test';

export async function waitForApiAndIdle(page: Page, waitForUrlPart?: string): Promise<void> {
  await page.waitForLoadState('domcontentloaded');
  await page.waitForLoadState('networkidle');

  if (waitForUrlPart) {
    await expect(page).toHaveURL(new RegExp(waitForUrlPart));
  }
}

export async function waitForVisible(locator: Locator): Promise<void> {
  await locator.waitFor({ state: 'visible' });
}

export async function waitForHidden(locator: Locator): Promise<void> {
  await locator.waitFor({ state: 'hidden' });
}

export async function hardWait(milliseconds: number): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, milliseconds));
}
