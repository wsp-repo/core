import { getEnvValue } from './getEnvValue';

/**
 * Возвращает параметр приведенный к числу
 */
export function getEnvNumber(
  name: string,
  strictName?: boolean,
): number | undefined {
  const rawValue = getEnvValue(name, strictName);

  if (rawValue === undefined) return undefined;

  const value = Number(rawValue.trim());

  return Number.isNaN(value) ? undefined : value;
}
