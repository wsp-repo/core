/* eslint-disable @typescript-eslint/no-explicit-any */

import { deepClone } from './deepClone';
import { isArray } from './isArray';
import { isDefined } from './isDefined';
import { isObject } from './isObject';

import { DeepPartial } from '../types';

export enum MergeArray {
  Append = 'append',
  Merge = 'merge',
  Replace = 'replace',
  Rewrite = 'rewrite',
}

export type MergeCustom = (
  target: any,
  source: any,
  options: MergeOptions,
) => any;

export type MergeOptions = {
  mergeArray?: MergeArray | MergeCustom;
  mergePath?: string;
};

type Options = Pick<MergeOptions, 'mergePath'> &
  Required<Omit<MergeOptions, 'mergePath'>>;

/**
 * Рекурсивная функция мержинга узлов
 */
function deepRecursive(target: any, source: any, options: Options): any {
  if (source && isArray(source)) {
    return deepArray(target, source, options);
  }

  if (source && isObject(source)) {
    return deepObject(target, source, options);
  }

  return isDefined(source) ? source : target;
}

/**
 * Возвращает полный объект опций мержинга
 */
function getOptions(options?: MergeOptions): Options {
  return { mergeArray: MergeArray.Replace, ...options };
}

/**
 * Мержит из источника массив
 */

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
          ...options,
          mergePath,
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
      ...options,
      mergePath,
    });
  }

  return target;
}

export function deepMerge<T>(
  target: DeepPartial<T>,
  source: DeepPartial<T>,
  options?: MergeOptions,
): T {
  return deepRecursive(
    deepClone(target),
    deepClone(source),
    getOptions(options),
  );
}
