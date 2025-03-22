/**
 * Переводит строку в формат camelCase
 */
export function camelCase(value: string): string {
  if (value.length === 0) return value;

  // prettier-ignore
  const result = value.replace(/^_+/, '')
    .replace(/_+(.)/g, (_, m) => m.toUpperCase());

  // prettier-ignore
  return /^[A-Z0-9]+$/.test(result)
    ? result.toLowerCase()
    : result;
}
