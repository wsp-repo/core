import { isDefined } from './isDefined';

/**
 * Проверяет, что объект является инстансом ошибки
 * - при строгой проверке должен быть инстансом Error
 */
export function isError<T extends Error>(
  value?: unknown,
  strict = false,
): value is T {
  if (value instanceof Error) return true;

  if (!value || strict) return false;

  const { message, stack } = (value as Error) || {};

  return isDefined(message) && isDefined(stack);
}
