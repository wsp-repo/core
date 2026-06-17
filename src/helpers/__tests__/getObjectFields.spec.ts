/* eslint-disable @typescript-eslint/no-empty-function */
import { describe, it, expect } from 'vitest';

import { CoreError } from '../../errors';
import { getObjectFields } from '../index';
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

type Object = {
  method: () => void;
  prop1?: string;
  prop2?: string;
  prop3: string;
};

const error = new Error('Base error object');

const coreError = new CoreError('Core error object');

const coreErrorDetails = new CoreError('Core error object', {
  str: 'String of object',
});

describe('Helper getObjectFields', () => {
  const parent = new Parent();
  const child = new Child();
  const obj: Object = {
    method: () => {},
    prop2: undefined,
    prop3: '',
  };

  it('Class Parent', getOptions(), () => {
    expect(getObjectFields(parent)?.sort()).toEqual(parentFields.sort());
  });

  it('Class Child', getOptions(), () => {
    expect(getObjectFields(child)?.sort()).toEqual(childFields.sort());
  });

  it('Object', getOptions(), () => {
    expect(getObjectFields(obj)?.sort()).toEqual(['prop2', 'prop3'].sort());
  });

  it('Error', getOptions(), () => {
    expect(getObjectFields(error)?.sort()).toEqual(['message', 'name'].sort());
  });

  it('CoreError', getOptions(), () => {
    expect(getObjectFields(coreError)?.sort()).toEqual(
      ['code', 'details', 'message', 'name', 'statusCode'].sort(),
    );
  });

  it('CoreError & details', getOptions(), () => {
    expect(getObjectFields(coreErrorDetails)?.sort()).toEqual(
      ['code', 'details', 'message', 'name', 'statusCode'].sort(),
    );
  });

  it('Date object', () => {
    expect(getObjectFields(new Date())).toEqual([]);
  });

  it('Map object', () => {
    const mapValue = new Map([
      ['a', 1],
      ['b', 2],
    ]);
    expect(getObjectFields(mapValue)).toEqual(['size']);
  });

  it('Set object', () => {
    expect(getObjectFields(new Set([1, 'b', 2]))).toEqual(['size']);
  });

  it('String value', () => {
    expect(getObjectFields('string' as any)).toEqual(undefined);
  });
});
