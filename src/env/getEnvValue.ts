/**
 * Возвращает значение переменной с учетом наличия префикса
 */
export function getEnvValue(
  name: string,
  strictName = false,
): string | undefined {
  if (name.length === 0) return undefined;

  const strictValue = process.env[name];

  if (strictName) return strictValue;

  const prefix = process.env.ENV_PREFIX || '';
  const prefixValue = process.env[`${prefix}${name}`];

  return prefixValue || strictValue === undefined ? prefixValue : strictValue;
}
