import { CoreError } from '../errors';
import { isDefined } from './isDefined';
import { isError } from './isError';
import { isObject } from './isObject';

export function isCoreError(
  value?: unknown,
  strict?: true,
): value is CoreError {
  if (value instanceof CoreError) return true;

  if (strict || !isObject(value)) return false;

  const asCoreError = value as CoreError;

  return (
    isError(value, false) &&
    isDefined(asCoreError.statusCode) &&
    isDefined(asCoreError.code)
  );
}
