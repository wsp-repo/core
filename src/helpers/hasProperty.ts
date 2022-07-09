/**
 * Проверяет наличие свойства у объекта
 */
export function hasProperty(obj: unknown, name: string): boolean {
  return Object.prototype.hasOwnProperty.bind(obj)(name);
}
