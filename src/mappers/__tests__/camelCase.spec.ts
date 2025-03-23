/* eslint-disable sort-keys */
import { camelCase } from '../camelCase';

type Test = {
  camel: string;
  value: string;
};

describe('Check camelCase...', () => {
  const TESTS: Test[] = [
    { value: 'aaa', camel: 'aaa' },
    { value: 'AAA', camel: 'aaa' },
    { value: 'aAa', camel: 'aAa' },
    { value: 'a_aa', camel: 'aAa' },
    { value: 'aa123', camel: 'aa123' },
    { value: 'aa_123', camel: 'aa123' },
    { value: 'aBBa', camel: 'aBBa' },
    { value: '_aaa', camel: 'aaa' },
  ];

  it.each(TESTS)('camelCase', ({ value, camel }) => {
    expect(camelCase(value)).toEqual(camel);
  });
});
