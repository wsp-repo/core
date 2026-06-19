import { describe, it, expect } from 'vitest';

import { CoreError } from '../../errors';
import { toJsonObject } from '../index';
import { getOptions } from './__helpers.spec';

class TestClass {
  public prop = 'value';
  public undef?: string;

  public get getter(): number {
    return 12345;
  }

  public method(): void {
    process.cwd();
  }
}

class JsonClass {
  public ignored = 'ignored';

  public toJSON(): unknown {
    return {
      converted: true,
      nested: {
        value: 'json',
      },
    };
  }
}

type CircularDetails = {
  circularPath: string;
  sourcePath: string;
};

describe('Helper toJsonObject', () => {
  it('Primitive values', getOptions(), () => {
    expect(toJsonObject(null)).toEqual(null);
    expect(toJsonObject('string')).toEqual('string');
    expect(toJsonObject(12345)).toEqual(12345);
    expect(toJsonObject(true)).toEqual(true);
    expect(toJsonObject(12345n)).toEqual('12345');
    expect(toJsonObject(Number.NaN)).toEqual(null);
    expect(toJsonObject(Number.POSITIVE_INFINITY)).toEqual(null);
  });

  it('Ignored root values', getOptions(), () => {
    expect(toJsonObject(undefined)).toEqual(undefined);
    expect(toJsonObject(() => process.cwd())).toEqual(undefined);
    expect(toJsonObject(Symbol('symbol'))).toEqual(undefined);
    expect(toJsonObject(/^regexp$/i)).toEqual(undefined);
  });

  it('Object properties and getters', getOptions(), () => {
    expect(toJsonObject(new TestClass())).toEqual({
      getter: 12345,
      prop: 'value',
    });
  });

  it('Object with toJSON()', getOptions(), () => {
    expect(toJsonObject(new JsonClass())).toEqual({
      converted: true,
      nested: {
        value: 'json',
      },
    });
  });

  it('Date', getOptions(), () => {
    const date = new Date('2026-06-18T12:34:56.000Z');

    expect(toJsonObject(date)).toEqual('2026-06-18T12:34:56.000Z');
  });

  it('Map', getOptions(), () => {
    const map = new Map<unknown, unknown>([
      ['str', 'value'],
      [123, true],
      ['undef', undefined],
      ['func', () => process.cwd()],
    ]);

    expect(toJsonObject(map)).toEqual({
      '123': true,
      str: 'value',
    });
  });

  it('Set', getOptions(), () => {
    const set = new Set<unknown>(['value', undefined, 123]);

    expect(toJsonObject(set)).toEqual(['value', undefined, 123]);
    expect(toJsonObject(set, { trimArrayUndefined: true })).toEqual([
      'value',
      123,
    ]);
  });

  it('Array', getOptions(), () => {
    const value = ['value', undefined, () => process.cwd(), 123];

    expect(toJsonObject(value)).toEqual(['value', undefined, undefined, 123]);
    expect(toJsonObject(value, { trimArrayUndefined: true })).toEqual([
      'value',
      123,
    ]);
  });

  it('Symbol and RegExp options', getOptions(), () => {
    const value = {
      regexp: /^regexp$/i,
      symbol: Symbol('symbol'),
    };

    expect(toJsonObject(value)).toEqual({});
    expect(
      toJsonObject(value, { regexpAction: 'string', symbolAction: 'string' }),
    ).toEqual({
      regexp: '/^regexp$/i',
      symbol: 'Symbol(symbol)',
    });
  });

  it('Circular throw', getOptions(), () => {
    const circular: Record<string, unknown> = { name: 'root' };

    circular.child = { parent: circular };

    try {
      toJsonObject(circular);
    } catch (error) {
      const coreError = error as CoreError<CircularDetails>;

      expect(coreError).toBeInstanceOf(CoreError);
      expect(coreError.details).toEqual({
        circularPath: '$.child.parent',
        sourcePath: '$',
      });

      return;
    }

    throw new Error('Expected circular error');
  });

  it('Circular skip', getOptions(), () => {
    const circular: Record<string, unknown> = { name: 'root' };

    circular.child = { parent: circular };

    expect(toJsonObject(circular, { circularAction: 'skip' })).toEqual({
      child: {},
      name: 'root',
    });
  });
});
