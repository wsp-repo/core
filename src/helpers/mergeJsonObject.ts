import { JsonArray, JsonObject, JsonResult, JsonValue } from '../types';

export enum MergeJsonArray {
  Append = 'append',
  Merge = 'merge',
  Replace = 'replace',
  Rewrite = 'rewrite',
}

export type MergeJsonArrayCustom = (
  target: JsonArray,
  source: JsonArray,
  options: MergeJsonObjectOptions,
) => JsonArray;

export type MergeJsonObjectOptions = {
  mergeArray?: MergeJsonArray | MergeJsonArrayCustom;
  mergePath?: string;
  mutate?: boolean;
};

type Options = {
  mergeArray: MergeJsonArray | MergeJsonArrayCustom;
  mergePath?: string;
  mutate: boolean;
};

/**
 * Выполняет глубокое объединение JSON-объектов
 */
export function mergeJsonObject(
  target: JsonObject,
  source: JsonObject,
  options?: MergeJsonObjectOptions,
): JsonObject {
  const useOptions = getOptions(options);
  const useTarget = useOptions.mutate ? target : cloneJsonObject(target);

  return mergeObject(useTarget, source, useOptions);
}

/**
 * Возвращает полный объект опций
 */
function getOptions(options?: MergeJsonObjectOptions): Options {
  return {
    mergeArray: options?.mergeArray ?? MergeJsonArray.Replace,
    mergePath: options?.mergePath,
    mutate: options?.mutate ?? false,
  };
}

/**
 * Объединяет JSON-значения
 */
function mergeValue(
  target: JsonResult,
  source: JsonResult,
  options: Options,
): JsonResult {
  if (source === undefined) return target;

  if (Array.isArray(source)) {
    return mergeArray(target, source, options);
  }

  if (isJsonObject(source)) {
    const objectTarget = isJsonObject(target) ? target : {};

    return mergeObject(objectTarget, source, options);
  }

  return source;
}

/**
 * Объединяет JSON-объекты
 */
function mergeObject(
  target: JsonObject,
  source: JsonObject,
  options: Options,
): JsonObject {
  for (const key of Object.keys(source)) {
    const sourceValue = source[key];

    if (sourceValue === undefined) continue;

    const mergePath = options.mergePath ? `${options.mergePath}.${key}` : key;
    const targetValue = Object.hasOwn(target, key) ? target[key] : undefined;
    const result = mergeValue(targetValue, sourceValue, {
      ...options,
      mergePath,
    });

    if (result !== undefined) setObjectValue(target, key, result);
  }

  return target;
}

/**
 * Объединяет JSON-массивы
 */
function mergeArray(
  target: JsonResult,
  source: JsonArray,
  options: Options,
): JsonArray {
  const useTarget = Array.isArray(target) ? target : [];
  const clonedSource = cloneJsonArray(source);
  const { mergeArray: arrayAction } = options;

  if (typeof arrayAction === 'function') {
    return arrayAction(useTarget, clonedSource, options);
  }

  switch (arrayAction) {
    case MergeJsonArray.Append:
      useTarget.push(...clonedSource);

      return useTarget;
    case MergeJsonArray.Merge:
      for (let index = 0; index < source.length; index += 1) {
        const mergePath = options.mergePath
          ? `${options.mergePath}.${String(index)}`
          : String(index);

        useTarget[index] = mergeValue(useTarget[index], source[index], {
          ...options,
          mergePath,
        });
      }

      return useTarget;
    case MergeJsonArray.Rewrite:
      for (let index = 0; index < clonedSource.length; index += 1) {
        if (clonedSource[index] !== undefined) {
          useTarget[index] = clonedSource[index];
        }
      }

      return useTarget;
    case MergeJsonArray.Replace:
      return clonedSource;
  }
}

/**
 * Клонирует JSON-значение
 */
function cloneJsonValue(value: JsonValue): JsonValue {
  if (Array.isArray(value)) return cloneJsonArray(value);

  if (isJsonObject(value)) return cloneJsonObject(value);

  return value;
}

/**
 * Клонирует JSON-объект
 */
function cloneJsonObject(source: JsonObject): JsonObject {
  const result: JsonObject = {};

  for (const key of Object.keys(source)) {
    setObjectValue(result, key, cloneJsonValue(source[key]));
  }

  return result;
}

/**
 * Клонирует JSON-массив
 */
function cloneJsonArray(source: JsonArray): JsonArray {
  return source.map((item) =>
    item === undefined ? undefined : cloneJsonValue(item),
  );
}

/**
 * Возвращает флаг JSON-объекта
 */
function isJsonObject(value: JsonResult): value is JsonObject {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

/**
 * Безопасно записывает own-свойство JSON-объекта
 */
function setObjectValue(
  target: JsonObject,
  key: string,
  value: JsonValue,
): void {
  Object.defineProperty(target, key, {
    configurable: true,
    enumerable: true,
    value,
    writable: true,
  });
}
