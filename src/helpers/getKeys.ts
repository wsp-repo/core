import { isFunction } from './isFunction';
import { isObject } from './isObject';

const ignoreByFirst = ['_', '#'];

/**
 * Хелпер проверки игнорирования свойства
 */
function propertyIgnore(value: unknown): boolean {
  return ignoreByFirst.includes(String(value)[0]);
}

/**
 * Возвращает список свойств объекта, влючая геттеры
 * ! возвращает и private/protected свойства
 * ! исключает начинающиеся с "_" и "#"
 */
export function getKeys<T extends object>(value?: T): (keyof T)[] {
  if (!isObject(value)) return [];

  const result: (keyof T)[] = [];

  const methods = Object.getOwnPropertyNames(
    Object.getPrototypeOf(value),
  ) as (keyof T)[];

  methods.forEach((method) => {
    if (isFunction(value[method])) return;

    if (propertyIgnore(method)) return;

    result.push(method);
  });

  Object.keys(value).forEach((key) => {
    if (result.includes(key as keyof T)) return;

    if (propertyIgnore(key)) return;

    result.push(key as keyof T);
  });

  return result;
}
