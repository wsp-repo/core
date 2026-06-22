import { describe, it, expect } from 'vitest';

import { deepClone } from '../index';

class CloneValue {
  public nested = {
    value: 'ignored',
  };

  public clone(): unknown {
    return {
      cloned: true,
      nested: this.nested,
    };
  }
}

class FirstNode {
  public parent?: SecondNode;
}

class SecondNode {
  public items: { owner: FirstNode }[] = [];
}

const date = new Date();

const value: Record<string, unknown> = {
  bool: true,
  date: new Date(date),
  null: null,
  num: 12345,
  str: 'string',
  undef: undefined,
};

describe('Helpers', () => {
  describe('deepClone', () => {
    it('Change source', () => {
      const clone = deepClone(value);

      expect(clone).toEqual(value);

      const changed = deepClone(value);
      Object.assign(changed, { num: 98765, str: 'update' });

      expect(clone).not.toEqual(changed);
    });

    it('Use clone() method', () => {
      const value = new CloneValue();
      const clone = deepClone(value) as unknown as {
        cloned: boolean;
        nested: { value: string };
      };

      expect(clone).toEqual({
        cloned: true,
        nested: value.nested,
      });
      expect(clone.nested).toBe(value.nested);
    });

    it('Circular clone', () => {
      const value: Record<string, unknown> = { name: 'root' };

      value.child = { parent: value };

      const clone = deepClone(value) as {
        child: {
          parent: unknown;
        };
      };

      expect(clone).not.toBe(value);
      expect(clone.child).not.toBe(value.child);
      expect(clone.child.parent).toBe(clone);
    });

    it('Circular classes through array', () => {
      const first = new FirstNode();
      const second = new SecondNode();

      first.parent = second;
      second.items.push({ owner: first });

      const clone = deepClone(first);

      expect(clone).not.toBe(first);
      expect(clone.parent).not.toBe(second);
      expect(clone.parent?.items[0].owner).toBe(clone);
    });

    it('Circular array', () => {
      const value: unknown[] = [];

      value.push(value);

      const clone = deepClone(value);

      expect(clone).not.toBe(value);
      expect(clone[0]).toBe(clone);
    });

    it('Clone Map', () => {
      const key = { id: 1 };
      const item = { value: 'item' };
      const value = new Map<unknown, unknown>([[key, item]]);
      const clone = deepClone(value);
      const [[cloneKey, cloneItem]] = [...clone.entries()];

      expect(clone).not.toBe(value);
      expect(cloneKey).toEqual(key);
      expect(cloneKey).not.toBe(key);
      expect(cloneItem).toEqual(item);
      expect(cloneItem).not.toBe(item);
    });

    it('Clone Set', () => {
      const item = { value: 'item' };
      const value = new Set<unknown>([item]);
      const clone = deepClone(value);
      const [cloneItem] = [...clone.values()];

      expect(clone).not.toBe(value);
      expect(cloneItem).toEqual(item);
      expect(cloneItem).not.toBe(item);
    });

    it('Clone RegExp', () => {
      const value = /^regexp$/gi;

      value.lastIndex = 2;

      const clone = deepClone(value);

      expect(clone).toEqual(value);
      expect(clone).not.toBe(value);
      expect(clone.lastIndex).toBe(0);
    });

    it('Function and symbol', () => {
      const symbol = Symbol('symbol');
      const fn = () => process.cwd();
      const clone = deepClone([symbol, fn]);

      expect(clone[0]).toBe(symbol);
      expect(clone[1]).toBe(fn);
    });
  });
});
