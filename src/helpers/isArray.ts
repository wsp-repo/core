/**
 * Проверяет, что значение array
 */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isArray<T = any>(value?: unknown): value is T[] {
  return Array.isArray(value);
}
