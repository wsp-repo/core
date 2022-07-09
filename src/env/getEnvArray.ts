import { EnvNameType, getEnvValue } from './getEnvValue';

/**
 * Возвращает параметр приведенный к массиву строк
 */
export function getEnvArray(
  name: string,
  splitter: RegExp | string = / +/,
  type?: EnvNameType,
): string[] | undefined {
  const rawValue = getEnvValue(name, type);

  if (rawValue === undefined) return undefined;

  return String(rawValue)
    .split(splitter)
    .map((v) => v.trim())
    .filter(Boolean);
}
