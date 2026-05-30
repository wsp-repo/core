import { Type } from '@sinclair/typebox';
import { describe, it, expect } from 'vitest';

import { TypeboxValidator } from '../../validator';

import { TypeboxValidationError } from '../../types';

describe('TypeboxValidator - options param behaviour', () => {
  describe('clean option', () => {
    const schema = Type.Object(
      {
        age: Type.Number(),
        name: Type.String(),
      },
      {
        additionalProperties: false,
      },
    );

    it('should remove additional properties when clean is true', () => {
      const validator = new TypeboxValidator(schema, { clean: true });

      const result = validator.compile({
        age: 25,
        extraProperty: 'should be removed',
        name: 'John',
      });

      expect(result).toEqual({ age: 25, name: 'John' });
      expect(result).not.toHaveProperty('extraProperty');
    });

    it('should keep additional properties when clean is false', () => {
      const validator = new TypeboxValidator(schema, { clean: false });

      // Должно не пройти валидацию, если additionalProperties: false
      expect(() =>
        validator.compile({
          age: 25,
          extraProperty: 'should cause error',
          name: 'John',
        }),
      ).toThrow(TypeboxValidationError);
    });
  });

  describe('defaults option', () => {
    const schema = Type.Object({
      age: Type.Number(),
      city: Type.Optional(Type.String({ default: 'DefaultCity' })),
      name: Type.String({ default: 'DefaultName' }),
    });

    it('should apply defaults when defaults is true', () => {
      const validator = new TypeboxValidator(schema, { defaults: true });

      const result = validator.compile({ age: 25 });

      expect(result.name).toBe('DefaultName');
      expect(result.city).toBe('DefaultCity');
    });

    it('should not apply defaults when defaults is false', () => {
      const validator = new TypeboxValidator(schema, { defaults: false });

      // Должно не пройти валидацию, так как name обязательно, но значение по умолчанию не применено
      expect(() => validator.compile({ age: 25 })).toThrow(
        TypeboxValidationError,
      );
    });
  });

  describe('convert option', () => {
    const schema = Type.Object({
      age: Type.Number(),
      isActive: Type.Boolean(),
    });

    it('should convert compatible types when convert is true', () => {
      const validator = new TypeboxValidator(schema, { convert: true });

      const result = validator.compile({
        age: '25', // строка в число
        isActive: 'true', // строка в булево
      });

      expect(result.age).toBe(25);
      expect(typeof result.age).toBe('number');
      expect(result.isActive).toBe(true);
      expect(typeof result.isActive).toBe('boolean');
    });

    it('should not convert types when convert is false', () => {
      const validator = new TypeboxValidator(schema, { convert: false });

      expect(() =>
        validator.compile({
          age: '25', // должно не пройти - строка вместо числа
          isActive: true,
        }),
      ).toThrow(TypeboxValidationError);
    });
  });

  describe('encode/decode options', () => {
    // Создаем схему с трансформацией для демонстрации encode/decode
    const schema = Type.Transform(Type.String())
      .Decode((value: string) => value.toUpperCase()) // decode: преобразование в верхний регистр
      .Encode((value: string) => value.toLowerCase()); // encode: преобразование в нижний регистр

    it('should apply encode transformation when encode is true', () => {
      const validator = new TypeboxValidator(schema, {
        decode: false,
        encode: true,
      });

      const result = validator.compile('HELLO');

      expect(result).toBe('hello'); // encoded (нижний регистр)
    });

    it('should apply decode transformation when decode is true', () => {
      const validator = new TypeboxValidator(schema, {
        decode: true,
        encode: false,
      });

      const result = validator.compile('hello');

      expect(result).toBe('HELLO'); // decoded (верхний регистр)
    });

    it('should apply both encode and decode in correct order', () => {
      const validator = new TypeboxValidator(schema, {
        decode: true,
        encode: true,
      });

      // Порядок: сначала encode, затем валидация, затем decode
      const result = validator.compile('HELLO');

      expect(result).toBe('HELLO'); // закодировано в 'hello', провалидировано, затем раскодировано в 'HELLO'
    });

    it('should not apply transformations when both are false', () => {
      const validator = new TypeboxValidator(schema, {
        decode: false,
        encode: false,
      });

      const result = validator.compile('Hello');

      expect(result).toBe('Hello'); // без трансформации
    });
  });
});
