import { describe, it, expect } from 'vitest';

import { Timestamp } from '../timestamp';

type TestSuccess = {
  input: string | number;
  minCeil: number;
  minFloat: number;
  msValue: number;
  secCeil: number;
  secFloat: number;
};

type TestParse = {
  input: string | number;
  msValue: number;
};

type TestShift = {
  input: number;
  msValue: number;
  value: Timestamp | string | number;
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
    input: 123,
    minCeil: 1,
    minFloat: 0.003,
    msValue: 123,
    secCeil: 1,
    secFloat: 0.123,
  },
  {
    input: '123',
    minCeil: 1,
    minFloat: 0.003,
    msValue: 123,
    secCeil: 1,
    secFloat: 0.123,
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

const msInS = 1000;
const msInM = 60 * msInS;
const msInH = 60 * msInM;
const msInD = 24 * msInH;

const TESTS_PARSE: TestParse[] = [
  { input: 0, msValue: 0 },
  { input: 1234, msValue: 1234 },
  { input: '1234', msValue: 1234 },
  { input: '1234ms', msValue: 1234 },
  { input: '3s', msValue: 3 * msInS },
  { input: '2m', msValue: 2 * msInM },
  { input: '2h', msValue: 2 * msInH },
  { input: '2d', msValue: 2 * msInD },
  { input: '2d 2h 2m', msValue: 2 * msInD + 2 * msInH + 2 * msInM },
  { input: '3d 4m', msValue: 3 * msInD + 4 * msInM },
];

const TESTS_INCREASE: TestShift[] = [
  { input: 1000, msValue: 1100, value: 100 },
  { input: 1000, msValue: 2000, value: '1s' },
  { input: 1000, msValue: 2000, value: new Timestamp('1s') },
];

const TESTS_DECREASE: TestShift[] = [
  { input: 2000, msValue: 1900, value: 100 },
  { input: 2000, msValue: 1000, value: '1s' },
  { input: 2000, msValue: 1000, value: new Timestamp('1s') },
];

describe('Helpers checkers is...', () => {
  it.each(TESTS_ERROR)('Timestamp throw', (input) => {
    const test = (): Timestamp => new Timestamp(input);

    expect(test).toThrow();
  });

  it.each(TESTS_PARSE)('Timestamp parse', ({ input, msValue }) => {
    expect(new Timestamp(input).toMs()).toEqual(msValue);
  });

  it.each(TESTS_SUCCESS)('Timestamp methods', ({ input, ...values }) => {
    const timestamp = new Timestamp(input);

    expect(timestamp.toMs()).toEqual(values.msValue);
    expect(timestamp.toSec()).toEqual(values.secFloat);
    expect(timestamp.toSec(true)).toEqual(values.secCeil);
    expect(timestamp.toMin()).toEqual(values.minFloat);
    expect(timestamp.toMin(true)).toEqual(values.minCeil);
  });

  it.each(TESTS_INCREASE)('Timestamp increase', ({ input, msValue, value }) => {
    expect(new Timestamp(input).increase(value).toMs()).toEqual(msValue);
  });

  it.each(TESTS_DECREASE)('Timestamp decrease', ({ input, msValue, value }) => {
    expect(new Timestamp(input).decrease(value).toMs()).toEqual(msValue);
  });
});
