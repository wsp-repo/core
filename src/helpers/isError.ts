import { isDefined } from './isDefined';
import { isObject } from './isObject';

/**
 * Проверяет, что объект является инстансом ошибки
 * - при строгой проверке должен быть инстансом Error
 */
export function isError(value?: unknown, strict = false): value is Error {
  if (value instanceof Error) return true;

  if (strict || !isObject(value)) return false;

  const asError = value as Error;

  return (
    isDefined(asError.message) &&
    isDefined(asError.name) &&
    isDefined(asError.stack)
  );
}
