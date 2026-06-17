/* eslint-disable @typescript-eslint/no-magic-numbers */

/**
 * Возвращает строку типа значения
 * !Внимание! Результат всегда в LowerCase
 */
export function getType(value: unknown): string {
  if (value === null) return 'null';

  if (Array.isArray(value)) return 'array';

  if (typeof value !== 'object') {
    return typeof value;
  }

  const strType = Object.prototype.toString.call(value);

  // из формата [object TYPE] нужен только тип
  return strType.slice(8, -1).toLowerCase();
}
