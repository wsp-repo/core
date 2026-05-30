/* eslint-disable @typescript-eslint/no-magic-numbers */

/**
 * Возвращает строку "типа" значения
 */
export function getType(value: unknown): string {
  const strType = Object.prototype.toString.call(value);

  // из формата [object TYPE] нужен только тип
  return strType.slice(8, -1).toLowerCase();
}
