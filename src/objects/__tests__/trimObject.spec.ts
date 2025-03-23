/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable sort-keys */

import { trimObject } from '../trimObject';

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

  it('trimObject', () => {
    const trimmedWithNull: any = {
      num: 12345,
      str: 'string',
      date: new Date(date),
      bool: true,
      null: null,
    };
    const trimmedNotNull: any = {
      num: 12345,
      str: 'string',
      date: new Date(date),
      bool: true,
    };

    expect(trimObject(value)).toEqual(trimmedWithNull);
    expect(trimObject(value, true)).toEqual(trimmedNotNull);
  });
});
