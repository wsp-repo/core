import { isDefined } from './isDefined';

/**
 * Проверяет, что значение корректно приводится к числу
 */
export function isNumeric(value?: unknown): boolean {
  return isDefined(value) ? Number.isFinite(Number(value)) : false;
}
