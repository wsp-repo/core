import { getType } from './getType';
import { isDefined } from './isDefined';

/**
 * Проверяет, что значение object
 */
export function isObject<T extends object>(value?: unknown): value is T {
  return isDefined(value) && getType(value) === 'object';
}
