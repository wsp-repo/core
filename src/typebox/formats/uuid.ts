import { REGEXP_UUID } from '../../regexps';

export const uuidFormat = (value: string): boolean => {
  REGEXP_UUID.lastIndex = 0;

  return REGEXP_UUID.test(value);
};
