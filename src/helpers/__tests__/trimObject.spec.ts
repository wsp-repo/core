import { describe, it, expect } from 'vitest';

import { trimObject } from '../index';

const date = new Date();

const value: Record<string, unknown> = {
  bool: true,
  date: new Date(date),
  null: null,
  num: 12345,
  str: 'string',
  undef: undefined,
};

const trimmedWithNull: Record<string, unknown> = {
  num: 12345,
  str: 'string',
  date: new Date(date),
  bool: true,
  null: null,
};
const trimmedNotNull: Record<string, unknown> = {
  num: 12345,
  str: 'string',
  date: new Date(date),
  bool: true,
};

describe('Helpers', () => {
  describe('trimObject', () => {
    it('trimObject', () => {
      expect(trimObject(value)).toEqual(trimmedWithNull);
      expect(trimObject(value, true)).toEqual(trimmedNotNull);
    });
  });
});
