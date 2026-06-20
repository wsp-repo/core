/* eslint-disable @typescript-eslint/unbound-method */

import { describe, it, expect } from 'vitest';

import {
  isDefined,
  isError,
  isFunction,
  isObject,
  isTrue,
  isUndefined,
} from '../index';

type TestIsMethods = {
  isDef: boolean;
  isFunc: boolean;
  isObj: boolean;
  isUndef: boolean;
  value: unknown;
};

class ExtError extends Error {}

const cls = new (class Test {
  public isDef = 33;

  public isUndef?: string;

  public method(): void {
    process.cwd();
  }
})();

const TESTS: TestIsMethods[] = [
  { isDef: true, isFunc: false, isObj: false, isUndef: false, value: 1 },
  { isDef: true, isFunc: false, isObj: false, isUndef: false, value: false },
  {
    isDef: true,
    isFunc: false,
    isObj: false,
    isUndef: false,
    value: 'sdfgdsf',
  },
  { isDef: true, isFunc: false, isObj: false, isUndef: false, value: '' },
  { isDef: true, isFunc: false, isObj: false, isUndef: false, value: [] },
  { isDef: true, isFunc: false, isObj: true, isUndef: false, value: {} },
  {
    isDef: true,
    isFunc: true,
    isObj: false,
    isUndef: false,
    value: () => {
      process.cwd();
    },
  },
  { isDef: true, isFunc: false, isObj: false, isUndef: false, value: null },
  {
    isDef: false,
    isFunc: false,
    isObj: false,
    isUndef: true,
    value: undefined,
  },
  { isDef: true, isFunc: false, isObj: true, isUndef: false, value: cls },
  {
    isDef: true,
    isFunc: false,
    isObj: false,
    isUndef: false,
    value: cls.isDef,
  },
  {
    isDef: false,
    isFunc: false,
    isObj: false,
    isUndef: true,
    value: cls.isUndef,
  },
  {
    isDef: true,
    isFunc: true,
    isObj: false,
    isUndef: false,
    value: cls.method,
  },
  {
    isDef: false,
    isFunc: false,
    isObj: false,
    isUndef: true,
    value: cls.method(),
  },
];

const isTrueTests: { result: boolean; value?: unknown }[] = [
  { result: true, value: true },
  { result: true, value: 'true' },
  { result: true, value: 'TRUE' },
  { result: true, value: 'True' },
  { result: true, value: 1 },
  { result: true, value: '1' },
  { result: true, value: 'ON' },
  { result: false, value: false },
  { result: false, value: 'false' },
  { result: false, value: 0 },
  { result: false },
];

const TESTS_IS_ERROR: { result: boolean; value?: unknown }[] = [
  { result: false, value: { property: 'Custom property' } },
  {
    result: true,
    value: {
      message: 'Obj error',
      name: 'Obj error',
      stack: 'Stack data',
    },
  },
  { result: true, value: new Error('Base error') },
  { result: true, value: new ExtError('Ext error') },
];

describe('Helpers', () => {
  describe('isDefined', () => {
    it.each(TESTS)('$value => $isDef', ({ value, isDef }) => {
      expect(isDefined(value)).toEqual(isDef);
    });
  });

  describe('isUndefined', () => {
    it.each(TESTS)('$value => $isUndef', ({ value, isUndef }) => {
      expect(isUndefined(value)).toEqual(isUndef);
    });
  });

  describe('isObject', () => {
    it.each(TESTS)('$value => $isObj', ({ value, isObj }) => {
      expect(isObject(value)).toEqual(isObj);
    });
  });

  describe('isFunction', () => {
    it.each(TESTS)('$value => $isFunc', ({ value, isFunc }) => {
      expect(isFunction(value)).toEqual(isFunc);
    });
  });

  describe('isTrue', () => {
    it.each(isTrueTests)('$value => $result', ({ value, result }) => {
      expect(isTrue(value)).toEqual(result);
    });
  });

  describe('isError', () => {
    it.each(TESTS_IS_ERROR)('$value => $result', ({ value, result }) => {
      expect(isError(value)).toEqual(result);
    });
  });
});
