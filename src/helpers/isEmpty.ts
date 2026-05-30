import { getKeys } from './getKeys';
import { isArray } from './isArray';
import { isObject } from './isObject';
import { isString } from './isString';

/**
 * Проверяет, что значение пустое
 */
export function isEmpty(value: unknown): boolean {
  if (isString(value) || isArray(value)) {
    return value.length === 0;
  }

  if (value && isObject(value)) {
    return getKeys(value).length === 0;
  }

  return value !== null;
}
