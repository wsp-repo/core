import { describe, expect, it } from 'vitest';

import { MergeArrayModes, mergeJsonObject } from '../index';
import { getOptions } from './__helpers.spec';

import { JsonObject } from '../../types';

describe('Helper mergeJsonObject', () => {
  it('Object', getOptions(), () => {
    const target = {
      config: { enabled: true, timeout: 100 },
      name: 'target',
    };
    const source = {
      config: { retries: 3, timeout: 200 },
      name: 'source',
    };

    expect(mergeJsonObject(target, source)).toEqual({
      config: { enabled: true, retries: 3, timeout: 200 },
      name: 'source',
    });
    expect(target).toEqual({
      config: { enabled: true, timeout: 100 },
      name: 'target',
    });
  });

  it('Mutate', getOptions(), () => {
    const target: JsonObject = { nested: { target: true } };
    const source: JsonObject = { nested: { source: true } };
    const result = mergeJsonObject(target, source, { mutate: true });

    expect(result).toBe(target);
    expect(target).toEqual({ nested: { source: true, target: true } });
  });

  it('Array replace', getOptions(), () => {
    const target: JsonObject = { items: [1, 2, 3] };
    const source: JsonObject = { items: [9] };

    expect(mergeJsonObject(target, source)).toEqual({ items: [9] });
  });

  it('Array append', getOptions(), () => {
    const target: JsonObject = { items: [1, 2] };
    const source: JsonObject = { items: [3, 4] };

    expect(
      mergeJsonObject(target, source, {
        mergeArray: MergeArrayModes.Append,
      }),
    ).toEqual({ items: [1, 2, 3, 4] });
  });

  it('Array rewrite', getOptions(), () => {
    const target: JsonObject = { items: [1, 2, 3] };
    const source: JsonObject = { items: [9, undefined] };

    expect(
      mergeJsonObject(target, source, {
        mergeArray: MergeArrayModes.Rewrite,
      }),
    ).toEqual({ items: [9, 2, 3] });
  });

  it('Array merge', getOptions(), () => {
    const target: JsonObject = {
      items: [{ enabled: true, value: 1 }, 2],
    };
    const source: JsonObject = {
      items: [{ value: 9 }, 3],
    };

    expect(
      mergeJsonObject(target, source, {
        mergeArray: MergeArrayModes.Merge,
      }),
    ).toEqual({
      items: [{ enabled: true, value: 9 }, 3],
    });
  });

  it('Custom array merge and path', getOptions(), () => {
    const paths: (string | undefined)[] = [];
    const target: JsonObject = { nested: { items: [1] } };
    const source: JsonObject = { nested: { items: [2] } };

    expect(
      mergeJsonObject(target, source, {
        mergeArray: (targetArray, sourceArray, options) => {
          paths.push(options.mergePath);

          return [...sourceArray, ...targetArray];
        },
      }),
    ).toEqual({ nested: { items: [2, 1] } });
    expect(paths).toEqual(['nested.items']);
  });

  it('Unsafe keys', getOptions(), () => {
    const source = JSON.parse(
      '{"__proto__":{"polluted":true},"safe":true}',
    ) as JsonObject;
    const result = mergeJsonObject({}, source);

    expect(result).toEqual(source);
    expect(Object.hasOwn(result, '__proto__')).toBe(true);
    expect(({} as { polluted?: boolean }).polluted).toBeUndefined();
  });
});
