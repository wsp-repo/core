/* eslint-disable @typescript-eslint/no-empty-function */
import { describe, it, expect } from 'vitest';

import { getFields } from '../index';
import { getOptions } from './__helpers.spec';

class Parent {
  public prop1?: string;
  public prop2?: string = undefined;
  public prop3: string = '';
  protected prop4: string = '';
  private prop5: string = '';
  #prop6: string = '';
  public get get1(): null {
    return null;
  }
  public get get2(): string | undefined {
    return undefined;
  }
  public get get3(): number {
    return 12345;
  }
  protected get get4(): number {
    return 12345;
  }
  private get get5(): number {
    return 12345;
  }
  get #get6(): number {
    return 12345;
  }
  public method(): void {
    this.prop5 || this.#prop6 || this.get5 || this.#get6;
  }
}

const parentFields: string[] = [
  // 'prop1',  - не определено
  'prop2', //  - равно undefined
  'prop3',
  'prop4',
  'prop5',
  // '#prop6', - приватный префикс
  'get1',
  'get2', //   - равно undefined
  'get3',
  'get4',
  'get5',
  // '#get6',  - приватный префикс
  // 'method'  - функция/метод
];

const parentFieldsTrim: string[] = [
  // 'prop1',  - не определено
  // 'prop2',  - равно undefined
  'prop3',
  'prop4',
  'prop5',
  // '#prop6', - приватный префикс
  'get1',
  // 'get2',   - равно undefined
  'get3',
  'get4',
  'get5',
  // '#get6',  - приватный префикс
  // 'method'  - функция/метод
];

class Child extends Parent {
  public prop7: string = '';
  protected prop8: string = '';
  #prop9: string = '';
  public get get7(): number {
    return 1;
  }
  public method(): void {
    this.#prop9;
  }
}

const childFields: string[] = [
  ...parentFields,
  'prop7',
  'prop8',
  // '#prop9',  - приватный префикс
  'get7',
];

const childFieldsTrim: string[] = [
  ...parentFieldsTrim,
  'prop7',
  'prop8',
  // '#prop9',  - приватный префикс
  'get7',
];

type Object = {
  method: () => void;
  prop1?: string;
  prop2?: string;
  prop3: string;
};

describe('Helpers object functions', () => {
  const parent = new Parent();
  const child = new Child();
  const obj: Object = {
    method: () => {},
    prop2: undefined,
    prop3: '',
  };

  it('getFields(class Parent)', getOptions(), () => {
    expect(getFields(parent).sort()).toEqual(parentFields.sort());
  });

  it('getFields(class Parent, true)', getOptions(), () => {
    expect(getFields(parent, true).sort()).toEqual(parentFieldsTrim.sort());
  });

  it('getFields(class Child)', getOptions(), () => {
    expect(getFields(child).sort()).toEqual(childFields.sort());
  });

  it('getFields(class Child, true)', getOptions(), () => {
    expect(getFields(child, true).sort()).toEqual(childFieldsTrim.sort());
  });

  it('getFields(object)', getOptions(), () => {
    expect(getFields(obj).sort()).toEqual(['prop2', 'prop3']);
  });

  it('getFields(object, true)', getOptions(), () => {
    expect(getFields(obj, true).sort()).toEqual(['prop3']);
  });

  it('getFields (string)', () => {
    expect(getFields('string' as any)).toEqual([]);
  });
});
