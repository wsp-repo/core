/**
 * Проверяет наличие свойства у объекта
 */
export function hasProperty(obj: unknown, name: string): boolean {
  return Boolean(Object.prototype.hasOwnProperty.bind(obj, name));
}
