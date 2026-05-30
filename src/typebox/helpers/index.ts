import type { TypeboxValidationOptions } from '../types';

/**
 * Хелпер для добавления опции конвертации
 */
export function addConvert(
  options?: TypeboxValidationOptions,
): TypeboxValidationOptions {
  return { convert: true, ...options };
}
