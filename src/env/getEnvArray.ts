import { getEnvValue } from './getEnvValue';

/**
 * Возвращает параметр приведенный к массиву строк
 */
export function getEnvArray(
  name: string,
  splitter: RegExp | string = / +/,
  strictName?: boolean,
): string[] | undefined {
  const rawValue = getEnvValue(name, strictName);

  if (rawValue === undefined) return undefined;

  return String(rawValue).trim().split(splitter);
}
