import { CoreError } from '../errors';
import { getObjectFields } from './getObjectFields';
import { getPreciseType } from './getPreciseType';
import { isDefined } from './isDefined';
import { isFunction } from './isFunction';
import { isPrimitive } from './isPrimitive';
import { isUndefined } from './isUndefined';

import {
  AnyObject,
  JsonArray,
  JsonObject,
  JsonPrimitive,
  JsonValue,
} from '../types';

export type ToJsonOptions = {
  circularAction: 'skip' | 'throw';
  regexpAction: 'skip' | 'string';
  symbolAction: 'skip' | 'string';
  trimArrayUndefined: boolean;
};

type State = { path: string; seen: WeakMap<object, string> };
type Converter = (
  source: unknown,
  state: State,
  options: ToJsonOptions,
) => JsonValue | undefined;

const converters: Record<string, Converter> = {
  array: convertArray,
  bigint: convertBigInt,
  date: convertDate,
  map: convertMap,
  number: convertNumber,
  regexp: convertRegExp,
  set: convertSet,
  symbol: convertSymbol,
};

const defaultOptions: ToJsonOptions = {
  circularAction: 'throw',
  regexpAction: 'skip',
  symbolAction: 'skip',
  trimArrayUndefined: false,
};

export function toJsonObject<T extends JsonValue = JsonValue>(
  value: unknown,
  options?: Partial<ToJsonOptions>,
): T | undefined {
  const state = { path: '$', seen: new WeakMap<object, string>() };
  const useOptions = { ...defaultOptions, ...options };

  return convert(value, state, useOptions) as T;
}

function convert(
  value: unknown,
  state: State,
  options: ToJsonOptions,
): JsonValue | undefined {
  if (ignoredNode(value)) return undefined;

  const source = value as object;
  const preciseType = getPreciseType(value);
  const valueIsPrimitive = isPrimitive(value);

  if (!valueIsPrimitive) {
    const seenPath = state.seen.get(source);

    if (isDefined(seenPath)) {
      if (options.circularAction === 'skip') return undefined;

      throw createCircularError(seenPath, state.path);
    }

    if (hasMethodToJSON(source)) {
      state.seen.set(source, state.path);
      const jsonValue = source.toJSON();

      if (jsonValue === source) {
        state.seen.delete(source);
      } else {
        const result = convert(jsonValue, state, options);

        state.seen.delete(source);

        return result;
      }
    }
  }

  const typeConverter = converters[preciseType];

  if (typeConverter) {
    return typeConverter(value, state, options);
  }

  if (valueIsPrimitive) return value as JsonPrimitive;

  return convertObject(source, state, options);
}

/**
 * Конвертирует значение типа 'object'
 */
function convertObject(
  source: object,
  state: State,
  options: ToJsonOptions,
): JsonObject {
  state.seen.set(source, state.path);
  const result: JsonObject = {};
  const keys = getObjectFields(source) ?? [];

  for (let index = 0; index < keys.length; index += 1) {
    const key = String(keys[index]);
    const converted = convert(
      (source as AnyObject)[key],
      pathState(state, key),
      options,
    );

    if (isDefined(converted)) result[key] = converted;
  }

  state.seen.delete(source);

  return result;
}

/**
 * Конвертирует значение типа 'map'
 */
function convertMap(
  source: unknown,
  state: State,
  options: ToJsonOptions,
): JsonObject {
  const result: JsonObject = {};
  const objectSource = source as object;

  state.seen.set(objectSource, state.path);

  (source as Map<unknown, unknown>).forEach((item, key) => {
    const converted = convert(item, pathState(state, String(key)), options);

    if (isDefined(converted)) {
      result[String(key)] = converted;
    }
  });

  state.seen.delete(objectSource);

  return result;
}

/**
 * Конвертирует значение типа 'set'
 */
function convertSet(
  source: unknown,
  state: State,
  options: ToJsonOptions,
): JsonArray {
  const result: JsonArray = [];
  const objectSource = source as object;

  state.seen.set(objectSource, state.path);

  let index = 0;
  (source as Set<unknown>).forEach((item) => {
    const converted = convert(item, pathState(state, index), options);

    if (isDefined(converted) || !options.trimArrayUndefined) {
      result.push(converted);
    }

    index += 1;
  });

  state.seen.delete(objectSource);

  return result;
}

/**
 * Конвертирует значение типа 'array'
 */
function convertArray(
  source: unknown,
  state: State,
  options: ToJsonOptions,
): JsonArray {
  const result: JsonArray = [];
  const array = source as unknown[];
  const objectSource = source as object;

  state.seen.set(objectSource, state.path);

  for (let index = 0; index < array.length; index += 1) {
    const converted = convert(array[index], pathState(state, index), options);

    if (isDefined(converted) || !options.trimArrayUndefined) {
      result.push(converted);
    }
  }

  state.seen.delete(objectSource);

  return result;
}

/**
 * Конвертирует значение типа 'date'
 */
function convertDate(source: unknown): JsonPrimitive {
  return (source as Date).toISOString();
}

/**
 * Конвертирует значение типа 'bigint'
 */
function convertBigInt(source: unknown): JsonPrimitive {
  return (source as bigint).toString();
}

/**
 * Конвертирует значение типа 'number'
 */
function convertNumber(source: unknown): JsonPrimitive {
  const value = source as number;

  return Number.isFinite(value) ? value : null;
}

/**
 * Конвертирует значение типа 'regexp'
 */
function convertRegExp(
  source: unknown,
  _state: State,
  options: ToJsonOptions,
): JsonPrimitive | undefined {
  if (options.regexpAction === 'skip') return undefined;

  return String(source);
}

/**
 * Конвертирует значение типа 'symbol'
 */
function convertSymbol(
  source: unknown,
  _state: State,
  options: ToJsonOptions,
): JsonPrimitive | undefined {
  if (options.symbolAction === 'skip') return undefined;

  return String(source);
}

/**
 * Возвращает флаг наличия метода toJSON()
 */
function hasMethodToJSON(value: object): value is { toJSON: () => unknown } {
  return isFunction((value as { toJSON?: unknown }).toJSON);
}

/**
 * Возвращает текст ошибки циклической ссылки
 */
function createCircularError(
  sourcePath: string,
  circularPath: string,
): CoreError {
  return new CoreError(
    [
      'Cannot convert circular structure to JSON',
      `source path "${sourcePath}"`,
      `circular path "${circularPath}"`,
    ].join(', '),
    { sourcePath, circularPath },
  );
}

/**
 * Возвращает State для дочерней ноды
 */
function pathState(state: State, key: number | string): State {
  return { seen: state.seen, path: `${state.path}.${String(key)}` };
}

/**
 * Возвращает флаг игнорирования ноды для перевода
 */
function ignoredNode(value: unknown): boolean {
  return isUndefined(value) || isFunction(value);
}
