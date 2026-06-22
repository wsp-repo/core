const trueValues = ['true', '1', 'on'];

/**
 * Проверяет, что значение "эквивалентно" TRUE
 * - boolean-типизированное значение возвращается как есть
 * - сравнение с 'true', '1', 'on'
 */
export function isTrue(value?: unknown): boolean {
  if (typeof value === 'boolean') return value === true;

  const strValue = String(value).toLowerCase().trim();

  return trueValues.includes(strValue);
}
