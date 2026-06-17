import { CoreError } from '../errors';
import { isDefined } from './isDefined';

export function isCoreError(value: unknown, strict?: true): value is CoreError {
  if (strict) return value instanceof CoreError;

  const asCoreError = value as CoreError;

  return (
    isDefined(asCoreError.message) &&
    isDefined(asCoreError.statusCode) &&
    isDefined(asCoreError.code)
  );
}
