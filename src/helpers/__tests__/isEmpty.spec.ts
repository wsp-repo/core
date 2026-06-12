import { describe, it, expect } from 'vitest';

import { isEmpty } from '../index';

const isDebug = Boolean(process.env.VSCODE_INSPECTOR_OPTIONS);
const itOptions = { timeout: isDebug ? 600000 : 1000 };

type Test = {
  result: boolean;
  trim?: boolean;
  value: unknown;
};

const obj1 = {};
const obj2 = {
  isDef: 33,
  isUndef: undefined,
};
const obj3 = {
  isUndef: undefined,
};
const obj4 = {
  method: () => process.cwd(),
};

const class1 = new (class {})();
const class2 = new (class {
  public isDef = 33;
  public isUndef?: string;
})();
const class3 = new (class {
  public method(): void {
    process.cwd();
  }
})();
const class4 = new (class {
  public isUndef?: string;
})();
const class5 = new (class {
  public get isUndef(): string | undefined {
    return undefined;
  }
})();
const class6 = new (class {
  public get isDefined(): string | undefined {
    return 'value';
  }
})();

describe('Helper isEmpty', () => {
  const TESTS: Test[] = [
    { value: undefined, result: true },
    { value: undefined, trim: false, result: true },
    { value: undefined, trim: true, result: true },
    { value: null, result: true },
    { value: null, trim: false, result: true },
    { value: null, trim: true, result: true },
    { value: true, result: false },
    { value: true, trim: false, result: false },
    { value: true, trim: true, result: false },
    { value: false, result: false },
    { value: false, trim: false, result: false },
    { value: false, trim: true, result: false },
    { value: 123, result: false },
    { value: 123, trim: false, result: false },
    { value: 123, trim: true, result: false },
    { value: 0, result: false },
    { value: 0, trim: false, result: false },
    { value: 0, trim: true, result: false },
    { value: '', result: true },
    { value: '', trim: false, result: true },
    { value: '', trim: true, result: true },
    { value: '  ', result: false },
    { value: '  ', trim: false, result: false },
    { value: '  ', trim: true, result: true },
    { value: '\t', result: false },
    { value: '\t', trim: false, result: false },
    { value: '\t', trim: true, result: true },
    { value: '123', result: false },
    { value: '123', trim: false, result: false },
    { value: '123', trim: true, result: false },
    { value: '0', result: false },
    { value: '0', trim: false, result: false },
    { value: '0', trim: true, result: false },
    { value: [], result: true },
    { value: [], trim: false, result: true },
    { value: [], trim: true, result: true },
    { value: [1, 2], result: false },
    { value: [1, 2], trim: false, result: false },
    { value: [1, 2], trim: true, result: false },
    { value: [undefined, undefined], result: false },
    { value: [undefined, undefined], trim: false, result: false },
    { value: [undefined, undefined], trim: true, result: true },
    { value: [1, undefined, 2], result: false },
    { value: [1, undefined, 2], trim: false, result: false },
    { value: [1, undefined, 2], trim: true, result: false },

    { value: obj1, result: true },
    { value: obj1, trim: false, result: true },
    { value: obj1, trim: true, result: true },
    { value: obj2, result: false },
    { value: obj2, trim: false, result: false },
    { value: obj2, trim: true, result: false },
    { value: obj3, result: false },
    { value: obj3, trim: false, result: false },
    { value: obj3, trim: true, result: true },
    { value: obj4, result: true },
    { value: obj4, trim: false, result: true },
    { value: obj4, trim: true, result: true },
    { value: class1, result: true },
    { value: class1, trim: false, result: true },
    { value: class1, trim: true, result: true },
    { value: class2, result: false },
    { value: class2, trim: false, result: false },
    { value: class2, trim: true, result: false },
    { value: class3, result: true },
    { value: class3, trim: false, result: true },
    { value: class3, trim: true, result: true },
    { value: class4, result: true },
    { value: class4, trim: false, result: true },
    { value: class4, trim: true, result: true },
    { value: class5, result: false },
    { value: class5, trim: false, result: false },
    { value: class5, trim: true, result: true },
    { value: class6, result: false },
    { value: class6, trim: false, result: false },
    { value: class6, trim: true, result: false },
  ];

  it.each(TESTS)('- ', itOptions, ({ value, trim, result }) => {
    expect(isEmpty(value, trim)).toBe(result);
  });
});
