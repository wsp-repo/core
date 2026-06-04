import { describe, it, expect } from 'vitest';

import { Type, createValidator } from '../../index';

type ValidateTest = { input: string | number; result: string };

const validTests: ValidateTest[] = [
  { input: '1gb 15mb', result: '1Gb 15Mb' },
  //'15Mb 13Kb',
  //'123456Kb',
  //'12 Mb',
  //1234567,
];

const invalidStrings: (string | number)[] = [
  '12Kbyte',
  '12Gigov',
  'sto gigov',
  -1234,
];

describe('TypeBox - проверка схемы [Type.ByteSize]', () => {
  describe('непосредственное значение', () => {
    const validator = createValidator(Type.ByteSize());

    it.each(validTests)('корректное значение: %s', ({ input, result }) => {
      expect(() => validator.compile(input)).not.toThrow();
      expect(validator.compile(input).toString()).toBe(result);
    });

    it.each(invalidStrings)('некорректное значение: %s', (value) => {
      expect(() => validator.compile(value)).toThrow();
    });
  });

  describe('значение как свойство объекта', () => {
    const validator = createValidator(
      Type.Object({ bytesize: Type.ByteSize() }),
    );

    it.each(validTests)('корректное значение: %s', ({ input, result }) => {
      expect(() => validator.compile({ bytesize: input })).not.toThrow();
      expect(() =>
        validator.compile({ bytesize: input }).bytesize.toString(),
      ).not.toThrow();
      expect(validator.compile({ bytesize: input }).bytesize.toString()).toBe(
        result,
      );
    });

    it.each(invalidStrings)('некорректное значение: %s', (value) => {
      expect(() => validator.compile({ bytesize: value })).toThrow();
    });
  });
});
