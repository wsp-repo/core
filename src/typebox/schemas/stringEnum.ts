import { SchemaOptions, TSchema, Kind  } from '@sinclair/typebox';

export interface TStringEnum<T extends Record<string, string>> extends TSchema {
  enum: T[keyof T][];
  [Kind]: 'TStringEnum';
  static: T[keyof T];
  type: 'string';
}

/**э
 * Создает схему для строковых enum'ов
 * @param enumObj Объект перечисления
 * @param options Опции схемы
 * @returns Схему TStringEnum (добавляет enum в json-схему)
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export function TStringEnum<T extends Record<string, string>>(
  enumObj: T,
  options: SchemaOptions = {},
): TStringEnum<T> {
  /*_ Получаем значения enum _*/
  return {
    [Kind]: 'TStringEnum',
    enum: Object.values(enumObj),
    type: 'string',
    ...options,
  } as TStringEnum<T>;
}
