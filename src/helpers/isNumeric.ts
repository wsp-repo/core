import { toNumber } from './toNumber';

/**
 * Проверяет, что значение корректно приводится к числу
 */
export function isNumeric(value?: unknown, emptyIsNaN?: boolean): boolean {
  return Number.isFinite(toNumber(value, emptyIsNaN));
}
