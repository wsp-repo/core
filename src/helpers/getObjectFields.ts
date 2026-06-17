/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { getPreciseType } from './getPreciseType';
import { isFunction } from './isFunction';
import { isUndefined } from './isUndefined';

export type GetFieldsOptions = {
  ignoreFields?: string[];
  ignoreTypes?: string[];
  onlyDefined?: boolean;
};

// обязательные опции игнорирования
const requiredIgnoreFields = new Set(['__proto__']);
const requiredIgnoreTypes = new Set(['promise', 'date', 'map', 'set']);

/**
 * Проверяет игнорирование значения по типу с учетом опций
 */
function ignoreByType(value: unknown, ignoreTypes?: string[]): value is object {
  if (value === null || typeof value !== 'object') return true;

  const preciseType = getPreciseType(value);

  if (requiredIgnoreTypes.has(preciseType)) return true;

  return Boolean(ignoreTypes?.includes(preciseType));
}

/**
 * Проверяет игнорирование поля по имени с учетом опций
 */
function ignoreField(fieldName: string, ignoreFields?: string[]): boolean {
  if (requiredIgnoreFields.has(fieldName)) return false;

  return Boolean(ignoreFields?.includes(fieldName));
}

/**
 * Возвращает список Runtime свойств объекта/инстанса класса
 * ! в Runtime игнорируются модификаторы приватности классов
 * ! исключает только свойства, закрытые декларацией "#"
 * ! исключает свойства-функции и методы классов
 */
export function getObjectFields<T extends object>(
  value?: T,
  options?: GetFieldsOptions,
): (keyof T)[] | undefined {
  if (isUndefined(value)) return undefined;

  const { ignoreFields, ignoreTypes, onlyDefined } = options || {};

  if (ignoreByType(value, ignoreTypes)) return undefined;

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

    if (ignoreField(String(key), ignoreFields)) return false;

    return !isFunction(value[key]);
  });

  return result;
}
