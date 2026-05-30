import { getType } from './getType';
import { isDefined } from './isDefined';

/**
 * Проверяет, что значение является функцией
 */
export function isFunction<T>(value?: unknown): value is T {
  return isDefined(value) && getType(value) === 'function';
}
