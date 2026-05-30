import { getType } from './getType';
import { isArray } from './isArray';
import { isEmpty } from './isEmpty';
import { isFunction } from './isFunction';
import { isObject } from './isObject';

const falseValues = ['false', '0', 'off'];

/**
 * Проверяет, что значение "эквивалентно" FALSE
 * - boolean-типизированное значение возвращается как есть
 * - значение-функция возвращает вызов этой функции
 * - объект или массив должны быть "пустыми"
 * - сравнение с 'false', '0', 'off'
 */
export function isFalse(value?: unknown): boolean {
  if (getType(value) === 'boolean') return value === false;

  if (isFunction<() => boolean>(value)) return value() === false;

  if (isArray(value) || isObject(value)) return isEmpty(value);

  const strValue = String(value).toLowerCase().trim();

  return falseValues.includes(strValue);
}
