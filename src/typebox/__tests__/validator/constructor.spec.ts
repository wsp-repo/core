import { Type } from '@sinclair/typebox';
import { describe, it, expect } from 'vitest';

import { TypeboxValidator } from '../../validator';

describe('TypeboxValidator - constructor', () => {
  it('should throw TypeError when invalid schema is provided', () => {
    const invalidSchema = { invalid: 'schema' } as any;

    expect(() => new TypeboxValidator(invalidSchema)).toThrow(TypeError);
    expect(() => new TypeboxValidator(invalidSchema)).toThrow(
      'Invalid schema provided',
    );
  });

  it('should accept valid TypeBox schema', () => {
    const validSchema = Type.String();

    expect(() => new TypeboxValidator(validSchema)).not.toThrow();
  });
});
