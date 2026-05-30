import { getType } from './getType';
import { isArray } from './isArray';
import { isEmpty } from './isEmpty';
import { isFunction } from './isFunction';
import { isObject } from './isObject';

const trueValues = ['true', '1', 'on'];

/**
 * Проверяет, что значение "эквивалентно" TRUE
 * - boolean-типизированное значение возвращается как есть
 * - значение-функция возвращает вызов этой функции
 * - объект или массив должны быть "непустыми"
 * - сравнение с 'true', '1', 'on'
 */
export function isTrue(value?: unknown): boolean {
  if (getType(value) === 'boolean') return value === true;

  if (isFunction<() => boolean>(value)) return value() === true;

  if (isArray(value) || isObject(value)) return !isEmpty(value);

  const strValue = String(value).toLowerCase().trim();

  return trueValues.includes(strValue);
}
