import { Type } from '@sinclair/typebox';
import { describe, it, expect } from 'vitest';

import { TypeboxValidator } from '../../validator';

import { TFormats } from '../../types';

describe('Typebox - проверка формата [TFormats.Time]', () => {
  const timeValidator = new TypeboxValidator(
    Type.String({ format: TFormats.Time }),
  );

  it.each([
    '00:00:00',
    '12:30:45',
    '23:59:59',
    '23:59:60', // поддержка добавочной секунды
    '09:15:30',
    '01:00:00',
    '12:00:00.000',
    '15:30:45.123',
    '23:59:59.999',
    '00:00:00.000',
  ])('should validate correct time string: %s', (time) => {
    expect(() => timeValidator.compile(time)).not.toThrow();
    expect(timeValidator.compile(time)).toBe(time);
  });

  it.each([
    '25:00:00', // неверный час
    '12:60:00', // неверная минута
    '12:30:60', // неверная секунда
    '24:00:00', // час 24 не валиден
    '12:30', // неполное время
    '12:30:45:123', // лишняя часть
    '12:30:45.1234', // слишком много цифр миллисекунд
    '1:30:45', // отсутствует ведущий ноль для часа
    '12:3:45', // отсутствует ведущий ноль для минуты
    '12:30:4', // отсутствует ведущий ноль для секунды
    '',
    'not-a-time',
    '12:30:45.', // конечная точка без миллисекунд
    '-12:30:45', // отрицательный час
    '12:-30:45', // отрицательная минута
    '12:30:-45', // отрицательная секунда
  ])('should reject invalid time string: %s', (time) => {
    expect(() => timeValidator.compile(time)).toThrow();
  });

  describe('edge cases', () => {
    it.each([
      '00:00:00', // начало дня
      '23:59:59', // конец дня
    ])('should validate boundary time: %s', (time) => {
      expect(() => timeValidator.compile(time)).not.toThrow();
    });

    it.each([
      '24:00:00', // не валиден в 24-часовом формате
      '23:60:00', // неверная минута
    ])('should reject boundary invalid time: %s', (time) => {
      expect(() => timeValidator.compile(time)).toThrow();
    });
  });

  describe('milliseconds validation', () => {
    it.each([
      '12:30:45.0',
      '12:30:45.00',
      '12:30:45.000',
      '12:30:45.1',
      '12:30:45.12',
      '12:30:45.123',
      '12:30:45.999',
    ])('should validate time with milliseconds: %s', (time) => {
      expect(() => timeValidator.compile(time)).not.toThrow();
    });

    it.each([
      '12:30:45.1234', // слишком много цифр
      '12:30:45.12345', // слишком много цифр
      '12:30:45.a', // не числовое
      '12:30:45..123', // двойная точка
    ])('should reject invalid milliseconds format: %s', (time) => {
      expect(() => timeValidator.compile(time)).toThrow();
    });
  });
});
