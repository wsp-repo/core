/**
 * Проверяет, что значение array
 */

import { isDefined } from './isDefined';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isArray<T = any>(value?: unknown): value is T[] {
  return isDefined(value) && Array.isArray(value);
}
