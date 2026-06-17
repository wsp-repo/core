/**
 * Проверяет, что значение является функцией
 */
export function isFunction<T>(value?: unknown): value is T {
  return typeof value === 'function';
}
