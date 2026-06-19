import { getObjectFields } from './getObjectFields';
import { getPreciseType } from './getPreciseType';
import { isFunction } from './isFunction';
import { isPrimitive } from './isPrimitive';
import { isUndefined } from './isUndefined';

import { AnyObject } from '../types';

type State = { seen: WeakMap<object, unknown> };
type ObjectWithClone = { clone: () => unknown };
type Converter = (source: unknown, state: State) => unknown;

const converters: Record<string, Converter> = {
  array: cloneArray,
  date: cloneDate,
  function: cloneFunction,
  map: cloneMap,
  regexp: cloneRegExp,
  set: cloneSet,
  symbol: cloneSymbol,
};

/**
 * Ввыполняет глубокое клонирование переданной сущности
 */
export function deepClone<T>(value: T): T {
  const state = { seen: new WeakMap<object, unknown>() };

  return clone(value, state) as T;
}

/**
 * Рекурсивное ядро процесса клонирования
 */
function clone(value: unknown, state: State): unknown {
  if (isUndefined(value)) return value;

  const source = value as object;
  const preciseType = getPreciseType(value);
  const valueIsPrimitive = isPrimitive(value);

  if (!valueIsPrimitive && !isFunction(value)) {
    const seenClone = state.seen.get(source);

    if (seenClone) return seenClone;

    if (hasMethodClone(source)) {
      return source.clone();
    }
  }

  const typeConverter = converters[preciseType];

  if (typeConverter) {
    return typeConverter(value, state);
  }

  if (valueIsPrimitive) return value;

  return cloneObject(source, state);
}

/**
 * Клонирует значение типа 'object'
 */
function cloneObject(source: object, state: State): unknown {
  const result: AnyObject = {};

  state.seen.set(source, result);

  const keys = getObjectFields(source) ?? [];

  for (let index = 0; index < keys.length; index += 1) {
    const key = String(keys[index]);

    result[key] = clone((source as AnyObject)[key], state);
  }

  return result;
}

/**
 * Клонирует значение типа 'map'
 */
function cloneMap(source: unknown, state: State): Map<unknown, unknown> {
  const result = new Map<unknown, unknown>();
  const sourceAsMap = source as Map<unknown, unknown>;

  state.seen.set(sourceAsMap, result);

  sourceAsMap.forEach((item, key) => {
    const clonedKey = clone(key, state);
    const clonedValue = clone(item, state);

    result.set(clonedKey, clonedValue);
  });

  return result;
}

/**
 * Клонирует значение типа 'set'
 */
function cloneSet(source: unknown, state: State): Set<unknown> {
  const result = new Set<unknown>();
  const sourceAsSet = source as Set<unknown>;

  state.seen.set(sourceAsSet, result);

  sourceAsSet.forEach((item) => {
    result.add(clone(item, state));
  });

  return result;
}

/**
 * Клонирует значение типа 'array'
 */
function cloneArray(source: unknown, state: State): unknown[] {
  const result: unknown[] = [];
  const sourceAsArray = source as unknown[];

  state.seen.set(sourceAsArray, result);

  for (let index = 0; index < sourceAsArray.length; index += 1) {
    result.push(clone(sourceAsArray[index], state));
  }

  return result;
}

/**
 * Клонирует значение типа 'date'
 */
function cloneDate(source: unknown): Date {
  return new Date((source as Date).getTime());
}

/**
 * Клонирует значение типа 'function'
 */
function cloneFunction(source: unknown): unknown {
  return source;
}

/**
 * Клонирует значение типа 'regexp'
 */
function cloneRegExp(source: unknown): RegExp {
  const regexp = source as RegExp;

  return new RegExp(regexp.source, regexp.flags);
}

/**
 * Клонирует значение типа 'symbol'
 */
function cloneSymbol(source: unknown): unknown {
  return source;
}

/**
 * Возвращает флаг наличия метода clone()
 */
function hasMethodClone(value: object): value is ObjectWithClone {
  return isFunction((value as { clone?: unknown }).clone);
}
