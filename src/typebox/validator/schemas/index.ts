import { TypeRegistry } from '@sinclair/typebox';

import type { TStringEnum } from './stringEnum';
import type { TStringUnion } from './stringUnion';

// регистрация кастомных схем в TypeBox
TypeRegistry.Set(
  'TStringEnum',
  (schema: TStringEnum<Record<string, string>>, value: unknown) => {
    return typeof value === 'string' && schema.enum.includes(value);
  },
);
TypeRegistry.Set(
  'TStringUnion',
  (schema: TStringUnion<readonly string[]>, value: unknown) => {
    return typeof value === 'string' && schema.enum.includes(value);
  },
);
