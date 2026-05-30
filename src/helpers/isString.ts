import { getType } from './getType';
import { isDefined } from './isDefined';

/**
 * Проверяет, что значение string
 */
export function isString(value?: unknown): value is string {
  return isDefined(value) && getType(value) === 'string';
}
