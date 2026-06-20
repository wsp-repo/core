import { describe, it, expect } from 'vitest';

import { snakeCase } from '../index';

type Test = {
  result: string;
  value: string;
};

const TESTS: Test[] = [
  { value: 'aaa', result: 'aaa' },
  { value: 'AAA', result: 'aaa' },
  { value: 'aAa', result: 'a_aa' },
  { value: 'a_aa', result: 'a_aa' },
  { value: 'aa123', result: 'aa_123' },
  { value: 'aa_123', result: 'aa_123' },
  { value: 'aBBa', result: 'a_bba' },
  { value: '_aaa', result: '_aaa' },
];

describe('Helpers', () => {
  describe('camelCase', () => {
    it.each(TESTS)('$value => $result', ({ value, result }) => {
      expect(snakeCase(value)).toEqual(result);
    });
  });
});
