import { Type } from '@sinclair/typebox';
import { describe, it, expect } from 'vitest';

import { TypeboxValidator } from '../../validator';

import { AnyObject } from '../../../types';
import { TypeboxError } from '../../types';

describe('Typebox - ошибки валидации [TypeboxError]', () => {
  const schema = Type.Object({
    age: Type.Number({ maximum: 120, minimum: 0 }),
    name: Type.String({ minLength: 3 }),
  });

  it('should throw TypeboxError on validation failure', () => {
    const validator = new TypeboxValidator(schema);

    expect(() =>
      validator.compile({
        age: -1, // неверно
        name: 'Jo', // слишком короткое
      }),
    ).toThrow(TypeboxError);
  });

  it('should throw TypeboxValidationError with correct message and details', () => {
    const validator = new TypeboxValidator(schema);
    const invalidAge = 150;

    let thrownError!: TypeboxError;

    try {
      validator.compile({
        age: invalidAge, // слишком большое
        name: 'Jo', // слишком короткое
      });
    } catch (error) {
      thrownError = error as TypeboxError;
    }

    expect(thrownError).toBeInstanceOf(TypeboxError);
    expect(thrownError.message).toBe('Ошибка валидации');
    expect(thrownError.details).toBeDefined();
    expect(thrownError.details?.length).toBeGreaterThan(0);

    // Проверяем, что есть ошибки для обоих полей
    const hasAgeError = thrownError.details?.some(
      (detail) => detail.path && detail.path.includes('/age'),
    );
    const hasNameError = thrownError.details?.some(
      (detail) => detail.path && detail.path.includes('/name'),
    );

    expect(hasAgeError).toBe(true);
    expect(hasNameError).toBe(true);

    // Проверяем, что детали содержат ожидаемые свойства
    const ageDetail = thrownError.details?.find(
      (detail) => detail.path && detail.path.includes('/age'),
    ) as AnyObject;
    expect(ageDetail).toBeDefined();
    expect(ageDetail.message).toBeDefined();
    expect(ageDetail.path).toBeDefined();
    expect(ageDetail.value).toBe(invalidAge);
  });

  it('should handle unknown validation error message when no errors provided', () => {
    const error = new TypeboxError();

    expect(error.message).toBe('Неизвестная ошибка валидации');
    expect(error.details).toBeDefined();
    expect(error.details).toHaveLength(1);
    expect(error.details?.[0].message).toBe('Неизвестная ошибка валидации');
  });

  it('should handle custom details when no valueOf errors provided', () => {
    const customDetails = [
      { message: 'Custom error 1', path: '/custom1' },
      { message: 'Custom error 2', path: '/custom2' },
    ];
    const error = new TypeboxError([], customDetails);

    expect(error.message).toBe('Неизвестная ошибка валидации');
    expect(error.details).toEqual(customDetails);
  });

  it('should handle errors during encode phase', () => {
    // Создаем схему с encode, которая вызовет ошибку
    const problematicSchema = Type.Transform(Type.String())
      .Decode((value: string) => value)
      .Encode((value: string) => {
        if (value === 'trigger-error') {
          throw new Error('Encode phase error');
        }

        return value.toLowerCase();
      });

    const validator = new TypeboxValidator(problematicSchema, {
      encode: true,
    });

    let thrownError!: TypeboxError;

    try {
      validator.compile('trigger-error');
    } catch (error) {
      thrownError = error as TypeboxError;
    }

    expect(thrownError).toBeInstanceOf(TypeboxError);
    expect(thrownError.message).toBe('Неизвестная ошибка валидации');
    expect(thrownError.details).toBeDefined();
    expect(thrownError.details).toHaveLength(1);
    expect(thrownError.details?.[0].message).toBe('Encode phase error');
    expect(thrownError.errors).toEqual([]); // Нет ошибок ValueError, только обёрнутая ошибка
  });

  it('should handle errors during decode phase', () => {
    // Создаем схему с decode, которая вызовет ошибку
    const problematicSchema = Type.Transform(Type.String())
      .Decode((value: string) => {
        if (value === 'trigger-decode-error') {
          throw new Error('Decode phase error');
        }

        return value.toUpperCase();
      })
      .Encode((value: string) => value);

    const validator = new TypeboxValidator(problematicSchema, {
      decode: true,
    });

    let thrownError!: TypeboxError;

    try {
      validator.compile('trigger-decode-error');
    } catch (error) {
      thrownError = error as TypeboxError;
    }

    expect(thrownError).toBeInstanceOf(TypeboxError);
    expect(thrownError.message).toBe('Неизвестная ошибка валидации');
    expect(thrownError.details).toBeDefined();
    expect(thrownError.details).toHaveLength(1);
    expect(thrownError.details?.[0].message).toBe('Decode phase error');
  });

  it('should handle Union type errors and filter duplicates', () => {
    const unionSchema = Type.Object({
      value: Type.Union([
        Type.Object({ data: Type.String(), type: Type.Literal('string') }),
        Type.Object({ data: Type.Number(), type: Type.Literal('number') }),
      ]),
    });

    const validator = new TypeboxValidator(unionSchema);

    let thrownError!: TypeboxError;

    try {
      validator.compile({
        value: { data: 'test', type: 'invalid' }, // неверный тип union
      });
    } catch (error) {
      thrownError = error as TypeboxError;
    }

    expect(thrownError).toBeInstanceOf(TypeboxError);
    expect(thrownError.message).toBe('Ошибка валидации');
    expect(thrownError.details).toBeDefined();

    // Должна быть ошибка Union с фильтрацией пути
    const unionError = thrownError.details?.find(
      (detail) => detail.path && detail.path.includes('/value'),
    );
    expect(unionError).toBeDefined();
  });
});
