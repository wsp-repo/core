import { describe, it, expect } from 'vitest';

import { getProperties } from '../index';

describe('Helpers object functions', () => {
  it('getProperties (object)', () => {
    const value: Record<string, unknown> = {
      num: 12345,
      str: 'string',
      date: new Date(),
      bool: true,
      null: null,
    };
    const keys = ['num', 'str', 'date', 'bool', 'null'];

    expect(getProperties(value).sort()).toEqual(keys.sort());
  });

  it('getProperties (class1)', () => {
    const value = new (class {
      public num = 12345;
      public str = 'string';
      public date = new Date();
      public bool = true;

      public get null(): null {
        return null;
      }
    })();
    const keys = ['num', 'str', 'date', 'bool', 'null'];

    expect(getProperties(value).sort()).toEqual(keys.sort());
  });

  it('getProperties (class2)', () => {
    const value = new (class {
      public get num(): number {
        return 12345;
      }

      public get str(): string {
        return 'string';
      }

      public get date(): Date {
        return new Date();
      }

      public get bool(): boolean {
        return true;
      }

      public get null(): null {
        return null;
      }
    })();
    const keys = ['num', 'str', 'date', 'bool', 'null'];

    expect(getProperties(value).sort()).toEqual(keys.sort());
  });

  it('getProperties (string)', () => {
    expect(getProperties('string' as any)).toEqual([]);
  });
});
