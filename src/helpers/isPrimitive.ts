/**
 * Проверяет, что значение определено и является примитивом
 */
export function isPrimitive(value?: unknown): boolean {
  const typeValue = typeof value;

  // быстрее, чем Array.includes()
  return (
    value === null ||
    typeValue === 'string' ||
    typeValue === 'number' ||
    typeValue === 'boolean' ||
    typeValue === 'bigint'
  );
}
