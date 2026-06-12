import { isEmpty } from './isEmpty';
import { isNumber } from './isNumber';

/**
 * Приводит значение к числу с возможностью управления как обарабывать пустые значения
 */
export function toNumber(value?: unknown, emptyAsNaN = false): number {
  if (isNumber(value)) return value;

  if (emptyAsNaN && isEmpty(value, true)) {
    return Number.NaN;
  }

  return Number(value);
}
