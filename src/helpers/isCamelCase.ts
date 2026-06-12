import { REGEXP_CAMEL_CASE } from 'src/regexps';

/**
 * Проверяет, что значение корректный cameCase формат
 */
export function isCamelCase(value: string): boolean {
  REGEXP_CAMEL_CASE.lastIndex = 0;

  return REGEXP_CAMEL_CASE.test(value);
}
