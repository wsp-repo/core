import { describe, it, expect } from 'vitest';

import { BadRequestError, CoreError } from '../../errors';
import { isCoreError, isError } from '../index';

class ExtError extends Error {}

type Test = {
  nonStrictCoreError: boolean;
  nonStrictError: boolean;
  strictCoreError: boolean;
  strictError: boolean;
  value?: unknown;
};

const TESTS: Test[] = [
  {
    nonStrictCoreError: false,
    nonStrictError: false,
    strictCoreError: false,
    strictError: false,
    value: { property: 'Custom property' },
  },
  {
    nonStrictCoreError: false,
    nonStrictError: true,
    strictCoreError: false,
    strictError: false,
    value: {
      message: 'Obj error',
      name: 'Obj error',
      stack: 'Stack data',
    },
  },
  {
    nonStrictCoreError: false,
    nonStrictError: true,
    strictCoreError: false,
    strictError: false,
    value: {
      message: 'Obj error',
      name: 'Obj error',
    },
  },
  {
    nonStrictCoreError: false,
    nonStrictError: false,
    strictCoreError: false,
    strictError: false,
    value: {
      name: 'Obj error',
      stack: 'Stack data',
    },
  },
  {
    nonStrictCoreError: true,
    nonStrictError: true,
    strictCoreError: false,
    strictError: false,
    value: {
      code: 'CORE_ERROR',
      message: 'Core error',
      name: 'CoreError',
      statusCode: 500,
    },
  },
  {
    nonStrictCoreError: false,
    nonStrictError: true,
    strictCoreError: false,
    strictError: true,
    value: new Error('Base error'),
  },
  {
    nonStrictCoreError: false,
    nonStrictError: true,
    strictCoreError: false,
    strictError: true,
    value: new ExtError('Ext error'),
  },
  {
    nonStrictCoreError: true,
    nonStrictError: true,
    strictCoreError: true,
    strictError: true,
    value: new CoreError('Message error'),
  },
  {
    nonStrictCoreError: true,
    nonStrictError: true,
    strictCoreError: true,
    strictError: true,
    value: new BadRequestError(),
  },
];

describe('Helpers', () => {
  describe('isError', () => {
    it.each(TESTS)('$value => $strictError', ({ value, strictError }) => {
      expect(isError(value)).toEqual(strictError);
    });
  });

  describe('isError(non-strict)', () => {
    it.each(TESTS)('$value => $nonStrictError', ({ value, nonStrictError }) => {
      expect(isError(value, false)).toEqual(nonStrictError);
    });
  });

  describe('isCoreError', () => {
    it.each(TESTS)(
      '$value => $strictCoreError',
      ({ value, strictCoreError }) => {
        expect(isCoreError(value)).toEqual(strictCoreError);
      },
    );
  });

  describe('isCoreError(non-strict)', () => {
    it.each(TESTS)(
      '$value => $nonStrictCoreError',
      ({ value, nonStrictCoreError }) => {
        expect(isCoreError(value, false)).toEqual(nonStrictCoreError);
      },
    );
  });
});
