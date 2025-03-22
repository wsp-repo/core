/* eslint-disable sort-keys */
import { camelCase, snakeCase } from '../mappers';

type Test = {
  camel: string;
  snake: string;
  value: string;
};

describe('Check camelCase...', () => {
  const TESTS: Test[] = [
    { value: 'aaa', camel: 'aaa', snake: 'aaa' },
    { value: 'AAA', camel: 'aaa', snake: 'aaa' },
    { value: 'aAa', camel: 'aAa', snake: 'a_aa' },
    { value: 'a_aa', camel: 'aAa', snake: 'a_aa' },
    { value: 'aa123', camel: 'aa123', snake: 'aa_123' },
    { value: 'aa_123', camel: 'aa123', snake: 'aa_123' },
    { value: 'aBBa', camel: 'aBBa', snake: 'a_bba' },
    { value: '_aaa', camel: 'aaa', snake: '_aaa' },
  ];

  it.each(TESTS)('camelCase', ({ value, camel }) => {
    expect(camelCase(value)).toEqual(camel);
  });

  it.each(TESTS)('snakeCase', ({ value, snake }) => {
    expect(snakeCase(value)).toEqual(snake);
  });
});
