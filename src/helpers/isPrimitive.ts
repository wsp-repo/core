const primitiveTypes = new Set([
  'string',
  'number',
  'boolean',
  'bigint',
  'symbol',
]);

/**
 * Проверяет, что значение определено и является примитивом
 */
export function isPrimitive(value?: unknown): boolean {
  return value === null || primitiveTypes.has(typeof value);
}
