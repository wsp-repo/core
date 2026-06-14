import { REGEXP_UPPER_CASE } from '../regexps';

/**
 * Проверяет, что значение корректный UPPER_CASE формат
 */
export function isUpperCase(value: string): boolean {
  REGEXP_UPPER_CASE.lastIndex = 0;

  return REGEXP_UPPER_CASE.test(value);
}
