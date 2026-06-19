import { isFunction } from './isFunction';
import { isObject } from './isObject';

// список ключей, которые всегда игнорируются
const ignoredFields = new Set(['__proto__']);

/**
 * Возвращает список Runtime свойств объекта/инстанса класса
 * ! в Runtime игнорируются модификаторы приватности классов
 * ! исключает только свойства, закрытые декларацией "#"
 * ! исключает свойства-функции и методы классов
 */
export function getObjectFields<T extends object>(
  value?: T,
): (keyof T)[] | undefined {
  if (!isObject(value)) return undefined;

  const keys = new Set();

  let proto = Object.getPrototypeOf(value);

  while (proto && proto !== Object.prototype) {
    for (const key of Object.getOwnPropertyNames(proto)) {
      if (ignoredFields.has(key)) continue;

      const descriptor = Object.getOwnPropertyDescriptor(proto, key);

      if (isFunction(descriptor?.value)) continue;

      if (descriptor && 'get' in descriptor) {
        keys.add(key);

        continue;
      }

      if (!isFunction(value[key as keyof T])) {
        keys.add(key);
      }
    }

    proto = Object.getPrototypeOf(proto);
  }

  Object.keys(value).forEach((key) => {
    if (ignoredFields.has(key) || keys.has(key)) {
      return;
    }

    if (!isFunction(value[key as keyof T])) {
      keys.add(key);
    }
  });

  return [...keys] as (keyof T)[];
}
