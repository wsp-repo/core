import { getEnvValue } from './getEnvValue';

// константы допустимых значений для маппинга
const TRUE_VALUES = ['1', 'true', 't', 'on', 'enable', 'enabled'];
const FALSE_VALUES = ['0', 'false', 'f', 'off', 'disable', 'disabled'];

/**
 * Возвращает параметр приведенный к строке
 */
export function getEnvBoolean(
  name: string,
  strictName?: boolean,
): boolean | undefined {
  const rawValue = getEnvValue(name, strictName);

  if (rawValue === undefined) return undefined;

  const value = String(rawValue).trim().toLowerCase();

  if (FALSE_VALUES.includes(value)) return false;

  if (TRUE_VALUES.includes(value)) return true;

  return undefined;
}
