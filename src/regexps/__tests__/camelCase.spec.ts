import { describe, it, expect } from 'vitest';

import { REGEXP_CAMEL_CASE } from '../index';

type Test = { input: string; result: boolean };

const tests: Test[] = [
  { input: 'simple', result: true },
  { input: 'number123', result: true },
  { input: 'num123str', result: true },
  { input: 'twoParts', result: true },
  { input: 'worldNum123', result: true },
  { input: '123Word', result: false },
  { input: '_wordTwo', result: false },
  { input: 'Word_Two', result: false },
  { input: 'other-Simbol', result: false },
  { input: 'ALLUPPER', result: false },
];

describe('RegExps. RegExp "REGEXP_CAMEL_CASE"', () => {
  it.each(tests)('$input = $result', ({ result, input }) => {
    REGEXP_CAMEL_CASE.lastIndex = 0;

    expect(REGEXP_CAMEL_CASE.test(input)).toEqual(result);
  });
});
