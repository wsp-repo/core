/**
 * Возвращает строку "типа" значения
 */
export function getType(value: unknown): string {
  const strType = Object.prototype.toString.call(value);

  // из формата [object TYPE] нужен только тип
  return strType.slice(8, -1).toLowerCase();
}

/**
 * Проверяет, что значение неопределено
 */
export function isUndefined(value?: unknown): value is undefined {
  return value === undefined;
}

/**
 * Проверяет, что значение определено
 */
export function isDefined<T>(value?: T): value is T {
  return value !== undefined;
}

/**
 * Проверяет, что значение object
 */
export function isObject<T extends object>(value?: unknown): value is T {
  return Boolean(value) && getType(value) === 'object';
}

/**
 * Проверяет, что значение string
 */
export function isString(value?: unknown): value is string {
  return Boolean(value) && getType(value) === 'string';
}

/**
 * Проверяет, что значение array
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isArray<T = any>(value?: unknown): value is T[] {
  return Boolean(value) && getType(value) === 'array';
}

/**
 * Проверяет, что значение является функцией
 */
export function isFunction<T>(value?: unknown): value is T {
  return Boolean(value) && getType(value) === 'function';
}

/**
 * Проверяет, что значение пустое
 */
export function isEmpty(value: unknown): boolean {
  if (isString(value) || isArray(value)) {
    return value.length === 0;
  }

  if (value && isObject(value)) {
    return Object.keys(value).length === 0;
  }

  return value !== null;
}

const trueValues = ['true', '1', 'on'];

/**
 * Проверяет, что значение "эквивалентно" TRUE
 * - boolean-типизированное значение возвращается как есть
 * - значение-функция возвращает вызов этой функции
 * - объект или массив должны быть "непустыми"
 * - сравнение с 'true', '1', 'on'
 */
export function isTrue(value?: unknown): boolean {
  if (getType(value) === 'boolean') return Boolean(value);

  if (isFunction<() => boolean>(value)) return value();

  const isComplex = isArray(value) || isObject(value);

  if (isComplex && !isEmpty(value)) return true;

  const strValue = String(value).toLowerCase().trim();

  return trueValues.includes(strValue);
}
