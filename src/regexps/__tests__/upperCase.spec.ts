import { describe, it, expect } from 'vitest';

import { REGEXP_UPPER_CASE } from '../index';

type Test = { input: string; result: boolean };

const tests: Test[] = [
  { input: 'SIMPLE', result: true },
  { input: 'NUMBER123', result: true },
  { input: 'NUMBER_123', result: true },
  { input: 'TWO_PARTS', result: true },
  { input: 'WORD_NUM123', result: true },
  { input: 'WORD_NUM_123', result: true },
  { input: 'WORD_123_WORD', result: true },
  { input: '123WORD', result: false },
  { input: '_WORD_TWO', result: false },
  { input: 'WORD__TWO', result: false },
  { input: 'OTHER-SIMBOL', result: false },
  { input: 'Lower_SIMBOL', result: false },
];

describe('RegExps', () => {
  describe('REGEXP_UPPER_CASE', () => {
    it.each(tests)('$input = $result', ({ result, input }) => {
      REGEXP_UPPER_CASE.lastIndex = 0;

      expect(REGEXP_UPPER_CASE.test(input)).toEqual(result);
    });
  });
});
