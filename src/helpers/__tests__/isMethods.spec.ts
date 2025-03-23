/* eslint-disable @typescript-eslint/unbound-method */
/* eslint-disable sort-keys */
import {
  isDefined,
  isFunction,
  isObject,
  isTrue,
  isUndefined,
} from '../isMethods';

type TestIsMethods = {
  isDef: boolean;
  isFunc: boolean;
  isObj: boolean;
  value: unknown;
};

const cls = new (class Test {
  public isDef = 33;

  public isUndef?: string;

  public method(): void {}
})();

describe('Helpers checkers is...', () => {
  const TESTS: TestIsMethods[] = [
    { isDef: true, isFunc: false, isObj: false, value: 1 },
    { isDef: true, isFunc: false, isObj: false, value: false },
    { isDef: true, isFunc: false, isObj: false, value: 'sdfgdsf' },
    { isDef: true, isFunc: false, isObj: false, value: '' },
    { isDef: true, isFunc: false, isObj: false, value: [] },
    { isDef: true, isFunc: false, isObj: true, value: {} },
    {
      isDef: true,
      isFunc: true,
      isObj: false,
      value: () => {},
    },
    { isDef: true, isFunc: false, isObj: false, value: null },
    { isDef: false, isFunc: false, isObj: false, value: undefined },
    { isDef: true, isFunc: false, isObj: true, value: cls },
    { isDef: true, isFunc: false, isObj: false, value: cls.isDef },
    { isDef: false, isFunc: false, isObj: false, value: cls.isUndef },
    { isDef: true, isFunc: true, isObj: false, value: cls.method },
    { isDef: false, isFunc: false, isObj: false, value: cls.method() },
  ];

  it.each(TESTS)('isDefined', ({ value, isDef }) => {
    expect(isDefined(value)).toEqual(isDef);
  });

  it.each(TESTS)('isUndefined', ({ value, isDef }) => {
    expect(isUndefined(value)).toEqual(!isDef);
  });

  it.each(TESTS)('isObject', ({ value, isObj }) => {
    expect(isObject(value)).toEqual(isObj);
  });

  it.each(TESTS)('isFunction', ({ value, isFunc }) => {
    expect(isFunction(value)).toEqual(isFunc);
  });

  const isTrueTests: { result: boolean; value?: unknown }[] = [
    { result: true, value: true },
    { result: true, value: 'true' },
    { result: true, value: 'TRUE' },
    { result: true, value: 'True' },
    { result: true, value: 1 },
    { result: true, value: '1' },
    { result: true, value: 'ON' },
    { result: true, value: [1] },
    { result: true, value: { key: 1 } },
    { result: true, value: () => true },
    { result: false, value: false },
    { result: false, value: 'false' },
    { result: false, value: 0 },
    { result: false, value: [] },
    { result: false, value: {} },
    { result: false, value: () => false },
    { result: false },
  ];
  it.each(isTrueTests)('isTrue', ({ value, result }) => {
    expect(isTrue(value)).toEqual(result);
  });
});
