import { Type } from '@sinclair/typebox';
import { describe, it, expect } from 'vitest';

import { TypeboxValidator } from '../../validator';

import { TFormats } from '../../types';

describe('Typebox - проверка формата [TFormats.Date]', () => {
  const dateValidator = new TypeboxValidator(
    Type.String({ format: TFormats.Date }),
  );

  it.each([
    '2023-01-01',
    '2023-12-31',
    '2024-02-29', // високосный год
    '2023-06-15',
    '1900-01-01',
    '2000-02-29', // високосный год
    '1999-12-31',
  ])('should validate correct date string: %s', (date) => {
    expect(() => dateValidator.compile(date)).not.toThrow();
    expect(dateValidator.compile(date)).toBe(date);
  });

  it.each([
    '2023-02-29', // не високосный год
    '2023-13-01', // неверный месяц
    '2023-01-32', // неверный день
    '2023-04-31', // в апреле только 30 дней
    '2023-01', // неполная дата
    '23-01-01', // неверный формат года
    '2023/01/01', // неверный разделитель
    '2023-1-1', // отсутствуют ведущие нули
    '',
    'not-a-date',
    '2023-00-01', // неверный месяц (0)
    '2023-01-00', // неверный день (0)
  ])('should reject invalid date string: %s', (date) => {
    expect(() => dateValidator.compile(date)).toThrow();
  });

  it.each([
    '2000-02-29', // делится на 400
    '2004-02-29', // делится на 4, не на 100
    '2024-02-29', // делится на 4, не на 100
  ])('should validate correct leap year date: %s', (date) => {
    expect(() => dateValidator.compile(date)).not.toThrow();
  });

  it.each([
    '1900-02-29', // делится на 100, но не на 400
    '2001-02-29', // не делится на 4
    '2023-02-29', // не делится на 4
  ])('should reject invalid leap year date: %s', (date) => {
    expect(() => dateValidator.compile(date)).toThrow();
  });

  describe('days validation for months', () => {
    it.each(['01', '03', '05', '07', '08', '10', '12'])(
      'should allow 31st day for month %s',
      (month) => {
        expect(() => dateValidator.compile(`2023-${month}-31`)).not.toThrow();
      },
    );

    it.each(['04', '06', '09', '11'])(
      'should allow 30th day for month %s',
      (month) => {
        expect(() => dateValidator.compile(`2023-${month}-30`)).not.toThrow();
      },
    );

    it.each(['04', '06', '09', '11'])(
      'should reject 31st day for month %s',
      (month) => {
        expect(() => dateValidator.compile(`2023-${month}-31`)).toThrow();
      },
    );

    describe('February', () => {
      it('should allow 28th day in non-leap year', () => {
        expect(() => dateValidator.compile('2023-02-28')).not.toThrow();
      });

      it('should reject 29th day in non-leap year', () => {
        expect(() => dateValidator.compile('2023-02-29')).toThrow();
      });
    });
  });
});
