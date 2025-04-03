/* eslint-disable sort-keys */

import { deepMerge, MergeOptions } from '../src';

const target = {
  number: 1,
  string: '1',
  boolean: false,
  null: 111,
  target: 111,
  object: {
    number: 111,
  },
  array: ['11', '12', '13', '14', '15'],
  array3: [{ a: 1 }, { a: 1, b: 1 }],
};

const source = {
  number: 2,
  string: '2',
  boolean: true,
  null: null,
  object: {
    string: '222',
  },
  object2: {
    string: '222',
  },
  array1: [1, 2, 3],
  array: [undefined, 2, 3],
  array3: [{ a: 2 }, { b: 2 }, { c: 2 }],
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mergeArray(t: any, s: any, o: MergeOptions): any {
  return [`${String(t)}.${String(s)}.${String(o)}`];
}

const result = deepMerge(target, source, {
  newObject: true,
  mergeArray: mergeArray,
});

console.warn(JSON.stringify(target));
console.warn(`${JSON.stringify(source)} (undef: undefined)`);
console.warn(JSON.stringify(result));
