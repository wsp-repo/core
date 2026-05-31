import { REGEXP_IPV4, REGEXP_IPV6 } from 'src/regexps';

export function ipv4Format(value: string): boolean {
  REGEXP_IPV4.lastIndex = 0;

  return REGEXP_IPV4.test(value);
}

export function ipv6Format(value: string): boolean {
  REGEXP_IPV6.lastIndex = 0;

  return REGEXP_IPV6.test(value);
}
