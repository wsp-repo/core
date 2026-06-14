import { REGEXP_PASCAL_CASE } from '../regexps';

/**
 * Проверяет, что значение корректный PascalCase формат
 */
export function isPascalCase(value: string): boolean {
  REGEXP_PASCAL_CASE.lastIndex = 0;

  return REGEXP_PASCAL_CASE.test(value);
}
