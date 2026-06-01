import { SchemaOptions, TSchema } from '@sinclair/typebox';
import { Kind } from '@sinclair/typebox';

export interface TStringUnion<T extends readonly string[]> extends TSchema {
  enum: T;
  [Kind]: 'TStringUnion';
  static: T[number];
  type: 'string';
}

/**
 * Создает схему для строкового union из массива значений (литеральный перечень строк).
 * Используй вместо `TStringEnum`, когда значения заданы массивом, а не TS-enum объектом.
 *
 * @example
 * // enum из массива строк
 * TStringUnion(['a', 'b', 'c'])
 *
 * // в отличие от TStringEnum, который принимает объект:
 * TStringEnum(MyEnum)
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export function TStringUnion<T extends string[]>(
  values: [...T],
  options?: SchemaOptions,
): TStringUnion<T> {
  return {
    [Kind]: 'TStringUnion',
    ...options,
    enum: values,
    type: 'string',
  } as TStringUnion<T>;
}
