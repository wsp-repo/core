/* eslint-disable @typescript-eslint/no-unsafe-function-type */

import { getKeys } from './getKeys';
import { isUndefined } from './isUndefined';

type DataFields<T> = {
  [K in keyof T]: T[K] extends Function ? never : K;
}[keyof T];

type ClassToObject<T> = Pick<T, DataFields<T>>;

/**
 * Перегоняет класс в объект с полями свойств
 * ! захватывает private/protected поля (см. getKeys)
 */
export function toObject<T extends object>(
  value: T,
  exclude: string[] = [],
): ClassToObject<T> {
  const result = {} as ClassToObject<T>;

  getKeys(value).forEach((key) => {
    if (isUndefined(value[key])) return;

    if (exclude.includes(key as string)) return;

    Object.assign(result, { [key]: value[key] });
  });

  return result;
}
