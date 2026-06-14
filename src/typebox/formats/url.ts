import { REGEXP_URI, REGEXP_URL } from '../../regexps';

export function uriFormat(value: string): boolean {
  REGEXP_URI.lastIndex = 0;

  return REGEXP_URI.test(value);
}

export function urlFormat(value: string): boolean {
  REGEXP_URL.lastIndex = 0;

  return REGEXP_URL.test(value);
}
