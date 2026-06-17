import { getObjectFields } from './getObjectFields';
import { isArray } from './isArray';
import { isObject } from './isObject';
import { isString } from './isString';
import { isUndefined } from './isUndefined';

/**
 * Проверяет, что значение пустое
 */
export function isEmpty(value: unknown, trim = false): boolean {
  if (isUndefined(value) || value === null) {
    return true;
  }

  if (isString(value)) {
    if (trim && value.length > 0) {
      return value.trim() === '';
    }

    return value.length === 0;
  }

  if (isArray(value)) {
    if (trim && value.length > 0) {
      return value.every(isUndefined);
    }

    return value.length === 0;
  }

  if (isObject(value)) {
    const properties = getObjectFields(value, { onlyDefined: trim });

    return properties.length === 0;
  }

  return false;
}
