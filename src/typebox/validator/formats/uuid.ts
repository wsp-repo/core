import { REGEXP_UUID } from 'src/regexps';

export const uuidFormat = (value: string): boolean => REGEXP_UUID.test(value);
