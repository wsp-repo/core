import { getType } from './getType';
import { isDefined } from './isDefined';

/**
 * Проверяет, что значение array
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isArray<T = any>(value?: unknown): value is T[] {
  return isDefined(value) && getType(value) === 'array';
}
