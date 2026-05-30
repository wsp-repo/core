/**
 * Переводит строку в формат snake_case
 */
export function snakeCase(value: string): string {
  if (value.length === 0) return value;

  const result = value
    .replace(/_*([A-Z]+|\d+)/g, '_$1')
    .toLowerCase()
    .trim();

  return result[0] === '_' && value[0] !== '_'
    ? result.replace(/^_+/, '')
    : result;
}
