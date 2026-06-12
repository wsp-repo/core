import { getType } from './getType';
import { isDefined } from './isDefined';

/**
 * Проверяет, что значение number
 */
export function isNumber(value?: unknown): value is number {
  return isDefined(value) && getType(value) === 'number';
}
