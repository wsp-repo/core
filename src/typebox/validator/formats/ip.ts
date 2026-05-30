import { REGEXP_IPV4, REGEXP_IPV6 } from 'src/regexps';

export const ipv4Format = (value: string): boolean => REGEXP_IPV4.test(value);

export const ipv6Format = (value: string): boolean => REGEXP_IPV6.test(value);
