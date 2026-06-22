import { describe, it, expect } from 'vitest';

import { ByteSize } from '../index';

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
  {
    bytes: 0,
    gbCeil: 0,
    gbFloat: 0,
    input: '0kb',
    kbCeil: 0,
    kbFloat: 0,
    mbCeil: 0,
    mbFloat: 0,
  },
];

const TEST_TO_STRING: { bytes: number; result: string }[] = [
  { bytes: 123, result: '123b' },
  { bytes: 1234, result: '1Kb 210b' },
  { bytes: 1234567, result: '1Mb 181Kb 647b' },
];

describe('Classes', () => {
  describe('ByteSize', () => {
    it.each(TESTS_ERROR)('error', (input) => {
      const test = (): ByteSize => new ByteSize(input);

      expect(test).toThrow();
    });

    it.each(TESTS_SUCCESS)('success', ({ input, ...values }) => {
      const bytesize = new ByteSize(input);

      expect(bytesize.toBytes()).toEqual(values.bytes);
      expect(bytesize.toKb()).toEqual(values.kbFloat);
      expect(bytesize.toKb(true)).toEqual(values.kbCeil);
      expect(bytesize.toMb()).toEqual(values.mbFloat);
      expect(bytesize.toMb(true)).toEqual(values.mbCeil);
      expect(bytesize.toGb()).toEqual(values.gbFloat);
      expect(bytesize.toGb(true)).toEqual(values.gbCeil);
    });

    it.each(TEST_TO_STRING)('error', ({ bytes, result }) => {
      const bytesize = new ByteSize(bytes);

      expect(bytesize.toString()).toEqual(result);
    });
  });
});
