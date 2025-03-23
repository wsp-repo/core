import { FileSize } from '../index';

type TestSuccess = {
  bytes: number;
  gbCeil: number;
  gbFloat: number;
  input: string | number;
  kbCeil: number;
  kbFloat: number;
  mbCeil: number;
  mbFloat: number;
};

const TESTS_ERROR: (string | number)[] = [-1234, '1 minutes'];

const TESTS_SUCCESS: TestSuccess[] = [
  {
    bytes: 0,
    gbCeil: 0,
    gbFloat: 0,
    input: 0,
    kbCeil: 0,
    kbFloat: 0,
    mbCeil: 0,
    mbFloat: 0,
  },
];

describe('Helpers checkers is...', () => {
  it.each(TESTS_ERROR)('isDefined', (input) => {
    const test = (): FileSize => new FileSize(input);

    expect(test).toThrow();
  });

  it.each(TESTS_SUCCESS)('isUndefined', ({ input, ...values }) => {
    const timespan = new FileSize(input);

    expect(timespan.toBytes()).toEqual(values.bytes);
    expect(timespan.toKb()).toEqual(values.kbFloat);
    expect(timespan.toKb(true)).toEqual(values.kbCeil);
    expect(timespan.toMb()).toEqual(values.mbFloat);
    expect(timespan.toMb(true)).toEqual(values.mbCeil);
    expect(timespan.toGb()).toEqual(values.gbFloat);
    expect(timespan.toGb(true)).toEqual(values.gbCeil);
  });
});
