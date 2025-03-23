import { Timespan } from '../index';

type TestSuccess = {
  input: string | number;
  minCeil: number;
  minFloat: number;
  msValue: number;
  secCeil: number;
  secFloat: number;
};

const TESTS_ERROR: (string | number)[] = [-1234, '1 minutes'];

const TESTS_SUCCESS: TestSuccess[] = [
  {
    input: 0,
    minCeil: 0,
    minFloat: 0,
    msValue: 0,
    secCeil: 0,
    secFloat: 0,
  },
  {
    input: '123ms',
    minCeil: 1,
    minFloat: 0.003,
    msValue: 123,
    secCeil: 1,
    secFloat: 0.123,
  },
];

describe('Helpers checkers is...', () => {
  it.each(TESTS_ERROR)('isDefined', (input) => {
    const test = (): Timespan => new Timespan(input);

    expect(test).toThrow();
  });

  it.each(TESTS_SUCCESS)('isUndefined', ({ input, ...values }) => {
    const timespan = new Timespan(input);

    expect(timespan.toMs()).toEqual(values.msValue);
    expect(timespan.toSec()).toEqual(values.secFloat);
    expect(timespan.toSec(true)).toEqual(values.secCeil);
    expect(timespan.toMin()).toEqual(values.minFloat);
    expect(timespan.toMin(true)).toEqual(values.minCeil);
  });
});
