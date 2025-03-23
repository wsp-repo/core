/* eslint-disable sort-keys */
import { snakeCase } from '../snakeCase';

type Test = {
  snake: string;
  value: string;
};

describe('Check camelCase...', () => {
  const TESTS: Test[] = [
    { value: 'aaa', snake: 'aaa' },
    { value: 'AAA', snake: 'aaa' },
    { value: 'aAa', snake: 'a_aa' },
    { value: 'a_aa', snake: 'a_aa' },
    { value: 'aa123', snake: 'aa_123' },
    { value: 'aa_123', snake: 'aa_123' },
    { value: 'aBBa', snake: 'a_bba' },
    { value: '_aaa', snake: '_aaa' },
  ];

  it.each(TESTS)('snakeCase', ({ value, snake }) => {
    expect(snakeCase(value)).toEqual(snake);
  });
});
