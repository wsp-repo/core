import { Type } from '@sinclair/typebox';
import { describe, it, expect } from 'vitest';

import { TypeboxValidator } from '../../validator';

describe('Typebox - опции по умолчанию [TypeboxOptions]', () => {
  const schema = Type.Object({
    age: Type.Number(),
    extra: Type.Optional(Type.String()),
    name: Type.String({ default: 'John' }),
  });

  it('should use default options when none provided', () => {
    const validator = new TypeboxValidator(schema);

    // Опции по умолчанию: { clean: true, convert: false, decode: false, defaults: true, encode: false }
    const result = validator.compile({
      age: 25,
      unwantedProperty: 'should be removed', // будет удалено
    });

    expect(result).toEqual({
      age: 25,
      name: 'John', // применено значение по умолчанию
      // unwantedProperty удалено при очистке
    });
  });

  it('should apply defaults correctly', () => {
    const validator = new TypeboxValidator(schema);

    const testAge = 30;
    const result = validator.compile({ age: testAge });

    expect(result.name).toBe('John');
    expect(result.age).toBe(testAge);
  });
});
