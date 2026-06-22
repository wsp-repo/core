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

  const keys = new Set<string>();
  const fields = new Set<string>();

  let proto = Object.getPrototypeOf(value);

  // Сначала проход по самому объекту значения
  for (const key of Object.getOwnPropertyNames(value)) {
    const descriptor = Object.getOwnPropertyDescriptor(value, key);

    if (isField(value, key, descriptor)) fields.add(key);

    keys.add(key);
  }

  // Проход по дереву прототипов
  while (proto && proto !== Object.prototype) {
    for (const key of Object.getOwnPropertyNames(proto)) {
      if (keys.has(key)) continue;

      const descriptor = Object.getOwnPropertyDescriptor(proto, key);

      if (isField(value, key, descriptor)) fields.add(key);

      keys.add(key);
    }

    proto = Object.getPrototypeOf(proto);
  }

  return [...fields] as (keyof T)[];
}

/**
 * Проверяет на "поле" с использованием дескриптора
 */
function isField<T extends object>(
  value: T,
  key: string,
  descriptor?: PropertyDescriptor,
): boolean {
  if (ignoredFields.has(key)) return false;

  if (isFunction(descriptor?.value)) return false;

  if (descriptor && 'get' in descriptor) return true;

  return !isFunction(value[key as keyof T]);
}
