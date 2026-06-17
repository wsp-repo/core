import { getObjectFields } from './getObjectFields';
import { isDefined } from './isDefined';
import { isPrimitive } from './isPrimitive';

/**
 * Возвращает скопированный объект/массив
 * - используется глубокое копирование данных
 */
export function deepClone<T>(value: T, notTrim?: boolean): T {
  if (!value || isPrimitive(value)) return value;

  if (Array.isArray(value)) {
    const result: unknown[] = [];

    for (let i = 0; i < value.length; i++) {
      if (isDefined(value[i]) || notTrim) {
        result[i] = deepClone(value[i]);
      }
    }

    return result as T;
  }

  const objectFields = getObjectFields(value);

  if (objectFields) {
    const result: Record<string, unknown> = {};

    for (const key in value) {
      if (isDefined(value[key]) || notTrim) {
        result[key] = deepClone(value[key]);
      }
    }

    return result as T;
  }

  return value;
}
