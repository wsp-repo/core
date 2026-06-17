import { isArray } from './isArray';

/**
 * Проверяет, что значение object
 */
export function isObject<T extends object>(value?: unknown): value is T {
  if (value === null || isArray(value)) return false;

  return typeof value === 'object';
}
