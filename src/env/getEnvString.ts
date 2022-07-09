import { getEnvValue } from './getEnvValue';

/**
 * Возвращает параметр приведенный к строке
 */
export function getEnvString(
  name: string,
  strictName?: boolean,
): string | undefined {
  const rawValue = getEnvValue(name, strictName);

  if (rawValue === undefined) return undefined;

  return String(rawValue).trim();
}
