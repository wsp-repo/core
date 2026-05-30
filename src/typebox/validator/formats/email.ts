import { REGEXP_EMAIL } from 'src/regexps';

export const emailFormat = (value: string): boolean => REGEXP_EMAIL.test(value);
