/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable sort-keys */

import { deepClone } from '../deepClone';

describe('Helpers object functions', () => {
  const date = new Date();

  const value: any = {
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
