import { REGEXP_EMAIL } from '../../regexps';

export function emailFormat(value: string): boolean {
  REGEXP_EMAIL.lastIndex = 0;

  return REGEXP_EMAIL.test(value);
}
