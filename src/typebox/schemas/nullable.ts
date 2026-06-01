import { TNull, TSchema, TUnion } from '@sinclair/typebox';
import { Type } from '@sinclair/typebox';

/**
 * Создает схему для значения, которое может быть null
 * @param T Схема TypeBox
 * @returns Схему Type.Union([T, Type.Null()])
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export function TNullable<T extends TSchema>(T: T): TUnion<[T, TNull]> {
  return Type.Union([T, Type.Null()]);
}
