import { isFunction } from './isFunction';
import { isObject } from './isObject';
import { isUndefined } from './isUndefined';

const specialKeys = ['__proto__'];

function isExcludedKey(key: string): boolean {
  // специальные зарезервированные ключи
  if (specialKeys.includes(key)) return true;

  // private декларация
  return key[0] === '#';
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

  const keys = new Set([
    ...Object.getOwnPropertyNames(Object.getPrototypeOf(value)),
    ...Object.keys(value),
  ]);

  const result = ([...keys] as (keyof T)[]).filter((key) => {
    if (onlyDefined && isUndefined(value[key])) return false;

    if (isExcludedKey(String(key))) return false;

    return !isFunction(value[key]);
  });

  return result;
}
