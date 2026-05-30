import { REGEXP_URI, REGEXP_URL } from 'src/regexps';

const notUriFragmentRegex = /\/|:/; // для быстрой проверки, что строка uri (имеет / и :)

export const uriFormat = (value: string): boolean =>
  notUriFragmentRegex.test(value) && REGEXP_URI.test(value);

export const urlFormat = (value: string): boolean => REGEXP_URL.test(value);
