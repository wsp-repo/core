import { EnvNameType, getEnvValue } from './getEnvValue';

/**
 * Возвращает параметр приведенный к строке
 */
export function getEnvString(
  name: string,
  type?: EnvNameType,
): string | undefined {
  const rawValue = getEnvValue(name, type);

  if (rawValue === undefined) return undefined;

  return String(rawValue).trim();
}
