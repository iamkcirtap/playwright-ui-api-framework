function randomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function randomString(length = 8): string {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
  return Array.from({ length }, () => chars[randomNumber(0, chars.length - 1)]).join('');
}

export function randomEmail(prefix = 'user'): string {
  return `${prefix}.${Date.now()}.${randomString(5)}@mailinator.com`;
}

export function randomPhone(): string {
  return `9${randomNumber(100000000, 999999999)}`;
}

export function randomSku(prefix = 'SKU'): string {
  return `${prefix}-${Date.now()}-${randomString(4).toUpperCase()}`;
}
