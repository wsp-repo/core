import { REGEXP_EMAIL } from 'src/regexps';

export function emailFormat(value: string): boolean {
  REGEXP_EMAIL.lastIndex = 0;

  return REGEXP_EMAIL.test(value);
}
