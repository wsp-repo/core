import type { Static } from '@sinclair/typebox';
import { Type } from '@sinclair/typebox';
import { describe, it, expect } from 'vitest';

import { TypeboxValidator } from '../../validator';

const testSchema = Type.Object(
  {
    string: Type.String({
      description: 'Имя файла из Storage Service',
      maxLength: 255,
      minLength: 10,
    }),
  },
  {
    additionalProperties: false,
    description: 'Тестовая схема',
  },
);

type TestType = Static<typeof testSchema>;

const successValue: TestType = {
  string: '123456789012345',
};

const errorValue: TestType = {
  string: '12345',
};

describe('TypeboxValidator - check', () => {
  it('Create typebox validator', () => {
    expect(new TypeboxValidator(testSchema)).toBeDefined();
  });

  it('Success validate', () => {
    const validator = new TypeboxValidator(testSchema);

    expect(validator.compile(successValue)).toEqual(successValue);
  });

  it('Error fixed options', () => {
    const validator = new TypeboxValidator(testSchema);

    expect(() => validator.compile(errorValue)).toThrow();
  });
});
