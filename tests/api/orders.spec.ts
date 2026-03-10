import { test, expect } from '../../src/core/fixtures/base.fixtures';

test('GET /orders returns 200', async ({ apiContext }) => {
  const response = await apiContext.get('/orders');
  expect(response.status()).toBe(200);
});

test('GET /orders parses as JSON via BaseAPI', async ({ apiClient }) => {
  const data = await apiClient.get<unknown[]>('/orders');
  expect(Array.isArray(data)).toBeTruthy();
});
