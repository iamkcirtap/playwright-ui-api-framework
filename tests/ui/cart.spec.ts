import { test } from '../../src/core/fixtures/ui.fixtures';

test('Empty cart state shows no cart items', async ({ cartPage }) => {
  await cartPage.goto();
  await cartPage.assertEmpty();
});
