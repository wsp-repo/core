import { describe, it, expect } from 'vitest';

import { getPreciseType } from '../index';

type TestObject = {
  input: unknown;
  name: string;
  result: string;
};

class ExtError extends Error {}

class TestClass {
  public isDef = 33;

  public isUndef?: string;

  public method(): void {
    process.cwd();
  }
}

function simpleFunction(): number {
  return 1234;
}

function promiseFunction(): Promise<number> {
  return Promise.resolve(1234);
}

async function asyncFunction(): Promise<number> {
  const result = await Promise.resolve(1234);

  return result;
}

const simpleFunctionResult = simpleFunction();
const promiseFunctionResult = promiseFunction();
const asyncFunctionResult = asyncFunction();

describe('Helper getPreciseType:', () => {
  const TESTS: TestObject[] = [
    {
      name: 'undefined',
      input: undefined,
      result: 'undefined',
    },
    {
      name: 'null',
      input: null,
      result: 'null',
    },
    {
      name: 'true',
      input: true,
      result: 'boolean',
    },
    {
      name: 'false',
      input: false,
      result: 'boolean',
    },
    {
      name: 'number',
      input: 123,
      result: 'number',
    },
    {
      name: 'string',
      input: 'string',
      result: 'string',
    },
    {
      name: '/.../',
      input: /^a$/i,
      result: 'regexp',
    },
    {
      name: 'RegExp(...)',
      input: new RegExp('^a$'),
      result: 'regexp',
    },
    {
      name: 'Date()',
      input: new Date(),
      result: 'date',
    },
    {
      name: 'Map',
      input: new Map(),
      result: 'map',
    },
    {
      name: 'Set',
      input: new Set(),
      result: 'set',
    },
    {
      name: 'Promise',
      input: new Promise((resolve) => resolve(true)),
      result: 'promise',
    },
    {
      name: 'Error',
      input: new Error(),
      result: 'error',
    },
    {
      name: 'ExtError',
      input: new ExtError(),
      result: 'error',
    },
    {
      name: 'AnyClass',
      input: new TestClass(),
      result: 'object',
    },
    {
      name: 'Simple function',
      input: simpleFunction,
      result: 'function',
    },
    {
      name: 'Promise function',
      input: promiseFunction,
      result: 'function',
    },
    {
      name: 'Async function',
      input: asyncFunction,
      result: 'function',
    },
    {
      name: 'Call simple function',
      input: simpleFunctionResult,
      result: 'number',
    },
    {
      name: 'Call promise function',
      input: promiseFunctionResult,
      result: 'promise',
    },
    {
      name: 'Call async function',
      input: asyncFunctionResult,
      result: 'promise',
    },
  ];

  it.each(TESTS)('$name => $result', ({ input, result }) => {
    expect(getPreciseType(input)).toEqual(result);
  });
});
