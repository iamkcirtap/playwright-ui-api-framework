import { APIRequestContext, APIResponse, expect } from '@playwright/test';

export type RequestOptions = {
  params?: Record<string, string | number | boolean>;
  headers?: Record<string, string>;
  data?: unknown;
};

export class BaseAPI {
  protected readonly request: APIRequestContext;

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  async get<T>(url: string, options?: RequestOptions): Promise<T> {
    const response = await this.request.get(url, {
      params: options?.params,
      headers: options?.headers
    });
    await this.assertSuccess(response, `GET ${url}`);
    return (await response.json()) as T;
  }

  async post<T>(url: string, options?: RequestOptions): Promise<T> {
    const response = await this.request.post(url, {
      headers: options?.headers,
      params: options?.params,
      data: options?.data
    });
    await this.assertSuccess(response, `POST ${url}`);
    return (await response.json()) as T;
  }

  async put<T>(url: string, options?: RequestOptions): Promise<T> {
    const response = await this.request.put(url, {
      headers: options?.headers,
      params: options?.params,
      data: options?.data
    });
    await this.assertSuccess(response, `PUT ${url}`);
    return (await response.json()) as T;
  }

  async patch<T>(url: string, options?: RequestOptions): Promise<T> {
    const response = await this.request.patch(url, {
      headers: options?.headers,
      params: options?.params,
      data: options?.data
    });
    await this.assertSuccess(response, `PATCH ${url}`);
    return (await response.json()) as T;
  }

  async delete(url: string, options?: RequestOptions): Promise<APIResponse> {
    const response = await this.request.delete(url, {
      headers: options?.headers,
      params: options?.params,
      data: options?.data
    });
    await this.assertSuccess(response, `DELETE ${url}`);
    return response;
  }

  protected async assertSuccess(response: APIResponse, action: string): Promise<void> {
    const message = `${action} failed with status ${response.status()}`;
    expect(response.ok(), message).toBeTruthy();
  }
}
