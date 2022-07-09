import { hasProperty } from './hasProperty';

import { AnyObject } from '../interfaces';

/**
 * Заполняет объект доступными свойствами объекта
 */
export function fillObject<T>(object: T, source: AnyObject): T {
  Object.entries(source).forEach(([key, value]) => {
    if (hasProperty(object, key)) object[key] = value;
  });

  return object;
}
