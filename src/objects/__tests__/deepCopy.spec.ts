/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable sort-keys */

import { deepCopy } from '../deepCopy';

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

  it('deepCopy', () => {
    const copy = deepCopy(value);

    expect(copy).toEqual(value);

    const changed = deepCopy(value);
    Object.assign(changed, { num: 98765, str: 'update' });

    expect(copy).not.toEqual(changed);
  });
});
