import { EnvNameType, getEnvValue } from './getEnvValue';

/**
 * Возвращает параметр приведенный к числу
 */
export function getEnvNumber(
  name: string,
  type?: EnvNameType,
): number | undefined {
  const rawValue = getEnvValue(name, type);

  if (rawValue === undefined) return undefined;

  const value = Number(rawValue.trim());

  return Number.isNaN(value) ? undefined : value;
}
