import { Type } from '@sinclair/typebox';
import { describe, it, expect } from 'vitest';

import { TypeboxValidator } from '../../validator';

import { TypeboxFormats } from '../../types';

describe('TypeBox datetime format validation', () => {
  const datetimeValidator = new TypeboxValidator(
    Type.String({ format: TypeboxFormats.DateTime }),
  );

  it.each([
    '2023-01-01T00:00:00Z',
    '2023-12-31T23:59:59Z',
    '2016-12-31T23:59:60Z', // поддержка добавочной секунды (последняя реальная добавочная секунда)
    '2024-02-29T12:30:45Z', // високосный год
    '2023-06-15T15:30:00.123Z',
    '2023-01-01T12:00:00+00:00',
    '2023-06-15T15:30:45-05:00',
    '2023-12-31T23:59:59+03:00',
    '2023-01-01T00:00:00.000Z',
    '2023-06-15T09:30:45.999-03:00',
    '2015-06-30T23:59:60Z', // историческая добавочная секунда
    '2012-06-30T23:59:60Z', // историческая добавочная секунда
    '2023-01-01T12:00:00', // местное время без часового пояса (разрешено ISO 8601)
  ])('should validate correct datetime string: %s', (datetime) => {
    expect(() => datetimeValidator.compile(datetime)).not.toThrow();
    expect(datetimeValidator.compile(datetime)).toBe(datetime);
  });

  it.each([
    '2023-02-29T12:00:00Z', // не високосный год
    '2023-13-01T12:00:00Z', // неверный месяц
    '2023-01-32T12:00:00Z', // неверный день
    '2023-04-31T12:00:00Z', // в апреле только 30 дней
    '2023-01-01T25:00:00Z', // неверный час
    '2023-01-01T12:60:00Z', // неверная минута
    '2025-04-30T12:00:60Z', // неверная секунда (60 слишком много)
    '2023-01-01T12:30:61Z', // неверная секунда (61 слишком много)
    '2023-01-01 12:00:00Z', // неверный разделитель (пробел вместо T)
    '2023-01-01T12:00:00.1234Z', // слишком много цифр миллисекунд
    '23-01-01T12:00:00Z', // неверный формат года
    '2023-1-1T12:00:00Z', // отсутствуют ведущие нули в дате
    '2023-01-01T1:00:00Z', // отсутствует ведущий ноль в часе
    '',
    'not-a-datetime',
    '2023-01-01T12:00:00.Z', // конечная точка без миллисекунд
    '2023-01-01T12:00:00+25:00', // неверный час часового пояса
    '2023-01-01T12:00:00+12:60', // неверная минута часового пояса
  ])('should reject invalid datetime string: %s', (datetime) => {
    expect(() => datetimeValidator.compile(datetime)).toThrow();
  });

  describe('leap year validation', () => {
    it.each([
      '2000-02-29T12:00:00Z', // делится на 400
      '2004-02-29T12:00:00Z', // делится на 4, не на 100
      '2024-02-29T12:00:00Z', // делится на 4, не на 100
    ])('should validate correct leap year datetime: %s', (datetime) => {
      expect(() => datetimeValidator.compile(datetime)).not.toThrow();
    });

    it.each([
      '1900-02-29T12:00:00Z', // делится на 100, но не на 400
      '2001-02-29T12:00:00Z', // не делится на 4
      '2023-02-29T12:00:00Z', // не делится на 4
    ])('should reject invalid leap year datetime: %s', (datetime) => {
      expect(() => datetimeValidator.compile(datetime)).toThrow();
    });
  });

  describe('timezone validation', () => {
    it.each([
      '2023-01-01T12:00:00Z', // UTC
      '2023-01-01T12:00:00+00:00', // UTC в формате смещения
      '2023-01-01T12:00:00-00:00', // UTC с отрицательным нулевым смещением
      '2023-01-01T12:00:00+12:00',
      '2023-01-01T12:00:00-12:00',
      '2023-01-01T12:00:00+05:30',
      '2023-01-01T12:00:00-03:30',
      '2023-01-01T12:00:00+05:45',
      '2023-01-01T12:00:00+12:45',
      '2023-01-01T12:00:00+04:30',
      '2023-01-01T12:00:00-09:30',
    ])('should validate datetime with timezone: %s', (datetime) => {
      expect(() => datetimeValidator.compile(datetime)).not.toThrow();
    });

    it.each([
      '2023-01-01T12:00:00+24:00', // неверный час часового пояса
      '2023-01-01T12:00:00-24:00', // неверный час часового пояса
      '2023-01-01T12:00:00+12:60', // неверная минута часового пояса (должно быть +13:00)
      '2023-01-01T12:00:00-12:60', // неверная минута часового пояса (должно быть -13:00)
      '2023-01-01T12:00:00+23:60', // неверная минута часового пояса при максимальном часе
      '2023-01-01T12:00:00+1:00', // отсутствует ведущий ноль в часе часового пояса
      '2023-01-01T12:00:00+12:0', // отсутствует ведущий ноль в минуте часового пояса
      '2023-01-01T12:00:00+00:61', // неверная минута > 59
    ])('should reject invalid timezone: %s', (datetime) => {
      expect(() => datetimeValidator.compile(datetime)).toThrow();
    });
  });

  describe('milliseconds validation', () => {
    it.each([
      '2023-01-01T12:30:45.0Z',
      '2023-01-01T12:30:45.00Z',
      '2023-01-01T12:30:45.000Z',
      '2023-01-01T12:30:45.1Z',
      '2023-01-01T12:30:45.12Z',
      '2023-01-01T12:30:45.123Z',
      '2023-01-01T12:30:45.999Z',
      '2023-01-01T12:30:45.123+05:00',
    ])('should validate datetime with milliseconds: %s', (datetime) => {
      expect(() => datetimeValidator.compile(datetime)).not.toThrow();
    });

    it.each([
      '2023-01-01T12:30:45.1234Z', // слишком много цифр
      '2023-01-01T12:30:45.12345Z', // слишком много цифр
      '2023-01-01T12:30:45.aZ', // не числовое
      '2023-01-01T12:30:45..123Z', // двойная точка
      '2023-01-01T12:30:45.Z', // конечная точка без миллисекунд
    ])('should reject invalid milliseconds format: %s', (datetime) => {
      expect(() => datetimeValidator.compile(datetime)).toThrow();
    });
  });

  describe('edge cases', () => {
    it.each([
      '2023-01-01T00:00:00Z', // начало года
      '2023-12-31T23:59:59Z', // конец года
      '2016-12-31T23:59:60Z', // последняя реальная добавочная секунда
      '2015-06-30T23:59:60Z', // историческая добавочная секунда (июнь)
      '2012-06-30T23:59:60Z', // историческая добавочная секунда (июнь)
      '2008-12-31T23:59:60Z', // историческая добавочная секунда (декабрь)
    ])('should validate boundary datetime: %s', (datetime) => {
      expect(() => datetimeValidator.compile(datetime)).not.toThrow();
    });

    describe('days validation for months', () => {
      it.each(['01', '03', '05', '07', '08', '10', '12'])(
        'should allow 31st day for month %s',
        (month) => {
          expect(() =>
            datetimeValidator.compile(`2023-${month}-31T12:00:00Z`),
          ).not.toThrow();
        },
      );

      it.each(['04', '06', '09', '11'])(
        'should allow 30th day for month %s',
        (month) => {
          expect(() =>
            datetimeValidator.compile(`2023-${month}-30T12:00:00Z`),
          ).not.toThrow();
        },
      );

      it.each(['04', '06', '09', '11'])(
        'should reject 31st day for month %s',
        (month) => {
          expect(() =>
            datetimeValidator.compile(`2023-${month}-31T12:00:00Z`),
          ).toThrow();
        },
      );

      describe('February', () => {
        it('should allow 28th day in non-leap year', () => {
          expect(() =>
            datetimeValidator.compile('2023-02-28T12:00:00Z'),
          ).not.toThrow();
        });

        it('should reject 29th day in non-leap year', () => {
          expect(() =>
            datetimeValidator.compile('2023-02-29T12:00:00Z'),
          ).toThrow();
        });

        it('should allow 29th day in leap year', () => {
          expect(() =>
            datetimeValidator.compile('2024-02-29T12:00:00Z'),
          ).not.toThrow();
        });
      });
    });
  });
});
