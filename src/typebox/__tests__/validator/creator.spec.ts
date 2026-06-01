import { Type } from '@sinclair/typebox';
import { describe, it, expect } from 'vitest';

import { createValidator } from '../../validator';

describe('Typebox - фабрика валидатора [createValidator(...)]', () => {
  it('should throw TypeError when invalid schema is provided', () => {
    const invalidSchema = { invalid: 'schema' } as any;

    expect(() => createValidator(invalidSchema)).toThrow(TypeError);
    expect(() => createValidator(invalidSchema)).toThrow(
      'Invalid schema provided',
    );
  });

  it('should accept valid TypeBox schema', () => {
    const validSchema = Type.String();

    expect(() => createValidator(validSchema)).not.toThrow();
  });
});
