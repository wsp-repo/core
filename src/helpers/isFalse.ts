const falseValues = ['false', '0', 'off'];

/**
 * Проверяет, что значение "эквивалентно" FALSE
 * - boolean-типизированное значение возвращается как есть
 * - сравнение с 'false', '0', 'off'
 */
export function isFalse(value?: unknown): boolean {
  if (typeof value === 'boolean') return value === false;

  const strValue = String(value).toLowerCase().trim();

  return falseValues.includes(strValue);
}
