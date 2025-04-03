/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { isArray, isDefined, isObject } from '../helpers';
import { DeepPartial } from '../types/common';
import { MergeArray, MergeOptions } from '../types/deepMerge';
import { deepClone } from './deepClone';

type Options = Pick<MergeOptions, 'mergePath'> &
  Required<Omit<MergeOptions, 'mergePath'>>;

/**
 * Рекурсивная функция мержинга узлов
 */
function deepRecursive(target: any, source: any, options: Options): any {
  if (source && isArray(source)) {
    return deepArray(target, source, options); // eslint-disable-line
  }

  if (source && isObject(source)) {
    return deepObject(target, source, options); // eslint-disable-line
  }

  return isDefined(source) ? source : target;
}

/**
 * Возвращает полный объект опций мержинга
 */
function getOptions(options?: MergeOptions): Options {
  return { mergeArray: MergeArray.Replace, newObject: false, ...options };
}

/**
 * Мержит из источника массив
 */
// eslint-disable-next-line complexity
function deepArray(target: any, source: any, options: Options): any {
  if (!isArray(target)) return source;

  const { mergeArray } = options;

  switch (mergeArray) {
    case MergeArray.Replace:
      return source;
    case MergeArray.Append:
      for (const item of source) {
        target.push(item);
      }

      return target;
    case MergeArray.Rewrite:
      for (const key in source) {
        if (isDefined(source[key])) {
          target[Number(key)] = source[key];
        }
      }

      return target;
    case MergeArray.Merge:
      for (const key in source) {
        /* prettier-ignore */
        const mergePath = options.mergePath
                ? `${options.mergePath}.${key}`
                : key;
        const i = Number(key);

        target[i] = deepRecursive(target[i], source[key], {
              ...options, mergePath, // eslint-disable-line
        });
      }

      return target;
    default:
      return mergeArray(target, source, options);
  }
}

/**
 * Мержит из источника объект
 */
function deepObject(target: any, source: any, options: Options): any {
  if (!isObject(target)) target = {};

  for (const key in source) {
    /* prettier-ignore */
    const mergePath = options.mergePath
        ? `${options.mergePath}.${key}`
        : key;

    target[key] = deepRecursive(target[key], source[key], {
      ...options, mergePath, // eslint-disable-line
    });
  }

  return target;
}

export function deepMerge<T>(
  target: DeepPartial<T>,
  source: DeepPartial<T>,
  options?: MergeOptions,
): T {
  const opts = getOptions(options);

  return options?.newObject
    ? deepRecursive(deepClone(target), source, opts)
    : deepRecursive(target, source, opts);
}
