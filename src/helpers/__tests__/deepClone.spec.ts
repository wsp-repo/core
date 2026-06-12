import { describe, it, expect } from 'vitest';

import { deepClone } from '../index';

describe('Helpers object functions', () => {
  const date = new Date();

  const value: Record<string, unknown> = {
    bool: true,
    date: new Date(date),
    null: null,
    num: 12345,
    str: 'string',
    undef: undefined,
  };

  it('deepClone', () => {
    const clone = deepClone(value);

    expect(clone).toEqual(value);

    const changed = deepClone(value);
    Object.assign(changed, { num: 98765, str: 'update' });

    expect(clone).not.toEqual(changed);
  });
});
