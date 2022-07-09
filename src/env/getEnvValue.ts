import { hasProperty } from '../helpers';

/**
 * Отфильтровывает существующие имена переменных окружения
 */
function filterEnvNames(names: string[]): string[] {
  return names.filter((name) => hasProperty(process.env, name));
}

export enum EnvNameType {
  Strict = 'strict',
  Prefix = 'prefix',
}

/**
 * Возвращает имя переменной для использования
 */
export function getEnvName(
  name: string,
  type?: EnvNameType,
): string | undefined {
  if (name.length === 0) return undefined;

  const checkNames: string[] = [];
  const prefix = String(process.env.ENV_PREFIX || '').trim();

  switch (type) {
    case EnvNameType.Prefix:
      checkNames.push(`${prefix}${name}`);
      break;
    case EnvNameType.Strict:
      checkNames.push(name);
      break;
    default:
      checkNames.push(`${prefix}${name}`, name);
      break;
  }

  const [resultName] = filterEnvNames(checkNames);

  return resultName;
}

/**
 * Возвращает значение переменной с учетом указанного типа
 */
export function getEnvValue(
  name: string,
  type?: EnvNameType,
): string | undefined {
  const useName = getEnvName(name, type);

  return useName ? process.env[useName] : undefined;
}
