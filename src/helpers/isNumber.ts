/**
 * Проверяет, что значение number
 */
export function isNumber(value?: unknown): value is number {
  return typeof value === 'number';
}
