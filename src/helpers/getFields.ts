/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { isFunction } from './isFunction';
import { isObject } from './isObject';
import { isUndefined } from './isUndefined';

const specialKeys = new Set(['__proto__']);

function isExcludedKey(key: string): boolean {
  // специальные зарезервированные ключи
  if (specialKeys.has(key)) return true;

  // private декларации классов
  return key.startsWith('#');
}

/**
 * Возвращает список Runtime свойств объекта/инстанса класса
 * ! в Runtime игнорируются модификаторы приватности классов
 * ! исключает только свойства, закрытые декларацией "#"
 * ! исключает свойства-функции и методы классов
 */
export function getFields<T extends object>(
  value?: T,
  onlyDefined = false,
): (keyof T)[] {
  if (!isObject(value)) return [];

  const keys = new Set(Object.keys(value));

  let proto = Object.getPrototypeOf(value);

  while (proto && proto !== Object.prototype) {
    for (const key of Object.getOwnPropertyNames(proto)) {
      keys.add(key);
    }

    proto = Object.getPrototypeOf(proto);
  }

  const result = ([...keys] as (keyof T)[]).filter((key) => {
    if (onlyDefined && isUndefined(value[key])) return false;

    if (isExcludedKey(String(key))) return false;

    return !isFunction(value[key]);
  });

  return result;
}
