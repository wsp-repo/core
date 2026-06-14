import { describe, it, expect } from 'vitest';

import { REGEXP_PASCAL_CASE } from '../index';

type Test = { input: string; result: boolean };

const tests: Test[] = [
  { input: 'Simple', result: true },
  { input: 'Number123', result: true },
  { input: 'Num123str', result: true },
  { input: 'TwoParts', result: true },
  { input: 'WorldNum123', result: true },
  { input: '123Word', result: false },
  { input: '_WordTwo', result: false },
  { input: 'Word_Two', result: false },
  { input: 'Other-Simbol', result: false },
  { input: 'ALLUPPER', result: false },
];

describe('RegExps. RegExp "REGEXP_PASCAL_CASE"', () => {
  it.each(tests)('$input = $result', ({ result, input }) => {
    REGEXP_PASCAL_CASE.lastIndex = 0;

    expect(REGEXP_PASCAL_CASE.test(input)).toEqual(result);
  });
});
