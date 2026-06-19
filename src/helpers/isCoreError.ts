import { CoreError } from '../errors';
import { isDefined } from './isDefined';

export function isCoreError(value: unknown, strict?: true): value is CoreError {
  if (strict) return value instanceof CoreError;

  const asCoreError = value as CoreError;

  return asCoreError
    ? // поля наследуемые из Error
      isDefined(asCoreError.message) &&
        isDefined(asCoreError.name) &&
        // специфические поля CoreError
        isDefined(asCoreError.statusCode) &&
        isDefined(asCoreError.code)
    : false;
}
